from flask import Blueprint, request
# from flask_login import login_required
from app.models import User
from sqlalchemy import or_

search_routes = Blueprint('search',__name__)

@search_routes.route('/top')
def search_user():
    if "q" in request.args:
        search = [term.lower() for term in request.args['q'].split()]
        # print(search , 'this is search $$$$$$$')
        # print(type(search), 'this is type of Search @@@@@' )
        searchstr = ''.join(search)
        # print(searchstr,'this is search but string <><><><><')
    results = User.query.filter(or_(User.first_name.ilike(f"%{searchstr}%"),User.last_name.ilike(f"%{searchstr}%")))
    # print(results ,'<<<<<<<<<<<<<<<<<<<<<<<<<<<<')

    return {'search_result':[result.to_dict() for result in results]}
