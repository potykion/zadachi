import asyncio
from typing import Awaitable

import pytest
import sqlalchemy as sa
from aiohttp.test_utils import TestClient
from sqlalchemy.engine import Engine

from zadachi.app import create_app
from zadachi.config import DB_URL
from zadachi.tables import metadata


@pytest.fixture()
def cli(loop: asyncio.AbstractEventLoop, aiohttp_client: Awaitable[TestClient]) -> TestClient:
    app = create_app()
    return loop.run_until_complete(aiohttp_client(app))  # type: ignore


@pytest.fixture()
def db() -> Engine:
    engine = sa.create_engine(DB_URL)

    metadata.drop_all(engine)
    metadata.create_all(engine)

    with engine.connect() as connection:
        yield connection

    engine.dispose()
