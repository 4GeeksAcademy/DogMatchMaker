from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class SignUp(db.Model):
    __tablename__ = 'sign_up'

    user_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(250), unique=True, nullable=False)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)
    account_created = db.Column(db.DateTime, default=datetime.utcnow)

    profiles = db.relationship('Profile', backref='sign_up', uselist=False)  # One-to-one relationship with Profile

    def __repr__(self):
        return f'<SignUp {self.user_id}, {self.email}>'
    
    def serialize(self):
        return {
            'user_id': self.user_id,
            'email': self.email,
            'account_created': self.account_created
        }


class Profile(db.Model):
    __tablename__ = 'profile'

    user_id = db.Column(db.Integer, db.ForeignKey('sign_up.user_id'), primary_key=True)
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

    def __repr__(self):
        return f'<Profile {self.user_id}, {self.dog_name}, {self.owner_name}>'
    
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
            'interests': self.interests
        }

class Like(db.Model):
    __tablename__ = 'likes'

    like_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('profile.user_id'), nullable=False)
    liked_user_id = db.Column(db.Integer, nullable=False)
    match_likes = db.Column(db.Boolean, nullable=False)
    date = db.Column(db.Date, default=datetime.utcnow)

    user = db.relationship('Profile', foreign_keys=[user_id])

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
    user_id = db.Column(db.Integer, db.ForeignKey('profile.user_id'), nullable=False)
    receiver_id = db.Column(db.Integer, nullable=False)
    message = db.Column(db.Text, nullable=False)
    message_date = db.Column(db.Date, default=datetime.utcnow)

    user = db.relationship('Profile', foreign_keys=[user_id])

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

    contact_id = db.Column(db.Integer, primary_key=True, autoincrement=True)  
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