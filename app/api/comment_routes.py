from flask import Blueprint, request
from ..models import db, Post, Comment, User
from ..forms import PostForm,CommentForm
from flask_login import login_required, current_user

def validation_errors(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

comment_routes = Blueprint('comments', __name__)

#Get all the comment for a post
@comment_routes.route('/')
def comments(id):
    comments = Comment.query.get(id)
    return {"comments": [comment.to_dict() for comment in comments]}

#Create a comment for a post
@comment_routes.route('/<int:id>', methods=['POST'])
def create_comment(id): # id is the post id
    form = CommentForm()
    print('<<<<<<<<FORM DATA: >>>>>>>>>', form.data)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            user_id = current_user.id,
            post_id = id,
            comment = form.comment.data
        )
        print('<<<<<<<<comment: >>>>>>>>>', comment)
        db.session.add(comment)
        db.session.commit()

        return comment.to_dict()
    return {'errors': validation_errors(form.errors)}, 401

#Edit a comment for a post,
@comment_routes.route('/<int:id>', methods=['PUT'])
def edit_comment(id):
    comment = Comment.query.get(id)

    if not comment:
        return {'errors': ['Comment not found']}, 404

    if comment.user_id != current_user.id:
        return {'errors': ['Unauthorized']}, 401

    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        comment.comment = form.comment.data
        db.session.commit()
        return comment.to_dict()
    return {'errors': validation_errors(form.errors)}, 401

#delete a comment for a post, id is the comment id
@comment_routes.route('/<int:id>', methods=['DELETE'])
def delete_comment(id):

    comment = Comment.query.get(id)

    if not comment:
        return {'errors': ['Comment not found']}, 404

    if comment.user_id != current_user.id:
        return {'errors': ['Unauthorized']}, 401


    db.session.delete(comment)
    db.session.commit()
    return comment.to_dict()
