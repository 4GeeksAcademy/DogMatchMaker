from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, set_access_cookies
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from api.models import db, Profile, SignUp,Contact
import os
import re

api = Blueprint('api', __name__)

# Define the path where profile pictures will be stored
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@api.route('/api/signup', methods=['POST'])
@cross_origin()
def signup():
    data = request.json
    email = data.get('email')
    username = data.get('username')
    password = data.get('password')
    confirm_password = data.get('confirmPassword')

    if password != confirm_password:
        return jsonify({'error': 'Passwords do not match.'}), 400

    # Validate username
    if not re.match(r'^[\w.@+-]+$', username) or len(username) < 3:
        return jsonify({'error': 'Username must be at least 3 characters long and contain only letters, digits, and underscores.'}), 400

    # Validate email
    if not re.match(r'^[^@]+@[^@]+\.[^@]+$', email):
        return jsonify({'error': 'Invalid email address.'}), 400

    hashed_password = generate_password_hash(password, method='sha256')

    # Check if the email or username already exists
    existing_user = SignUp.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'error': 'Email already registered.'}), 400

    existing_user = SignUp.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({'error': 'Username already taken.'}), 400

    # Save the user to the database
    new_user = SignUp(
        email=email,
        username=username,
        password=hashed_password
    )
    db.session.add(new_user)
    db.session.commit()

    # Create a JWT token for the new user
    access_token = create_access_token(identity=new_user.email)
    
    response = jsonify({'message': 'User registered successfully.', 'access_token': access_token})
    set_access_cookies(response, access_token)
    
    return response, 200


@api.route('/profile', methods=['POST'])
@cross_origin()
def create_profile():
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
    
    # Check if profile exists for the email
    profile = Profile.query.filter_by(email=email).first()
    if profile:
        return jsonify({'error': 'Profile already exists with this email.'}), 400

    if not email or not password:
        return jsonify({'error': 'Email and password are required.'}), 400

    # Create a new profile
    new_profile = Profile(
        email=email,
        password=generate_password_hash(password, method='sha256'),
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
    db.session.add(new_profile)
    db.session.commit()
    
    response_body = {
        "result": new_profile.serialize()
    }

    return jsonify(response_body), 201


@api.route('/update-profile', methods=['PUT'])
@jwt_required()
@cross_origin()
def update_profile():
    data = request.json
    current_user_email = get_jwt_identity()

    # Fetch the user account
    profile = Profile.query.filter_by(email=current_user_email).first()
    if not profile:
        return jsonify({'error': 'User not found.'}), 404

    new_email = data.get('new_email')
    new_username = data.get('new_username')
    new_password = data.get('new_password')
    confirm_new_password = data.get('confirm_new_password')
    dog_name = data.get('dog_name')
    owner_name = data.get('owner_name')
    nick_name = data.get('nick_name')
    dog_age = data.get('dog_age')
    location = data.get('location')
    breed = data.get('breed')
    dog_sex = data.get('dog_sex')
    bio = data.get('bio')
    interests = data.get('interests')

    # Check for email update
    if new_email and new_email != current_user_email:
        if not re.match(r'^[^@]+@[^@]+\.[^@]+$', new_email):
            return jsonify({'error': 'Invalid new email address.'}), 400
        existing_user = Profile.query.filter_by(email=new_email).first()
        if existing_user:
            return jsonify({'error': 'New email is already registered.'}), 400
        profile.email = new_email

    # Check for username update
    if new_username:
        if not re.match(r'^[\w.@+-]+$', new_username) or len(new_username) < 3:
            return jsonify({'error': 'Invalid new username. Must be at least 3 characters long and contain only letters, digits, and underscores.'}), 400
        existing_user = Profile.query.filter_by(username=new_username).first()
        if existing_user:
            return jsonify({'error': 'New username is already taken.'}), 400
        profile.username = new_username

    # Check for password update
    if new_password:
        if new_password != confirm_new_password:
            return jsonify({'error': 'New passwords do not match.'}), 400
        profile.password = generate_password_hash(new_password, method='sha256')

    # Update profile fields
    profile.dog_name = dog_name or profile.dog_name
    profile.owner_name = owner_name or profile.owner_name
    profile.nick_name = nick_name or profile.nick_name
    profile.dog_age = dog_age or profile.dog_age
    profile.location = location or profile.location
    profile.breed = breed or profile.breed
    profile.dog_sex = dog_sex or profile.dog_sex
    profile.bio = bio or profile.bio
    profile.interests = interests or profile.interests

    db.session.commit()

    if new_email or new_password:
        access_token = create_access_token(identity=profile.email)
        response = jsonify({'message': 'Profile updated successfully.', 'access_token': access_token})
        set_access_cookies(response, access_token)
        return response

    return jsonify({'message': 'Profile updated successfully.'}), 200


@api.route("/token", methods=["POST"])
@cross_origin()
def create_token():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    Profile = Profile.query.filter_by(email=email).first()
    if Profile and check_password_hash(Profile.password, password):
        access_token = create_access_token(identity=Profile.email)
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
