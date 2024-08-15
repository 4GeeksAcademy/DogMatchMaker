"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, Blueprint
from api.models import db, UserAccount,Contact
from api.utils import generate_sitemap, APIException
from flask_cors import CORS, cross_origin
import json
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, set_access_cookies, unset_jwt_cookies
import requests
from werkzeug.utils import secure_filename
import os
import re

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

    if userAccount is None or not userAccount.check_password(password):  # Ensure you check hashed password
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


@api.route('/contact', methods=['GET'])
def get_contacts():
    # Retrieve all contact entries from the database
    contacts = Contact.query.all()

    # Serialize the contact data
    serialized_contacts = [contact.serialize() for contact in contacts]

    # Return the serialized contact data as JSON
    return jsonify(serialized_contacts), 200

@api.route('/contact', methods=['POST'])
def contact():
    data = request.get_json()

    if not re.match(r'^[A-Za-z\s]+$', data['name']):
        return jsonify({"error": "Name must contain only alphabetic characters"}), 400

    # Validation for email (must contain @)
    if '@' not in data['email']:
        return jsonify({"error": "Invalid email address"}), 400

    # Validation for phone (only digits, optional)
    if data.get('phone') and not re.match(r'^\d{10,15}$', data['phone']):
        return jsonify({"error": "Phone number must contain 10-15 digits"}), 400

    # Validation for subject and message (minimum length)
    if len(data['subject']) < 5:
        return jsonify({"error": "Subject must be at least 5 characters long"}), 400
    if len(data['message']) < 10:
        return jsonify({"error": "Message must be at least 10 characters long"}), 400

    new_contact = Contact(
        name=data['name'],
        email=data['email'],
        phone=data.get('phone'),
        subject=data['subject'],
        message=data['message']
    )

    db.session.add(new_contact)
    db.session.commit()

    return jsonify({"message": "Contact information saved!"}), 201

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
