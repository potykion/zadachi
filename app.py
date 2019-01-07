from aiohttp import web

from zadachi.app import create_app
from zadachi.config import DEBUG, HOST, PORT
from zadachi.tables import seed_db

if __name__ == '__main__':
    if DEBUG:
        seed_db()

    app = create_app()
    web.run_app(app, host=HOST, port=PORT)
