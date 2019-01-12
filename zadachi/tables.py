import sqlalchemy as sa

from zadachi.config import DB_URL
from zadachi.models import Task
from zadachi.schemas import TaskSchema
from zadachi.utils import text_generator

metadata = sa.MetaData()

task = sa.Table(
    "task",
    metadata,
    sa.Column("id", sa.String(64), primary_key=True),
    sa.Column("title", sa.String(256), nullable=False),
    sa.Column("tag", sa.String(128)),
    sa.Column("created_date", sa.DateTime, nullable=False),
    sa.Column("target_date", sa.DateTime, nullable=False),
    sa.Column("completed_date", sa.DateTime),
)

tasks_count_query = sa.select([sa.func.COUNT(task.c.id)])


def seed_db(count: int = 3) -> None:
    engine = sa.create_engine(DB_URL)
    metadata.create_all(engine)

    with engine.connect() as connection:
        tasks_exist = connection.execute(tasks_count_query).scalar()

        if not tasks_exist:
            title_length = task.c.title.type.length

            tasks = [Task(title=text) for text in text_generator(count, title_length)]
            schema = TaskSchema()
            serialized_tasks, _ = schema.dump(tasks, many=True)

            insert_tasks = sa.insert(task).values(serialized_tasks)
            connection.execute(insert_tasks)

    engine.dispose()
