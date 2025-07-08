from flask import Blueprint, request, jsonify

communication_bp = Blueprint('communication', __name__)

@communication_bp.route('/email', methods=['POST'])
def send_email():
    try:
        data = request.get_json()
        recipient = data.get('recipient')
        subject = data.get('subject')
        message = data.get('message')
        
        # In a real app, you would integrate with an email service like SendGrid, AWS SES, etc.
        # For demo purposes, we'll just log the email
        print(f"Email sent to {recipient}")
        print(f"Subject: {subject}")
        print(f"Message: {message}")
        
        return jsonify({'message': 'Email sent successfully'})
    
    except Exception as e:
        return jsonify({'message': 'Failed to send email', 'error': str(e)}), 500

@communication_bp.route('/sms', methods=['POST'])
def send_sms():
    try:
        data = request.get_json()
        recipient = data.get('recipient')
        message = data.get('message')
        
        # In a real app, you would integrate with an SMS service like Twilio, AWS SNS, etc.
        # For demo purposes, we'll just log the SMS
        print(f"SMS sent to {recipient}")
        print(f"Message: {message}")
        
        return jsonify({'message': 'SMS sent successfully'})
    
    except Exception as e:
        return jsonify({'message': 'Failed to send SMS', 'error': str(e)}), 500
