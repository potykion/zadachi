from typing import Dict

import jwt

from zadachi.config import JWT_SECRET


def generate_jwt(payload: Dict, with_prefix: bool = False) -> str:
    prefix = "JWT " if with_prefix else ""
    token = jwt.encode(payload, JWT_SECRET).decode("utf-8")
    return f"{prefix}{token}"
