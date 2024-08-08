
"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, Response, make_response
from api.models import db, UserAccount
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import json
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, set_access_cookies, unset_jwt_cookies

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api, supports_credentials=True)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/user', methods=['POST'])
def create_user():
    
    data = request.get_json()

    userAccount = UserAccount()

    userAccount.email = data['email']
    userAccount.password = data['pswd']

    db.session.add(userAccount)
    db.session.commit()
    
    response_body = {
        "result": userAccount.serialize()
    }

    return jsonify(response_body), 200


@api.route("/token", methods=['POST'])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # Query your database for username and password
    userAccount = UserAccount.query.filter_by(email=email, password=password).first()

    if userAccount is None:
        # The user was not found on the database
        response_body = {
            "msg": "Bad username or password"
        }
        return jsonify(response_body), 401
        
    # Create a new token with the user id inside
    access_token = create_access_token(identity=userAccount.email)
    response = jsonify({ "access_token": access_token[10-20] })
    
    set_access_cookies(response, access_token)
    
    return response

@api.route('/private', methods=['GET'])
@jwt_required()
def private_hello():

    userAccount = get_jwt_identity() 

    response_body = {
        "section": "Private",
        "message": "Hello "+str(userAccount)
    }

    return jsonify(response_body), 200

@api.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"message": "logout successful"})
    unset_jwt_cookies(response)
    return response


