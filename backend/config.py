from datetime import timedelta
import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'troque_por_uma_chave_secreta_em_prod')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI', 'sqlite:///katiana_store.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'troque_jwt_em_prod')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=8)
