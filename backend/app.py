from flask import Flask, request, send_from_directory
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from models import Base, User, AdminSettings
from dateutil import parser

app = Flask(__name__, static_folder='dist', static_url_path='/')
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///signup.db'
db = SQLAlchemy(model_class=Base)
db.init_app(app)

# For build purposes only
# Build frontend and send to backend
@app.route('/', methods=['GET'])
def handle_index_page():
    return send_from_directory(app.static_folder, 'index.html')
@app.route('/admin', methods=['GET'])
def handle_admin_page():
    return send_from_directory(app.static_folder, 'index.html')
@app.route('/data', methods=['GET'])
def handle_data_page():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/user', methods=['POST', 'GET'])
def handle_users():

    if request.method == 'GET':
        email = request.args.get('email')
        if email:
            user = db.session.query(User).where(User.email == email).first()
            if not user:
                return {'message': 'user not found'}, 404
            else:
                return user.to_json(), 200
        else:
            users = db.session.query(User).all()
            users = [user.to_json() for user in users]
            return {'users': users}, 200
    else:
        user = User(
            email = request.json['email'],
            password = request.json['password']
        )
        db.session.add(user)
        db.session.commit()
        db.session.refresh(user)
        return user.to_json(), 201
    
@app.route('/api/user/<int:id>', methods=['PUT'])
def handle_user(id):
    user = db.session.query(User).where(User.id == id).first()
    if not user:
        return {'message': 'user not found'}, 404
    data = request.json
    for k in data:
        if hasattr(user, k):
            setattr(user, k, data[k])
        if k == 'birthday' and data[k] != None:
            date = parser.parse(data[k])
            setattr(user, k, date)
        db.session.commit()
        db.session.refresh(user)
    return user.to_json(), 200

@app.route('/api/admin', methods=['GET', 'PUT'])
def handle_admin():
    about = db.session.query(AdminSettings).where(AdminSettings.setting == 'about').first()
    address = db.session.query(AdminSettings).where(AdminSettings.setting == 'address').first()
    birthday = db.session.query(AdminSettings).where(AdminSettings.setting == 'birthday').first()
    code = 200
    if request.method == 'PUT':
        about.page = request.json['about']
        address.page = request.json['address']
        birthday.page = request.json['birthday']
        db.session.commit()
        code = 201
    return {
        'about': about.page, 
        'address': address.page, 
        'birthday': birthday.page
    }, code
        
if __name__ == '__main__':

    app.run(host='0.0.0.0', port=5001)
