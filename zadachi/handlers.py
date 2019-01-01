import sqlalchemy as sa
from aiohttp import web
from marshmallow.schema import BaseSchema

from zadachi.config import LOGIN_ENV
from zadachi.schemas import TaskSchema
from zadachi.tables import task
from zadachi.utils import generate_jwt


async def login_via_env_handler(request: web.Request) -> web.Response:
    env = request.match_info["env"]
    if env != LOGIN_ENV:
        return web.json_response({"error": "Invalid env passed."}, status=401)

    return web.json_response({"token": generate_jwt({"env": env})})


async def list_tasks_handler(request: web.Request) -> web.Response:
    date = request.match_info["date"]
    query = sa.select(["*"]).where(sa.func.DATE(task.c.target_date) == date)
    db_tasks = await request["connection"].execute(query)
    schema: BaseSchema = TaskSchema()
    serialized_tasks, _ = schema.dump(db_tasks, many=True)
    return web.json_response(serialized_tasks)
