from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Produto, Pedido, PedidoItem

bp_pedidos = Blueprint('pedidos', __name__)

@bp_pedidos.route('/pedido', methods=['POST'])
@jwt_required()
def criar_pedido():
    identity = get_jwt_identity()
    data = request.json
    itens = data.get('itens', [])
    if not itens:
        return jsonify({'error': 'carrinho vazio'}), 400

    total = 0
    pedido = Pedido(usuario_id=identity['id'], total=0, forma_pagamento=data.get('forma_pagamento', 'indefinido'))
    db.session.add(pedido)
    db.session.flush()

    for it in itens:
        produto = Produto.query.get(it['produto_id'])
        if not produto:
            db.session.rollback()
            return jsonify({'error': f"produto {it['produto_id']} não encontrado"}), 400
        if produto.estoque < it['quantidade']:
            db.session.rollback()
            return jsonify({'error': f"estoque insuficiente para {produto.nome}"}), 400

        item = PedidoItem(pedido_id=pedido.id, produto_id=produto.id,
                          quantidade=it['quantidade'], preco_unitario=produto.preco)
        produto.estoque -= it['quantidade']
        total += produto.preco * it['quantidade']
        db.session.add(item)

    pedido.total = total
    db.session.commit()
    return jsonify({'pedido_id': pedido.id, 'total': total}), 201
