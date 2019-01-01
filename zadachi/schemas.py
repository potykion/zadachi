from typing import Dict

from marshmallow import Schema, fields, post_load

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
