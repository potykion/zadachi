from aiohttp import ClientResponse
from aiohttp.test_utils import TestClient

from zadachi.config import LOGIN_ENV
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
