from flask import Blueprint, request, jsonify
from models import Produto

bp_produtos = Blueprint('produtos', __name__)

@bp_produtos.route('/produtos', methods=['GET'])
def listar_produtos():
    q = request.args.get('q')
    categoria = request.args.get('categoria')
    query = Produto.query
    if q:
        query = query.filter(Produto.nome.ilike(f"%{q}%"))
    if categoria:
        query = query.filter_by(categoria=categoria)

    produtos = query.all()
    out = []
    for p in produtos:
        out.append({
            'id': p.id,
            'nome': p.nome,
            'descricao': p.descricao,
            'categoria': p.categoria,
            'preco': p.preco,
            'imagem': p.imagem,
            'estoque': p.estoque,
            'avaliacao_media': p.avaliacao_media
        })
    return jsonify(out)
