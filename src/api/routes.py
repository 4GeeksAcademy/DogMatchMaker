"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Blueprint, request, jsonify
from api.models import db, UserAccount, Like, Message
from api.utils import generate_sitemap, APIException
from flask_cors import CORS, cross_origin
import json
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, set_access_cookies, unset_jwt_cookies
from werkzeug.utils import secure_filename
import os
import requests

api = Blueprint('api', __name__)

PRIVATE_KEY = 'ff29d706-4125-4092-9562-8d7ec0a76522'
PROJECT_ID='bfbbfc3d-6972-42a7-84d3-b55e82c4891f'

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
def create_user():
    email = request.form.get('email')
    password = request.form.get('password')
    dog_name = request.form.get('dog_name')
    owner_name = request.form.get('owner_name')
    dog_age = request.form.get('dog_age')
    location = request.form.get('location')
    breed = request.form.get('breed')
    dog_sex = request.form.get('dog_sex')
    bio = request.form.get('bio')
    traits = request.form.get('traits')
    profile_picture = request.files.get('profile_picture')
    
    profile_picture_filename = None
    if profile_picture:
        profile_picture_filename = secure_filename(profile_picture.filename)
        profile_picture.save(os.path.join(UPLOAD_FOLDER, profile_picture_filename))
    
    userAccount = UserAccount(
        email=email,
        password=password,
        dog_name=dog_name,
        owner_name=owner_name,
        dog_age=dog_age,
        location=location,
        breed=breed,
        dog_sex=dog_sex,
        bio=bio,
        traits=traits,
        profile_picture=profile_picture_filename
    )

    db.session.add(userAccount)
    db.session.commit()
    
    response_body = {
        "result": userAccount.serialize()
    }

    return jsonify(response_body), 200

@api.route("/token", methods=["POST"])
def create_token():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    userAccount = UserAccount.query.filter_by(email=email).filter_by(password=password).first()
    if userAccount:
        access_token = create_access_token(identity=userAccount.user_id)
        return jsonify({"access_token": access_token})
    return jsonify({"msg": "Bad email or password"}), 401

@api.route('/private', methods=['GET'])
@jwt_required()
def private_hello():
    user_id = get_jwt_identity()
    userAccount = UserAccount.query.get(user_id)
    response_body = {
        "section": "Private",
        "message": "Logged in as " + str(userAccount.email)
    }
    return jsonify(response_body), 200

@api.route('/users', methods=['GET'])
def get_users():
    users = UserAccount.query.all()
    response_body = {
        "users": [user.serialize() for user in users]
    }
    return jsonify(response_body), 200

@api.route('/user', methods=['DELETE'])
@jwt_required()
def delete_user():
    user_id = get_jwt_identity()
    userAccount = UserAccount.query.get(user_id)
    
    if userAccount:
        try:
            db.session.delete(userAccount)
            db.session.commit()
            response = jsonify({"msg": "User account deleted"})
            unset_jwt_cookies(response)
            return response, 200
        except Exception as e:
            db.session.rollback()
            print(f"Error deleting user: {e}")  # Print error to server log
            return jsonify({"msg": "Error deleting account", "error": str(e)}), 500
    return jsonify({"msg": "User not found"}), 404

@api.route('/user/email', methods=['POST'])
@jwt_required()
def update_email():
    user_id = get_jwt_identity()
    userAccount = UserAccount.query.get(user_id)
    if userAccount:
        data = request.json  # Expect JSON body
        new_email = data.get('newEmail')
        if new_email:
            userAccount.email = new_email
            db.session.commit()
            return jsonify({"msg": "Email updated", "user": userAccount.serialize()}), 200
        return jsonify({"msg": "No new email provided"}), 400
    return jsonify({"msg": "User not found"}), 404

@api.route('/user/password', methods=['POST'])
@jwt_required()
def update_password():
    user_id = get_jwt_identity()
    userAccount = UserAccount.query.get(user_id)
    if userAccount:
        data = request.json  # Expect JSON body
        current_password = data.get('currentPassword')
        new_password = data.get('newPassword')
        if userAccount.check_password(current_password):
            if new_password:
                userAccount.set_password(new_password)
                db.session.commit()
                return jsonify({"msg": "Password updated", "user": userAccount.serialize()}), 200
            return jsonify({"msg": "No new password provided"}), 400
        return jsonify({"msg": "Current password is incorrect"}), 401
    return jsonify({"msg": "User not found"}), 404

@api.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"message": "logout successful"})
    unset_jwt_cookies(response)
    return response

async def createAnotherUser(username) :
    response = requests.post("https://api.chatengine.io/users", headers={"PRIVATE-KEY": PRIVATE_KEY},
                        data={
                            "username": username,
                            "first_name": username,
                            "last_name": ' ',
                            "secret": "123456"
                        })
    return response.json

async def createAnotherChat(username1, username2):

    response3 = requests.put("https://api.chatengine.io/chats",
                        headers={"Project-ID": PROJECT_ID,
                                 "User-Name" : username1,
                                 "User-Secret" : "123456"},
                        data={
                            "usernames": [username2],
                            "is_direct_chat": True
                        })
    
    return response3.json()

async def makeMatch(username1, username2) :

    await createAnotherUser(username1)
    await createAnotherUser(username2)
    json3 = await createAnotherChat(username1, username2)

    return jsonify(json3)

@api.route("/match", methods=['POST'])
async def make_match():
    username1 = request.json.get("username1", None)
    username2 = request.json.get("username2", None)
    print(username1, username2)
    return await makeMatch(username1, username2)