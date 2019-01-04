import uuid
from typing import Dict, Optional, Iterable

import jwt
from faker import Faker

from zadachi.config import JWT_SECRET


def generate_jwt(payload: Dict, with_prefix: bool = False) -> str:
    prefix = "JWT " if with_prefix else ""
    token = jwt.encode(payload, JWT_SECRET).decode("utf-8")
    return f"{prefix}{token}"


def text_generator(
    texts_count: int, max_text_length: int, faker_: Optional[Faker] = None
) -> Iterable[str]:
    faker_ = faker_ or Faker("ru_RU")
    for _ in range(texts_count):
        yield faker_.text(max_nb_chars=max_text_length).replace("\n", " ")


def generate_uuid() -> str:
    return str(uuid.uuid4())
