"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, Blueprint, url_for, redirect, render_template
import logging
from api.models import db, UserAccount, Contact
from api.utils import generate_sitemap, APIException
from flask_cors import CORS, cross_origin
import json
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, set_access_cookies, unset_jwt_cookies
import requests
from werkzeug.utils import secure_filename
import os
import re

logging.basicConfig(level=logging.DEBUG)

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api, supports_credentials=True)

# Define the path where profile pictures will be stored
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

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
