from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import random

db = SQLAlchemy()

class UserAccount(db.Model):
    __tablename__ = 'user_account'
    
    user_id = db.Column(db.Integer, primary_key=True)
    profile_picture = db.Column(db.String(250), nullable=True)
    dog_name = db.Column(db.String(100), nullable=False)
    owner_name = db.Column(db.String(100), nullable=False)
    dog_age = db.Column(db.Integer, nullable=False)
    location = db.Column(db.String(250), nullable=False)
    breed = db.Column(db.String(100), nullable=False)
    traits = db.Column(db.String(250), nullable=False)
    dog_sex = db.Column(db.String(50), nullable=False)
    bio = db.Column(db.Text, nullable=True)
    email = db.Column(db.String(250), unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)
    account_created = db.Column(db.Date, default=datetime.utcnow)
    
    def __repr__(self):
        return f'<UserAccount {self.user_id}, {self.dog_name}, {self.owner_name}>'
    
    def serialize(self):
        return {
            'user_id': self.user_id,
            'profile_picture': self.profile_picture,
            'dog_name': self.dog_name,
            'owner_name': self.owner_name,
            'dog_age': self.dog_age,
            'location': self.location,
            'breed': self.breed,
            'dog_sex': self.dog_sex,
            'traits': self.traits,
            'bio': self.bio,
            'email': self.email,
            'account_created': self.account_created
        }

class Like(db.Model):
    __tablename__ = 'likes'
    
    like_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user_account.user_id'), nullable=False)
    liked_user_id = db.Column(db.Integer, nullable=False)
    match_likes = db.Column(db.Boolean, nullable=False)
    chat_id = db.Column(db.Integer, nullable=True)
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

