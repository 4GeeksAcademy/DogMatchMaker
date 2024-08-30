"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Blueprint, request, jsonify, render_template
from api.models import db, UserAccount, Like, Message
from api.utils import generate_sitemap, APIException
from flask_cors import CORS, cross_origin
import json
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, set_access_cookies, unset_jwt_cookies
from werkzeug.utils import secure_filename
import os
import requests
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
from Crypto.PublicKey import RSA
from Crypto.Hash import SHA256
from base64 import b64decode

key = RSA.generate(2048)
private_key = key.export_key()

dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../')

with open(dir+"/private.pem", "wb") as f:
    f.write(private_key)

public_key = key.publickey().export_key()
with open(dir+"/public.pem", "wb") as f:
    f.write(public_key)

def get_public_key():
    """Retrieve public key securely using pycryptodome methods."""
    key_binary = open(dir+"/public.pem", 'rb')
    key = RSA.import_key(key_binary.read())
    key_binary.close()
    return key.public_key().export_key()

def get_private_key():
    """Retrieve private key securely using pycryptodome methods."""
    key_binary = open(dir+"/private.pem", 'rb')
    key = RSA.import_key(key_binary.read())
    key_binary.close()
    return key

def decrypt_data(encrypted_value):
    """Decrypt data using private key obtained securely."""
    cipher = PKCS1_OAEP.new(get_private_key(), hashAlgo=SHA256)
    decrypted_message = cipher.decrypt(b64decode(encrypted_value))
    return decrypted_message.decode()

api = Blueprint('api', __name__)

PRIVATE_KEY ="ff29d706-4125-4092-9562-8d7ec0a76522"
PROJECT_ID="bfbbfc3d-6972-42a7-84d3-b55e82c4891f"


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

@api.route('/public_key', methods=['GET'])
def public_key():
    return get_public_key(), 200

@api.route("/token", methods=["POST"])
def create_token():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    userAccount = UserAccount.query.filter_by(email=email).filter_by(password=decrypt_data(password)).first()
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
    response = requests.post("https://api.chatengine.io/users", 
                        headers={"PRIVATE-KEY": PRIVATE_KEY},
                        data={
                            "username": username,
                            "first_name": username,
                            "last_name": ' ',
                            "secret": "123456"
                        })
    return response.json

async def createAnotherChat(username1, username2, chatName):
    response = requests.put("https://api.chatengine.io/chats",
                        headers={"Project-ID": PROJECT_ID,
                                 "User-Name" : username1,
                                 "User-Secret" : "123456"},
                        data={
                            "usernames": [username2],
                            "is_direct_chat": False,
                            "title": chatName,
                        })
    
    return response.json()

async def addMembers(username1, username2, chat_id):
    response = requests.put("https://api.chatengine.io/chats/"+str(chat_id)+"/people/",
                        headers={"Project-ID": PROJECT_ID,
                                 "User-Name" : username1,
                                 "User-Secret" : "123456"},
                        data={
                            "username": username2
                        })
    return response.json()

async def changeNameChat(username1, chat_id, chatName):
    response = requests.patch("https://api.chatengine.io/chats/"+str(chat_id)+"/",
                        headers={"Project-ID": PROJECT_ID,
                                 "User-Name" : username1,
                                 "User-Secret" : "123456"},
                        data={
                            "title": chatName,
                            "is_direct_chat": False
                        })
    return response.json()

async def makeMatch(username1, username2, chatName) :
    await createAnotherUser(username1)
    await createAnotherUser(username2)
    resp = await createAnotherChat(username1, username2, chatName)
    await addMembers(username1, username2, resp['id'])
    await changeNameChat(username1, resp['id'], chatName)
    
    return resp['id']

@api.route("/match", methods=['POST'])
async def make_match():
    username1 = request.json.get("username1", None)
    username2 = request.json.get("username2", None)
    print(username1, username2)
    return await makeMatch(username1, username2)

async def deleteMatch(username1,chatId) :
    response = requests.delete("https://api.chatengine.io/chats/"+chatId,
                        headers={"Project-ID": PROJECT_ID,
                                 "User-Name" : username1,
                                 "User-Secret" : "123456"}
                        )
    return response.json()
@api.route("/unmatch", methods=['POST'])
async def make_unmatch():
    username1 = request.json.get("username1", None)
    chatId = request.json.get("chatId", None)
    return await deleteMatch(username1, chatId)


@api.route('/like', methods=['POST'])
@jwt_required()
async def send_like():
    current_user = get_jwt_identity()
    data = request.json
    match = Like.query.filter_by(user_id = data['liked_user']).filter_by(liked_user_id = current_user).first()
    check_match = False
    liked_user = UserAccount.query.filter_by(user_id = data['liked_user']).first()
    current_usera = UserAccount.query.filter_by(user_id = current_user).first()
    chat_id = None
    if match:
        check_match = True
        match.match_likes = True
        db.session.commit() 
        chat_id = await makeMatch(current_usera.email, liked_user.email, current_usera.dog_name+" and "+liked_user.dog_name) 
        
    new_like = Like(user_id=current_user, liked_user_id=data['liked_user'], match_likes=check_match, chat_id=chat_id)    
    db.session.add(new_like)
    db.session.commit()
    return_like = new_like.serialize()
    liked_s = liked_user.serialize()

    return jsonify({'success': True, 'message': 'Like was successful.', 'like': return_like, 'user': liked_s})


@api.route('/like', methods=['DELETE'])
@jwt_required()
def remove_like():
    current_user = get_jwt_identity()
    data = request.json
    
    # Check if 'liked_user' is in the request data
    if 'liked_user' not in data:
        return jsonify({'success': False, 'message': 'Liked user ID is required.'}), 400

    # Find the like entry that matches current_user and liked_user
    like_to_delete = Like.query.filter_by(user_id=current_user, liked_user_id=data['liked_user']).first()

    if like_to_delete:
        db.session.delete(like_to_delete)
        db.session.commit()
        return jsonify({'success': True, 'message': 'Like was successfully removed.'})
    else:
        return jsonify({'success': False, 'message': 'Like not found.'}), 404

    

    
@api.route('/getuserlikes', methods=['GET'])
@jwt_required()
def handle_get_user_likes():
    current_user = get_jwt_identity()
    user_likes = Like.query.filter_by(user_id=current_user).all()
    matches = []
    
    
   ## liked_user = UserAccount.query.filter_by(user_id = data["liked_user"]).first()
   ## serialized = liked_user.serialize()
    
    for item in user_likes:
        if item.match_likes == True:
           user = UserAccount.query.filter_by(user_id=item.liked_user_id).first()
           user_s = user.serialize()
           single = item.serialize()
           put_together = {
                'like': single,
                'user': user_s
            }
           matches.append(put_together)

    return jsonify({"success": True, "matches": matches}), 200