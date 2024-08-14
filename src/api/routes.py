from flask import Blueprint, request, jsonify
from api.models import db, UserAccount
from api.utils import APIException
from flask_cors import cross_origin
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
import os

api = Blueprint('api', __name__)

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

    userAccount = UserAccount.query.filter_by(email=email, password=password).first()

    if userAccount is None:
        return jsonify({"msg": "Bad email or password"}), 401
    
    access_token = create_access_token(identity=userAccount.email)
    return jsonify({ "access_token": access_token })

@api.route('/private', methods=['GET'])
@jwt_required()
@cross_origin()
def private_hello():
    userAccount = get_jwt_identity() 

    response_body = {
        "section": "Private",
        "message": "Hello " + str(userAccount)
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
