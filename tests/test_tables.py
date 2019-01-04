from sqlalchemy.engine import Connection

from zadachi.tables import seed_db, tasks_count_query


def test_seed_db(db: Connection) -> None:
    count = 5

    seed_db(count)

    assert db.execute(tasks_count_query).scalar() == count
