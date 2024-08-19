"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, Blueprint
from api.models import db, UserAccount
from api.utils import generate_sitemap, APIException
from flask_cors import CORS, cross_origin
import json
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, set_access_cookies, unset_jwt_cookies
import requests
from werkzeug.utils import secure_filename
import os

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api, supports_credentials=True)

# Define the path where profile pictures will be stored
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

@api.route('/user', methods=['POST'])
@cross_origin()
def create_user():
    email = request.form.get('email')
    password = request.form.get('password')
    dog_name = request.form.get('dog_name')
    owner_name = request.form.get('owner_name')
    nick_name = request.form.get('nick_name')
    dog_age = request.form.get('dog_age')
    location = request.form.get('location')
    breed = request.form.get('breed')
    dog_sex = request.form.get('dog_sex')
    bio = request.form.get('bio')
    interests = request.form.get('interests')
    
    profile_picture = request.files.get('profile_picture')
    profile_picture_filename = None
    if profile_picture:
        profile_picture_filename = secure_filename(profile_picture.filename)
        profile_picture.save(os.path.join(UPLOAD_FOLDER, profile_picture_filename))
    
    userAccount = UserAccount(
        email=email,
        password=password,  # Note: Password hashing should be handled in the model or service layer
        dog_name=dog_name,
        owner_name=owner_name,
        nick_name=nick_name,
        dog_age=dog_age,
        location=location,
        breed=breed,
        dog_sex=dog_sex,
        bio=bio,
        interests=interests,
        profile_picture=profile_picture_filename
    )

    db.session.add(userAccount)
    db.session.commit()
    
    response_body = {
        "result": userAccount.serialize()
    }

    return jsonify(response_body), 200

@api.route("/token", methods=["POST"])
@cross_origin()
def create_token():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    userAccount = UserAccount.query.filter_by(email=email).first()

    if userAccount is None:
        return jsonify({"msg": "Bad email or password"}), 401
    
    access_token = create_access_token(identity=userAccount.email)
    response = jsonify({"access_token": access_token})
    
    set_access_cookies(response, access_token)
    
    return response

@api.route('/private', methods=['GET'])
@jwt_required()
@cross_origin()
def private_hello():
    userAccount = get_jwt_identity() 

    response_body = {
        "section": "Private",
        "message": "Logged in as "+str(userAccount)
    }

    return jsonify(response_body), 200

@api.route('/users', methods=['GET'])
@cross_origin()
def get_users():
    users = UserAccount.query.all()
    response_body = {
        "users": [user.serialize() for user in users]
    }
    return jsonify(response_body), 200

@api.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"message": "logout successful"})
    unset_jwt_cookies(response)
    return response

@api.route("/userChat", methods=['POST'])
def create_user_chat():
    name = request.json.get("name", None)
    
    resp = requests.post("https://api.chatengine.io/users",
                        headers={"PRIVATE-KEY": "bf275b72-da68-4bd2-8f95-a00436f7aee7"},
                        data={
                            "username": name,
                            "first_name": name,
                            "last_name": ' ',
                            "secret": "123456"
                        })
     
    return jsonify(resp.json())

@api.route("/privateChat", methods=['PUT'])
def create_private_chat():
    name = request.json.get("name", None)
    guest = request.json.get("guest", None)
    
    resp = requests.put("https://api.chatengine.io/chats",
                        headers={"Project-ID": "bf275b72-da68-4bd2-8f95-a00436f7aee7",
                                 "User-Name" : name,
                                 "User-Secret" : "123456"},
                        data={
                                "usernames": [guest],
                                "is_direct_chat": True
                            })
        
    return jsonify(resp.json())
