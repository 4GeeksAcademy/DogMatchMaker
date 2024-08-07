
"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, UserAccount
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

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
        "result": user.serialize()
    }

    return jsonify(response_body), 200


@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # Query your database for username and password
    userAccount = UserAccount.query.filter_by(email=email, password=password).first()

    if userAccount is None:
        # The user was not found on the database
        return jsonify({"msg": "Bad username or password"}), 401
    
    # Create a new token with the user id inside
    access_token = create_access_token(identity=userAccount.email)
    return jsonify({ "access_token": access_token })


@api.route('/private', methods=['GET'])
@jwt_required()
def private_hello():

    userAccount = get_jwt_identity() 

    response_body = {
        "section": "Private",
        "message": "Logged in as "+str(userAccount)
    }

    return jsonify(response_body), 200
