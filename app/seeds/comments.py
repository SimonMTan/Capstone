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

    comment4 = Comment(
        user_id=2,
        post_id=2,
        comment="This is a test comment4"
    )
    comment5 = Comment(
        user_id=3,
        post_id=3,
        comment="This is a test comment5"
    )
    comment6 = Comment(
        user_id=2,
        post_id=3,
        comment="This is a test comment6"
    )
    comment7 = Comment(
        user_id=2,
        post_id=1,
        comment="This is a test comment7"
    )
    comment8 = Comment(
        user_id=1,
        post_id=4,
        comment="This is a test comment8"
    )
    comment9 = Comment(
        user_id=3,
        post_id=5,
        comment="This is a test comment9"
    )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)
    db.session.add(comment9)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
