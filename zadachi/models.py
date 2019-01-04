from datetime import datetime
from typing import Optional

import attr

from zadachi.utils import generate_uuid


@attr.s(auto_attribs=True)
class Task:
    id: str = attr.ib(factory=generate_uuid)
    title: str = ""
    tag: Optional[str] = None
    created_date: datetime = attr.ib(factory=datetime.utcnow)
    target_date: datetime = attr.ib(factory=datetime.utcnow)
    completed_date: Optional[datetime] = None
