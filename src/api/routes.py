from flask import Blueprint, request, jsonify
from api.models import db, UserAccount,Contact
from api.utils import APIException
from flask_cors import cross_origin
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
import os
import re

api = Blueprint('api', __name__)

# Define the path where profile pictures will be stored
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@api.route('/user', methods=['POST'])
@cross_origin()  # Allow CORS requests to this endpoint
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

@api.route("/token", methods=["POST"])
@cross_origin()  # Allow CORS requests to this endpoint
def create_token():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    # Query your database for email and password
    userAccount = UserAccount.query.filter_by(email=email, password=password).first()

    if userAccount is None:
        return jsonify({"msg": "Bad email or password"}), 401
    
    access_token = create_access_token(identity=userAccount.email)
    return jsonify({ "access_token": access_token })

@api.route('/private', methods=['GET'])
@jwt_required()
@cross_origin()  # Allow CORS requests to this endpoint
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
