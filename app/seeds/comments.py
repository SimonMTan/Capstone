from app.models import db, Comment, environment, SCHEMA

def seed_comments():
    comment1 = Comment(
        user_id=3,
        post_id=1,
        comment="This is a test comment1"
    )
    comment2 = Comment(
        user_id=1,
        post_id=2,
        comment="This is a test comment2"

    )
    comment3 = Comment(
        user_id=2,
        post_id=3,
        comment="This is a test comment3"
    )

    db.session.add(comment1)
    db.sesson.add(comment2)
    db.session.add(comment3)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
