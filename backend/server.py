from flask import Flask, request, jsonify, session
from werkzeug.security import check_password_hash, generate_password_hash
import sqlite3
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.secret_key = 'your-secret-key-change-this'  # Change this to a random secret key

# Database connection
def get_db_connection():
    conn = sqlite3.connect(os.getenv('CONNECTION_STRING', 'database.db'))
    conn.row_factory = sqlite3.Row
    return conn

# Initialize database (create users table if it doesn't exist)
def init_db():
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL
        )
    ''')
    
    # Create a demo user (username: demo, password: demo123)
    try:
        conn.execute('''
            INSERT INTO users (username, password_hash, email) 
            VALUES (?, ?, ?)
        ''', ('demo', generate_password_hash('demo123'), 'demo@example.com'))
        conn.commit()
    except sqlite3.IntegrityError:
        pass  # User already exists
    
    conn.close()

@app.route('/')
def hello():
    if 'user_id' in session:
        return f"Hello, {session['username']}! You are logged in."
    return "Hello! Please sign in to access protected content."

@app.route('/signin', methods=['POST'])
def signin():
    data = request.get_json()
    
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({'error': 'Username and password required'}), 400
    
    username = data['username']
    password = data['password']
    
    conn = get_db_connection()
    user = conn.execute(
        'SELECT * FROM users WHERE username = ?', (username,)
    ).fetchone()
    conn.close()
    
    if user and check_password_hash(user['password_hash'], password):
        session['user_id'] = user['id']
        session['username'] = user['username']
        return jsonify({
            'message': 'Sign in successful',
            'user': {
                'id': user['id'],
                'username': user['username'],
                'email': user['email']
            }
        })
    else:
        return jsonify({'error': 'Invalid username or password'}), 401

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    
    if not data or not data.get('username') or not data.get('password') or not data.get('email'):
        return jsonify({'error': 'Username, password, and email required'}), 400
    
    username = data['username']
    password = data['password']
    email = data['email']
    
    conn = get_db_connection()
    
    # Check if user already exists
    existing_user = conn.execute(
        'SELECT * FROM users WHERE username = ? OR email = ?', (username, email)
    ).fetchone()
    
    if existing_user:
        conn.close()
        return jsonify({'error': 'Username or email already exists'}), 400
    
    # Create new user
    try:
        conn.execute('''
            INSERT INTO users (username, password_hash, email) 
            VALUES (?, ?, ?)
        ''', (username, generate_password_hash(password), email))
        conn.commit()
        conn.close()
        
        return jsonify({'message': 'User created successfully'}), 201
    except Exception as e:
        conn.close()
        return jsonify({'error': 'Failed to create user'}), 500

@app.route('/signout', methods=['POST'])
def signout():
    session.clear()
    return jsonify({'message': 'Signed out successfully'})

@app.route('/profile')
def profile():
    if 'user_id' not in session:
        return jsonify({'error': 'Not authenticated'}), 401
    
    conn = get_db_connection()
    user = conn.execute(
        'SELECT id, username, email FROM users WHERE id = ?', (session['user_id'],)
    ).fetchone()
    conn.close()
    
    if user:
        return jsonify({
            'user': {
                'id': user['id'],
                'username': user['username'],
                'email': user['email']
            }
        })
    else:
        return jsonify({'error': 'User not found'}), 404

@app.route('/protected')
def protected():
    if 'user_id' not in session:
        return jsonify({'error': 'Authentication required'}), 401
    
    return jsonify({'message': f'Hello {session["username"]}, this is protected content!'})

if __name__ == '__main__':
    init_db()
    app.run(debug=True)