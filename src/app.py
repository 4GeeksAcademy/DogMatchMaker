import os
from datetime import datetime
from datetime import timedelta
from datetime import timezone
from flask import Flask, request, jsonify, send_from_directory, render_template,redirect, url_for
from flask_migrate import Migrate
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager
from flask_cors import CORS

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# Configurations
app.config["JWT_SECRET_KEY"] = "asdasdask1458asda5654asd654asd651asd61sdf6as1d6"
app.config["JWT_COOKIE_SECURE"] = False
app.config["JWT_TOKEN_LOCATION"] = ["headers"]
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=10)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Database URL
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

# CORS Configuration
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins for development

jwt = JWTManager(app)
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# Add the admin
setup_admin(app)
setup_commands(app)

# Add all endpoints from the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Serve static files
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # Avoid cache memory
    return response

# Serve uploaded profile pictures
@app.route('/uploads/<filename>')
def serve_uploads(filename):
    return send_from_directory('uploads', filename)












# This only runs if `$ python app.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)



