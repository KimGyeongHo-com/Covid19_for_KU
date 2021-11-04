from flask import Flask, jsonify, request
from flask_cors import CORS
import functools

import config
import utils

import sys

from database import Database
from generate_data import generate_data

app = Flask(__name__)
app.config['SECRET_KEY'] = utils.generate_secret_key()
CORS(app)

db = Database()

def normal_func(required):
    def wrapper(func):
        @functools.wraps(func)
        def inner(*args, **kwargs):
            try:
                utils.check_dict(request.json, required)
                return jsonify({'success': True, **func(*args, **kwargs)})
            except Exception as e:
                print(e, file=sys.stderr)
                return jsonify({'success': False, 'message': str(e)})
        return inner
    return wrapper

def normal_func_email(required):
    def wrapper(func):
        @functools.wraps(func)
        def inner(*args, **kwargs):
            try:
                utils.check_dict(request.json, required)
                email = utils.get_email_from_token(request.json['token'], app.config["SECRET_KEY"])
                return jsonify({'success': True, **func(email, *args, **kwargs)})
            except Exception as e:
                print(e, file=sys.stderr)
                return jsonify({'success': False, 'message': str(e)})
        return inner
    return wrapper

@app.route('/', methods=['GET'])
def home():
    return jsonify({'success': True})

@app.route('/register', methods=['POST'])
@normal_func(required=('email', 'password'))
def register():
    db.register(**request.json)
    token = utils.create_token(request.json['email'], app.config["SECRET_KEY"])
    return {'message': f"Successfully registered new user with email '{request.json['email']}'", 'token': token.decode('UTF-8')}

@app.route('/login', methods=['POST'])
@normal_func(required=('email', 'password'))
def login():
    db.login(**request.json)
    token = utils.create_token(request.json['email'], app.config["SECRET_KEY"])
    return {'message': f"Successfully logged in with email '{request.json['email']}'", 'token': token.decode('UTF-8')}

@app.route('/get_user_schedule', methods=['POST'])
@normal_func_email(required=('token',))
def get_user_schedule(email):
    user_schedule = db.get_user_schedule(email)
    return {'message': "Successfully got users schedule", 'user_schedule': user_schedule}

@app.route('/add_facility', methods=['POST'])
@normal_func_email(required=('token', 'name', 'description', 'open_times', 'image', 'bookable'))
def add_facility(email):
    db.add_facility(email, **request.json)
    return {'message': "Successfully added facility"}

@app.route('/get_facilities', methods=['POST'])
@normal_func_email(required=('token',))
def get_facilities(email):
    facilities = db.get_facilities()
    return {'message': "Successfully got facilities", 'facilities': facilities}

@app.route('/get_facility_info', methods=['POST'])
@normal_func_email(required=('token', 'name'))
def get_facility_info(email):
    facility = db.get_facility_info(request.json['name'])
    return {'message': "Successfully retrieved facility info", 'facility': facility}

@app.route('/book_facility', methods=['POST'])
@normal_func_email(required= ('token', 'name', '_from', 'to'))
def book_facility(email):
    db.book_facility(email, **request.json)
    return {'message': f"Successfully booked facility ({request.json['name']}) from {request.json['_from']} to {request.json['to']}"}

@app.route('/set_facility_status', methods=['POST'])
@normal_func_email(required=('token', 'closed', 'name'))
def set_facility_status(email):
    db.set_facility_status(email, request.json['name'], request.json['closed'])
    return {'message': f"Successfully changed facility status"}

@app.route('/add_news', methods=['POST'])
@normal_func_email(required=('token', 'title', 'description'))
def add_news(email):
    db.add_news(email, **request.json)
    return {'message': "Successfully added the news"}

@app.route('/del_news', methods=['POST'])
@normal_func_email(required=('token', 'title'))
def del_news(email):
    db.del_news(email, request.json['title'])
    return {'message': f"Successfully deleted the news with '{request.json['title']}' as title"}

@app.route('/get_news', methods=['POST'])
@normal_func_email(required= ('token',))
def get_news(email):
    news = db.get_news()
    return {'message': "Successfully got the news", 'news': news}

if __name__ == "__main__":
    generate_data()
    app.run(host=config.FLASK_HOST,
            port=config.FLASK_PORT,
            debug=config.FLASK_DEBUG,
            threaded=config.FLASK_THREADED
    )
