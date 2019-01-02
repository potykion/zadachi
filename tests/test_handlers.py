from datetime import datetime, timedelta

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


@pytest.fixture()
def token() -> str:
    return generate_jwt({"env": LOGIN_ENV}, with_prefix=True)


async def test_login_via_env_handler_with_env(cli: TestClient) -> None:
    response: ClientResponse = await cli.post(f"/login_via_env/{LOGIN_ENV}")
    response_json = await response.json()
    assert response_json["token"] == generate_jwt({"env": LOGIN_ENV})


async def test_login_via_env_handler_with_invalid_env(cli: TestClient) -> None:
    response: ClientResponse = await cli.post(f"/login_via_env/no")
    response_json = await response.json()
    assert response_json == {"error": "Invalid env passed."}


async def test_list_tasks_handler(cli: TestClient, db: Engine, token: str) -> None:
    tasks = [Task(title="Уборочка"), Task(title="Проездной"), Task(title="Dosug")]

    schema: BaseSchema = TaskSchema()
    serialized_tasks, _ = schema.dump(tasks, many=True)

    db.execute(sa.insert(tables.task).values(serialized_tasks))

    response: ClientResponse = await cli.get(
        f"/tasks/{datetime.utcnow().date()}", headers={"Authorization": token}
    )
    response_json = await response.json()

    assert serialized_tasks == response_json


async def test_create_task_handler(cli: TestClient, db: Engine, token: str) -> None:
    response: ClientResponse = await cli.post(
        "/tasks/create", json={"title": "Уборочка"}, headers={"Authorization": token}
    )

    assert response.status == 200

    tasks_in_db = db.execute(
        sa.select([sa.func.COUNT("*")]).where(tables.task.c.title == "Уборочка")
    ).scalar()
    assert tasks_in_db == 1


async def test_update_task_handler(cli: TestClient, db: Engine, token: str) -> None:
    tasks = [Task(title="Уборочка")]

    schema: BaseSchema = TaskSchema()
    serialized_tasks, _ = schema.dump(tasks, many=True)

    db.execute(sa.insert(tables.task).values(serialized_tasks))

    new_data = {
        "title": "Убраться надо!!! 2 месяца уже не убирался, все в пыли в говне, сколько можно бля!",
        "target_date": str(datetime.utcnow() + timedelta(days=1)),
    }
    response: ClientResponse = await cli.post(
        f"/tasks/{tasks[0].id}/update", json=new_data, headers={"Authorization": token}
    )
    assert response.status == 200

    db_task = db.execute(sa.select(["*"]).where(tables.task.c.id == tasks[0].id)).first()
    task = Task(*db_task)
    assert task.title == new_data["title"]
    assert str(task.target_date) == new_data["target_date"]


async def test_delete_task_handler(cli: TestClient, db: Engine, token: str) -> None:
    tasks = [Task(title="Уборочка")]

    schema: BaseSchema = TaskSchema()
    serialized_tasks, _ = schema.dump(tasks, many=True)

    db.execute(sa.insert(tables.task).values(serialized_tasks))

    response: ClientResponse = await cli.post(
        f"/tasks/{tasks[0].id}/delete", headers={"Authorization": token}
    )
    assert response.status == 200

    db_task = db.execute(sa.select(["*"]).where(tables.task.c.id == tasks[0].id)).first()
    assert not db_task
