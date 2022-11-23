from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    post_msg = db.Column(db.String(255))
    post_img = db.Column(db.String(255))
    post_video = db.Column(db.String(255))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    post_user = db.relationship("User", back_populates="user_post")
    post_comments = db.relationship("Comment", back_populates="comment_post")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "post_msg": self.post_msg,
            "post_img": self.post_img,
            'post_video': self.post_video,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
