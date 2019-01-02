from datetime import datetime

import sqlalchemy as sa
from aiohttp import web
from marshmallow.schema import BaseSchema

from zadachi import tables
from zadachi.config import LOGIN_ENV
from zadachi.models import Task
from zadachi.schemas import TaskSchema
from zadachi.utils import generate_jwt


async def login_via_env_handler(request: web.Request) -> web.Response:
    env = request.match_info["env"]
    if env != LOGIN_ENV:
        return web.json_response({"error": "Invalid env passed."}, status=401)

    return web.json_response({"token": generate_jwt({"env": env})})


async def list_tasks_handler(request: web.Request) -> web.Response:
    target_date = request.query.get("target_date") or datetime.utcnow().date()

    query = sa.select(["*"]).where(sa.func.DATE(tables.task.c.target_date) == target_date)
    db_tasks = await request["connection"].execute(query)

    schema: BaseSchema = TaskSchema()
    serialized_tasks, _ = schema.dump(db_tasks, many=True)

    return web.json_response(serialized_tasks)


async def create_task_handler(request: web.Request) -> web.Response:
    schema: BaseSchema = TaskSchema()
    task_data = await request.json()
    task_data, _ = schema.load(task_data, partial=True)

    task = Task(**task_data)
    task_data, _ = schema.dump(task)

    query = sa.insert(tables.task).values(task_data)
    await request["connection"].execute(query)

    return web.json_response({"id": task_data["id"]})


async def update_task_handler(request: web.Request) -> web.Response:
    id_ = request.match_info["id"]

    schema: BaseSchema = TaskSchema()
    task_data = await request.json()
    task_data, _ = schema.load(task_data, partial=True)

    query = sa.update(tables.task).values(task_data).where(tables.task.c.id == id_)
    await request["connection"].execute(query)

    return web.json_response({})


async def delete_task_handler(request: web.Request) -> web.Response:
    id_ = request.match_info["id"]

    query = sa.delete(tables.task).where(tables.task.c.id == id_)
    await request["connection"].execute(query)

    return web.json_response({})
