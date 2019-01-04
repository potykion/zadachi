from aiohttp import web

from zadachi.app import create_app
from zadachi.config import DEBUG
from zadachi.tables import seed_db

if __name__ == '__main__':
    if DEBUG:
        seed_db()

    app = create_app()
    web.run_app(app)
