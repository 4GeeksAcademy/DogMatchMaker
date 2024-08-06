from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
        

class UserAccount(db.Model):
    __tablename__ = 'user_account'
    
    user_id = db.Column(db.Integer, primary_key=True)
    dog_name = db.Column(db.String, nullable=False)
    owner_name = db.Column(db.String, nullable=False)
    nick_name = db.Column(db.String, nullable=True)
    dog_age = db.Column(db.Integer, nullable=False)
    location = db.Column(db.String, nullable=False)
    breed = db.Column(db.String, nullable=False)
    dog_sex = db.Column(db.String, nullable=False)
    bio = db.Column(db.String, nullable=True)
    interests = db.Column(db.String, nullable=True)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    account_created = db.Column(db.Date, default=datetime.utcnow)
    
    def __repr__(self):
        return f'<UserAccount {self.user_id}, {self.dog_name}, {self.owner_name}>'
    
    def serialize(self):
        return {
            'user_id': self.user_id,
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
