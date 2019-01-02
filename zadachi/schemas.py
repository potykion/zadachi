from marshmallow import Schema, fields


class TaskSchema(Schema):
    id = fields.Str()
    title = fields.Str()
    tag = fields.Str(allow_none=True)
    created_date = fields.DateTime()
    target_date = fields.DateTime()
    completed_date = fields.DateTime(allow_none=True)
