from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password',first_name='Demo',last_name='User',profile_photo='https://img.bleacherreport.net/img/images/photos/003/240/268/hi-res-c2ae4bfb157b4f7406f504424093b6d9_crop_exact.jpg?w=1200&h=1200&q=75',cover_photo='https://i.imgur.com/ukzX2Tf.jpg')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password',first_name='Marnie',last_name='Barnes',profile_photo='https://www.giantbomb.com/a/uploads/scale_small/7/73970/3378516-4152695206-zined.jpg',cover_photo='https://i.imgur.com/ukzX2Tf.jpg')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password',first_name='Bobbie',last_name='Barnes',profile_photo='https://www.si.com/.image/c_fit%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_620/MTc5NTMwMzAxNjQ1NTMwMjQ5/gettyimages-891445.jpg',cover_photo='https://i.imgur.com/ukzX2Tf.jpg')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
