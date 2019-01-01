import sqlalchemy as sa

metadata = sa.MetaData()

task = sa.Table(
    "task",
    metadata,
    sa.Column("id", sa.Integer, primary_key=True),
    sa.Column("title", sa.String(128), nullable=False),
    sa.Column("tag", sa.String(128)),
    sa.Column("created_date", sa.DateTime, nullable=False),
    sa.Column("target_date", sa.DateTime, nullable=False),
    sa.Column("completed_date", sa.DateTime),
)
