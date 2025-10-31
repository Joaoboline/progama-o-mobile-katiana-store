from main import create_app
from models import db, Usuario

app = create_app()

with app.app_context():

    db.drop_all()
    db.create_all()


    if not Usuario.query.filter_by(email="teste@x.com").first():
        usuario = Usuario(nome="Usuário Teste", email="teste@x.com", senha="1234")
        db.session.add(usuario)
        db.session.commit()
        print("Usuário de teste criado!")

    print("Banco de dados criado!")
