from flask import Blueprint
from flask_login import login_required, current_user
from ..models import db,Like

like_routes = Blueprint('likes',__name__)

# @like_routes.route('/<int:id>/total')
# def total_likes(id):
#     likes = Like.query.filter(Like.post_id == id).count()
#     print('''
#           -----------------
#           this is from the like total route
#           -----------------
#           ''',
#           likes)
#     return {'likes': likes}

@like_routes.route('/<int:id>', methods=['POST'])
def voted(id):
    votecheck = Like.query.filter(Like.user_id == current_user.id, Like.post_id == id).first()
    if votecheck:
        db.session.delete(votecheck)
        db.session.commit()
        return {'vote': False}

    like = Like(
        user_id = current_user.id,
        post_id = id,
        status = 1
    )
    db.session.add(like)
    db.session.commit()
    return like.to_dict()
