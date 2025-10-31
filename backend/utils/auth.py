from functools import wraps
from flask import request, jsonify, current_app
import jwt
from models import Usuario

def gerar_token(usuario):
    import datetime
    payload = {
        'id': usuario.id,
        'email': usuario.email,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }
    token = jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')
    return token

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]

        if not token:
            return jsonify({'message': 'Token não fornecido!'}), 401

        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
            usuario = Usuario.query.get(data['id'])
            if not usuario:
                raise Exception("Usuário não encontrado")
        except Exception as e:
            return jsonify({'message': 'Token inválido ou expirado!', 'error': str(e)}), 401

        return f(usuario, *args, **kwargs)

    return decorated
