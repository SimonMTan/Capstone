from app.models import db, Post, environment, SCHEMA

def seed_posts():
    post1 = Post(
        user_id=1,
        post_msg="This is a test post",
        post_img="https://i.imgur.com/7X4G9v1.jpeg",
        post_video='https://i.imgur.com/eWrYBlL.mp4'
    )
    post2 = Post(
        user_id=2,
        post_msg="This is a test post2",
        post_img="https://i.imgur.com/7X4G9v1.jpeg",

    )
    post3 = Post(
        user_id=3,
        post_msg="This is a test post 3",
        post_video='https://i.imgur.com/eWrYBlL.mp4'
    )
    post4 = Post(
        user_id=3,
        post_msg="This is a test post 4",
        post_video='https://i.imgur.com/eWrYBlL.mp4'
    )
    post5 = Post(
        user_id=1,
        post_msg="This is a test post 4",
        post_video='https://i.imgur.com/eWrYBlL.mp4'
    )
    post6 = Post(
        user_id=1,
        post_msg="This is a test post 4",
        post_video='https://i.imgur.com/eWrYBlL.mp4'
    )

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM posts")

    db.session.commit()
