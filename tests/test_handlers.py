from datetime import datetime
from typing import Any

import pytest
import sqlalchemy as sa
from aiohttp import ClientResponse
from aiohttp.test_utils import TestClient
from marshmallow.schema import BaseSchema
from sqlalchemy.engine import Engine

from zadachi import tables
from zadachi.config import LOGIN_ENV
from zadachi.models import Task
from zadachi.schemas import TaskSchema
from zadachi.utils import generate_jwt


async def test_login_via_env_handler_with_env(cli: TestClient) -> None:
    response: ClientResponse = await cli.post(f"/login_via_env/{LOGIN_ENV}")
    response_json = await response.json()
    assert response_json["token"] == generate_jwt({"env": LOGIN_ENV})


async def test_login_via_env_handler_without_env(cli: TestClient) -> None:
    response: ClientResponse = await cli.post(f"/login_via_env/")
    assert response.status == 404


async def test_login_via_env_handler_with_invalid_env(cli: TestClient) -> None:
    response: ClientResponse = await cli.post(f"/login_via_env/no")
    response_json = await response.json()
    assert response_json == {"error": "Invalid env passed."}


async def test_list_tasks_handler(cli: TestClient, db: Engine) -> None:
    tasks = [Task(1, "Уборочка"), Task(2, "Проездной"), Task(3, "Dosug")]

    schema: BaseSchema = TaskSchema()
    serialized_tasks, _ = schema.dump(tasks, many=True)

    db.execute(sa.insert(tables.task).values(serialized_tasks))

    token = generate_jwt({"env": LOGIN_ENV}, with_prefix=True)

    response: ClientResponse = await cli.get(
        f"/tasks/{datetime.utcnow().date()}", headers={"Authorization": token}
    )
    response_json = await response.json()

    assert serialized_tasks == response_json


async def test_create_task_handler(freezer: Any, cli: TestClient, db: Engine) -> None:
    token = generate_jwt({"env": LOGIN_ENV}, with_prefix=True)

    response: ClientResponse = await cli.post(
        f"/tasks/create", json={"title": "Уборочка"}, headers={"Authorization": token}
    )

    assert response.status == 200

    db_task = db.execute(sa.select(["*"]).where(tables.task.c.title == "Уборочка")).first()
    task = Task(*db_task)
    assert task == Task(
        id=1, title="Уборочка", created_date=datetime.utcnow(), target_date=datetime.utcnow()
    )
