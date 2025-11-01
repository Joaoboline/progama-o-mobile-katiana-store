from flask import Flask
from models import db
from routes.usuarios import bp_usuarios

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    db.init_app(app)
    app.register_blueprint(bp_usuarios)

    @app.route('/')
    def home():
        return "Backend Katiana Store funcionando!"

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
