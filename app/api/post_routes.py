from flask import Blueprint, request
from ..models import db, Post, Comment
from ..forms import PostForm
from flask_login import login_required, current_user
from sqlalchemy import desc,asc


def validation_errors(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

post_routes = Blueprint('posts', __name__)

# GET all posts
@post_routes.route('/')
# @login_required
def posts():
    posts = Post.query.all()
    # print(posts, '<<<<<<<<<<<<<<<<this is posts>>>>>>>>')
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
            post_msg = form.post_msg.data,
            post_img = form.post_img.data,
            post_video = form.post_video.data
        )
        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    return {'errors': validation_errors(form.errors), "statusCode": 401}
    # if "image" not in request.files:
    #     return {"errors": "image required"}, 400

    # image = request.files["image"]

    # if not allowed_file(image.filename):
    #     return {"errors": "file type not permitted"}, 400

    # image.filename = get_unique_filename(image.filename)

    # upload = upload_file_to_s3(image)

    # if "url" not in upload:
    #     # if the dictionary doesn't have a url key
    #     # it means that there was an error when we tried to upload
    #     # so we send back that error message
    #     return upload, 400

    # url = upload["url"]
    # # flask_login allows us to get the current user from the request
    # new_image = Image(user=current_user, url=url)
    # db.session.add(new_image)
    # db.session.commit()
    # return {"url": url}


# #all post by current user
# @post_routes.route('/<int:id>')
# @login_required
# def user_post(id):
#     post = Post.query.filter(user.id == id)
#     return {"post": post}


#Edit a post
@post_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_post(id):
    post = Post.query.get(id)  # this is findbyPK , id is the post id

    if not post :
        return {'errors': ['Post not found']}, 404
    # print('!!!!!!!!!!!!post user id!!!!!', post.user_id)
    # print('@@@@@@current user id@@@@@@@@@@@', current_user.id)
    if post.user_id != current_user.id:
        return {'errors': ['Unauthorized']}, 401

    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        post.user_id = current_user.id
        post.post_msg = form.post_msg.data
        post.post_img = form.post_img.data
        post.post_video = form.post_video.data
        db.session.commit()
        return post.to_dict()

    return {'errors': validation_errors(form.errors), "statusCode": 401}

#Delete a post
@post_routes.route('/<int:id>', methods=['DELETE'])
def delete_post(id):
    post = Post.query.get(id)

    if not post:
        return {'errors': 'Track not found', 'statusCode': 404}

    if current_user.id != post.user_id:
        return {'errors': 'Unauthorized', 'statusCode': 401}

    db.session.delete(post)
    db.session.commit()
    return {
    "message": "Successfully deleted",
    "statusCode": 200
    }
