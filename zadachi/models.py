from datetime import datetime
from typing import Optional

import attr


@attr.s(auto_attribs=True)
class Task:
    id: int
    title: str
    tag: Optional[str] = None
    created_date: datetime = attr.ib(factory=datetime.utcnow)
    target_date: datetime = attr.ib(factory=datetime.utcnow)
    completed_date: Optional[datetime] = None
