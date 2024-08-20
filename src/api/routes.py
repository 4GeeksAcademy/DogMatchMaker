"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, Blueprint, url_for, redirect, render_template,send_from_directory
import logging
from api.models import db, UserAccount, Contact
from api.utils import generate_sitemap, APIException
from flask_cors import CORS, cross_origin
import json
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, set_access_cookies, unset_jwt_cookies
from werkzeug.utils import secure_filename
import os
import re

logging.basicConfig(level=logging.DEBUG)

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api, supports_credentials=True)


CORS(api, resources={r"api/*": {"origins": "http://localhost:3001"}})

# Define the path where profile pictures will be stored
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

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
    
    # Save profile picture if available
    profile_picture = request.files.get('profile_picture')
    profile_picture_filename = None
    if profile_picture:
        profile_picture_filename = secure_filename(profile_picture.filename)
        profile_picture.save(os.path.join(UPLOAD_FOLDER, profile_picture_filename))
    
    userAccount = UserAccount(
        email=email,
        password=password,  # Ideally, you should hash this password before saving
        dog_name=dog_name,
        owner_name=owner_name,
        nick_name=nick_name,
        dog_age=dog_age,
        location=location,
        breed=breed,
        dog_sex=dog_sex,
        bio=bio,
        interests=interests,
        profile_picture=profile_picture_filename  # Save filename to the database
    )

    db.session.add(userAccount)
    db.session.commit()
    
    response_body = {
        "result": userAccount.serialize()
    }

    return jsonify(response_body), 200





@api.route('/contact', methods=['GET'])
@cross_origin()
def get_contacts():
    contacts = Contact.query.all()
    serialized_contacts = [contact.serialize() for contact in contacts]
    return jsonify(serialized_contacts), 200

@api.route('/contact', methods=['POST'])
@cross_origin()
def contact():
    data = request.get_json()

    if not re.match(r'^[A-Za-z\s]+$', data['name']):
        return jsonify({"error": "Name must contain only alphabetic characters"}), 400

    if '@' not in data['email']:
        return jsonify({"error": "Invalid email address"}), 400

    if data.get('phone') and not re.match(r'^\d{10,15}$', data['phone']):
        return jsonify({"error": "Phone number must contain 10-15 digits"}), 400

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



@api.route("/token", methods=["POST"])
@cross_origin()
def create_token():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = UserAccount.query.filter_by(email=email).first()
    if user and user.password == password:
        access_token = create_access_token(identity=user.email)
        response = jsonify({ "access_token": access_token })
        set_access_cookies(response, access_token)
        return response
    else:
        return jsonify({"msg": "Bad email or password"}), 401

@api.route('/private', methods=['GET'])
@jwt_required()
@cross_origin()
def private_hello():
    Profile = get_jwt_identity()

    response_body = {
        "section": "Private",
        "message": "Logged in as " + str(Profile)
    }

    return jsonify(response_body), 200



# Other route definitions...

@api.route('/form')
def serve_form():
    return render_template('form.html')

@api.route('/search_user', methods=['GET'])
@cross_origin()
def search_user():
    # Retrieve form data from the query parameters
    owner_name = request.args.get('owner_name')
    email = request.args.get('useremail')

    # Log the search parameters
    logging.debug(f"Searching for owner_name: {owner_name}, email: {email}")

    # Start building the query
    query = db.session.query(UserAccount)
    
    if owner_name:
        query = query.filter(UserAccount.owner_name == owner_name)
    if email:
        query = query.filter(UserAccount.email == email)
    
    # Get the first user that matches the criteria
    user = query.first()
    
    # Log the query result
    logging.debug(f"Query result: {user}")
    
    if user:
        # Generate URL for the profile picture if it exists
        profile_pic_url = None
        if user.profile_picture:
            profile_pic_url = url_for('serve_uploads', filename=user.profile_picture, _external=True)

        # Serialize the user data if found
        user_data = {
            'owner_name': user.owner_name,
            'dog_name': user.dog_name,
            'email': user.email,
            'profile_pic': profile_pic_url
        }
        response = {
            'result': user_data,
            'message': 'User found!'
        }
    else:
        # Return a message if no user is found
        response = {
            'result': None,
            'message': 'User does not exist'
        }
    
    # Log the final response
    logging.debug(f"Response: {response}")
    
    return jsonify(response)

# Route to serve uploaded profile pictures
@api.route('/uploads/<filename>')
def serve_uploads(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)
