from flask import Blueprint, request
from ..models import db, Post, Comment
from ..forms import PostForm
from flask_login import login_required, current_user


def validation_errors(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

post_routes = Blueprint('posts', __name__)

# GET all posts for current users
@post_routes.route('/')
# @login_required
def posts():
    posts = Post.query.all(Post.user_id == current_user.id)
    return {"posts": [post.to_dict() for post in posts]}

#Create a post
@post_routes.route('/', methods=['POST'])
# @login_required
def create_post():
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post(
            user_id = current_user.id,
            post_msg = form.data['post_msg'],
            post_img = form.data['post_img'],
            post_video = form.data['post_video']
        )
        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    return {'errors': validation_errors(form.errors)}, 401

#Edit a post
@post_routes.route('/', methods=['PUT'])
def edit_post(id):
    post = Post.query.get(id)  # this is findbyPK , id is the post id

    if not post :
        return {'errors': ['Post not found']}, 404

    if post.user_id != current_user.id:
        return {'errors': ['Unauthorized']}, 401

    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        post.post_msg = form.data['post_msg']
        post.post_img = form.data['post_img']
        post.post_video = form.data['post_video']
        db.session.commit()
        return post.to_dict()

#Delete a post
@post_routes.route('/', methods=['DELETE'])
def delete_post(id):
    post = Post.query.get(id)

    if not post:
            return {'errors': 'Track not found', 'statusCode': 404}

    if current_user.id != post.user_id:
        return {'errors': 'Unauthorized', 'statusCode': 401}

    db.session.delete(post)
    db.session.commit()
    return post.to_dict()
