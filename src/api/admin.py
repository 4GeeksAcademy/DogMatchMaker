import os
from flask_admin import Admin
from .models import db, UserAccount,Contact
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    # Add your models here
    admin.add_view(ModelView(UserAccount, db.session))
    admin.add_view(ModelView(Contact, db.session))
    

    # You can add other models in a similar way
    # admin.add_view(ModelView(YourModelName, db.session))
