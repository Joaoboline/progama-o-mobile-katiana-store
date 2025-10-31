from flask import Blueprint, request, jsonify
from models import Usuario, db
from utils.auth import gerar_token, token_required

bp_usuarios = Blueprint('usuarios', __name__)


@bp_usuarios.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    senha = data.get('senha')

    usuario = Usuario.query.filter_by(email=email).first()
    if not usuario or usuario.senha != senha:
        return jsonify({'message': 'Email ou senha incorretos!'}), 401

    token = gerar_token(usuario)
    return jsonify({'token': token})

@bp_usuarios.route('/api/me', methods=['GET'])
@token_required
def me(usuario):
    return jsonify({
        'id': usuario.id,
        'email': usuario.email,
        'nome': usuario.nome
    })
