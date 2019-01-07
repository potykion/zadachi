import os

from dotenv import find_dotenv, load_dotenv

load_dotenv(find_dotenv())

JWT_SECRET = os.environ["JWT_SECRET"]
LOGIN_ENV = os.environ["LOGIN_ENV"]
DB_URL = os.environ["DB_URL"]
DEBUG = bool(os.getenv("DEBUG"))

HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", "8080"))
