from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import random
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class UserAccount(db.Model):
    __tablename__ = 'user_account'
    user_id = db.Column(db.Integer, primary_key=True)
    profile_picture = db.Column(db.String(250), nullable=True)
    dog_name = db.Column(db.String(100), nullable=False)
    owner_name = db.Column(db.String(100), nullable=False)
    nick_name = db.Column(db.String(100), nullable=True)
    dog_age = db.Column(db.Integer, nullable=False)
    location = db.Column(db.String(250), nullable=False)
    breed = db.Column(db.String(100), nullable=False)
    dog_sex = db.Column(db.String(50), nullable=False)
    bio = db.Column(db.Text, nullable=True)
    interests = db.Column(db.Text, nullable=True)
    email = db.Column(db.String(250), unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)
    account_created = db.Column(db.Date, default=datetime.utcnow)
    
    profile = db.relationship('Profile', backref='user', uselist=False, lazy=True)
    
    
    def __repr__(self):
        return f'<UserAccount {self.user_id}, {self.dog_name}, {self.owner_name}>'
    def serialize(self):
        return {
            'user_id': self.user_id,
            'profile_picture': self.profile_picture,
            'dog_name': self.dog_name,
            'owner_name': self.owner_name,
            'nick_name': self.nick_name,
            'dog_age': self.dog_age,
            'location': self.location,
            'breed': self.breed,
            'dog_sex': self.dog_sex,
            'bio': self.bio,
            'interests': self.interests,
            'email': self.email,
            'account_created': self.account_created
        }

    def set_password(self, password):
        self.password = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password, password)

class Like(db.Model):
    __tablename__ = 'likes'
    
    like_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user_account.user_id'), nullable=False)
    liked_user_id = db.Column(db.Integer, nullable=False)
    match_likes = db.Column(db.Boolean, nullable=False)
    date = db.Column(db.Date, default=datetime.utcnow)
    
    def __repr__(self):
        return f'<Like {self.like_id}, {self.user_id}, {self.liked_user_id}>'
    
    def serialize(self):
        return {
            'like_id': self.like_id,
            'user_id': self.user_id,
            'liked_user_id': self.liked_user_id,
            'match_likes': self.match_likes,
            'date': self.date
        }

class Message(db.Model):
    __tablename__ = 'messages'
    
    message_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user_account.user_id'), nullable=False)
    receiver_id = db.Column(db.Integer, nullable=False)
    message = db.Column(db.Text, nullable=False)
    message_date = db.Column(db.Date, default=datetime.utcnow)
    
    def __repr__(self):
        return f'<Message {self.message_id}, {self.user_id}, {self.receiver_id}>'
    
    def serialize(self):
        return {
            'message_id': self.message_id,
            'user_id': self.user_id,
            'receiver_id': self.receiver_id,
            'message': self.message,
            'message_date': self.message_date
        }
    

class Contact(db.Model):
    __tablename__ = 'contact'

    contact_id = db.Column(db.Integer, primary_key=True, autoincrement=True)  # Ensure autoincrement is enabled
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20), nullable=True)
    subject = db.Column(db.String(200), nullable=False)
    message = db.Column(db.Text, nullable=False)
    date_submitted = db.Column(db.DateTime, default=datetime.utcnow)
    def __repr__(self):
        return f'<Contact {self.contact_id}, {self.name}, {self.email}>'

    def serialize(self):
        return {
            'contact_id': self.contact_id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'subject': self.subject,
            'message': self.message,
            'date_submitted': self.date_submitted
        }
class Profile(db.Model):
    __tablename__ = 'profile'
    profile_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user_account.user_id'), nullable=False)
    full_name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(250), nullable=False)
    bio = db.Column(db.Text, nullable=True)
    profile_picture = db.Column(db.String(250), nullable=True)
    photos = db.relationship('Photo', backref='profile', lazy=True)  
    account_created = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return f'<Profile {self.profile_id}, {self.full_name}, {self.location}>'
    
    def serialize(self):
        return {
            'profile_id': self.profile_id,
            'user_id': self.user_id,
            'full_name': self.full_name,
            'location': self.location,
            'bio': self.bio,
            'profile_picture': self.profile_picture,
            'photos': [photo.serialize() for photo in self.photos],
            'account_created': self.account_created
        }

class Photo(db.Model):
    __tablename__ = 'photo'
    photo_id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.Integer, db.ForeignKey('profile.profile_id'), nullable=False)
    photo_url = db.Column(db.String(250), nullable=False)
    uploaded_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return f'<Photo {self.photo_id}, {self.photo_url}>'
    
    def serialize(self):
        return {
            'photo_id': self.photo_id,
            'profile_id': self.profile_id,
            'photo_url': self.photo_url,
            'uploaded_at': self.uploaded_at
        }