from aiohttp import web

from zadachi.config import LOGIN_ENV
from zadachi.utils import generate_jwt


async def login_via_env_handler(request: web.Request) -> web.Response:
    env = request.match_info["env"]
    if env != LOGIN_ENV:
        return web.json_response({"error": "Invalid env passed."}, status=401)

    return web.json_response({"token": generate_jwt({"env": env})})


def create_app() -> web.Application:
    app = web.Application()
    app.add_routes([web.post("/login_via_env/{env}", login_via_env_handler)])
    return app
