from typing import AsyncGenerator, Awaitable, Callable

import jwt
from aiohttp import web
from aiohttp.web_middlewares import middleware
from aiopg.sa import create_engine

from zadachi.config import DB_URL, JWT_SECRET, LOGIN_ENV
from zadachi.handlers import login_via_env_handler, list_tasks_handler

Handler = Callable[[web.Request], Awaitable[web.StreamResponse]]


async def pg_engine(app: web.Application) -> AsyncGenerator:
    app["pg_engine"] = await create_engine(DB_URL)
    yield
    app["pg_engine"].close()
    await app["pg_engine"].wait_closed()


@middleware
async def db_connection_middleware(request: web.Request, handler: Handler) -> web.StreamResponse:
    async with request.app["pg_engine"].acquire() as connection:
        request["connection"] = connection
        return await handler(request)


@middleware
async def jwt_auth_middleware(request: web.Request, handler: Handler) -> web.StreamResponse:
    ignored_request = request.path.startswith("/login_via_env/")
    if ignored_request:
        return await handler(request)

    jwt_header = request.headers.get("Authorization")
    if not jwt_header:
        return web.json_response({"error": "No Authorization header passed."})

    _, token = jwt_header.split()
    payload = jwt.decode(token, JWT_SECRET)
    if payload["env"] != LOGIN_ENV:
        return web.json_response({"error": "Invalid Authorization header."})

    return await handler(request)


def create_app() -> web.Application:
    app = web.Application(middlewares=[db_connection_middleware, jwt_auth_middleware])
    app.add_routes(
        [
            web.post("/login_via_env/{env}", login_via_env_handler),
            web.get("/tasks/{date}", list_tasks_handler),
        ]
    )
    app.cleanup_ctx.append(pg_engine)
    return app
