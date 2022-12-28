from flask import Blueprint, request
# from flask_login import login_required
from app.models import User

search_routes = Blueprint('search',__name__)

@search_routes.route('/top')
def search_user():
    if "q" in request.args:
        search = [term.lower() for term in request.args['q'].split()]
        print(search)
        result = User.first_name.ilike(f"%{search}%")
