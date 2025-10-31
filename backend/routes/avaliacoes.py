from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Produto, Avaliacao

bp_avaliacoes = Blueprint('avaliacoes', __name__)

@bp_avaliacoes.route('/produto/<int:produto_id>/avaliar', methods=['POST'])
@jwt_required()
def avaliar_produto(produto_id):
    data = request.json
    nota = int(data.get('nota', 0))
    comentario = data.get('comentario', '')
    identity = get_jwt_identity()

    aval = Avaliacao(produto_id=produto_id, usuario_id=identity['id'], nota=nota, comentario=comentario)
    db.session.add(aval)
    db.session.commit()

    avals = Avaliacao.query.filter_by(produto_id=produto_id).all()
    if avals:
        media = sum(a.nota for a in avals) / len(avals)
        p = Produto.query.get(produto_id)
        p.avaliacao_media = media
        db.session.commit()

    return jsonify({'status': 'ok'})
