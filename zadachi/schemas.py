from marshmallow import Schema, fields


class TaskSchema(Schema):
    created_date = fields.DateTime()
    target_date = fields.DateTime()
    completed_date = fields.DateTime()

    class Meta:
        fields = ("id", "title", "tag", "created_date", "target_date", "completed_date")
