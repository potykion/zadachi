from datetime import datetime
from typing import Dict

from marshmallow import Schema, fields, post_load
from marshmallow.schema import BaseSchema

from zadachi.models import Task


class TaskSchema(Schema):
    tag = fields.Str(allow_none=True)
    created_date = fields.DateTime()
    target_date = fields.DateTime()
    completed_date = fields.DateTime(allow_none=True)

    class Meta:
        fields = ("id", "title", "tag", "created_date", "target_date", "completed_date")

    @post_load
    def to_model(self, data: Dict) -> Task:
        return Task(**data)


class CreateTaskSchema(Schema):
    title = fields.Str(required=True)
    tag = fields.Str(allow_none=True)
    created_date = fields.DateTime()
    target_date = fields.DateTime()
    completed_date = fields.DateTime(allow_none=True)

    @post_load
    def append_dates(self: BaseSchema, data: Dict) -> Dict:
        data.setdefault("created_date", datetime.utcnow())
        data.setdefault("target_date", datetime.utcnow())
        return data
