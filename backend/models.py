from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    senha = db.Column(db.String(120), nullable=False)  # senha em texto simples apenas para teste

# -------------------------------
# Produto
# -------------------------------
class Produto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(120), nullable=False)
    descricao = db.Column(db.String(255))
    categoria = db.Column(db.String(100))
    preco = db.Column(db.Float, nullable=False)
    estoque = db.Column(db.Integer, default=0)
    imagem = db.Column(db.String(255))
    avaliacao_media = db.Column(db.Float, default=0)

# -------------------------------
# Pedido
# -------------------------------
class Pedido(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'))
    total = db.Column(db.Float, default=0)
    forma_pagamento = db.Column(db.String(50))
    status = db.Column(db.String(50), default='pendente')

    usuario = db.relationship('Usuario', backref='pedidos')
    itens = db.relationship('PedidoItem', backref='pedido', cascade='all, delete-orphan')

# -------------------------------
# PedidoItem
# -------------------------------
class PedidoItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    pedido_id = db.Column(db.Integer, db.ForeignKey('pedido.id'))
    produto_id = db.Column(db.Integer, db.ForeignKey('produto.id'))
    quantidade = db.Column(db.Integer, nullable=False)
    preco_unitario = db.Column(db.Float, nullable=False)

    produto = db.relationship('Produto')

# -------------------------------
# Avaliação
# -------------------------------
class Avaliacao(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    produto_id = db.Column(db.Integer, db.ForeignKey('produto.id'))
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'))
    nota = db.Column(db.Integer, nullable=False)
    comentario = db.Column(db.String(255))

    produto = db.relationship('Produto', backref='avaliacoes')
    usuario = db.relationship('Usuario')
