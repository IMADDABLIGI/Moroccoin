from app import create_app
import os

app = create_app()

if __name__ == '__main__':
    # Check if we're in production
    if os.environ.get('FLASK_ENV') == 'production':
        # Production mode - let the WSGI server handle this
        app.run(host='0.0.0.0', port=5000, debug=False)
    else:
        # Development mode
        app.run(debug=True, host='0.0.0.0', port=5000)