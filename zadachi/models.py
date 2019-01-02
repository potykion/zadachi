import uuid
from datetime import datetime
from typing import Optional

import attr


def generate_uuid() -> str:
    return str(uuid.uuid4())


@attr.s(auto_attribs=True)
class Task:
    id: str = attr.ib(factory=generate_uuid)
    title: str = ""
    tag: Optional[str] = None
    created_date: datetime = attr.ib(factory=datetime.utcnow)
    target_date: datetime = attr.ib(factory=datetime.utcnow)
    completed_date: Optional[datetime] = None
