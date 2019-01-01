import asyncio

import pytest
from aiohttp.test_utils import TestClient

from zadachi.app import create_app


@pytest.fixture()
def cli(loop: asyncio.AbstractEventLoop, aiohttp_client: TestClient) -> TestClient:
    app = create_app()
    return loop.run_until_complete(aiohttp_client(app))
