from kivy.app import App
from kivy.lang import Builder
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.label import Label
from kivy.uix.scrollview import ScrollView
from kivy.uix.gridlayout import GridLayout
from kivy.uix.textinput import TextInput
from kivy.uix.button import Button
from kivy.uix.image import AsyncImage

from api_cliente import APIClient

API_URL = "http://127.0.0.1:5000/api"

KV = """
<ProdutoCard>:
    orientation: 'horizontal'
    size_hint_y: None
    height: '120dp'
    padding: 8
    spacing: 8
    canvas.before:
        Color:
            rgba: 0.95, 0.95, 0.95, 1
        Rectangle:
            pos: self.pos
            size: self.size
"""

class ProdutoCard(BoxLayout):
    def __init__(self, produto, **kwargs):
        super().__init__(**kwargs)
        img_src = produto.get('imagem', '')
        if img_src:
            self.add_widget(AsyncImage(source=img_src, size_hint_x=None, width=120))
        else:
            self.add_widget(Label(text="Sem imagem", size_hint_x=None, width=120))

        info = BoxLayout(orientation='vertical')
        info.add_widget(Label(text=produto.get('nome', 'Produto'), bold=True))
        info.add_widget(Label(text=f"Preço: R${produto.get('preco', 0):.2f}"))
        info.add_widget(Label(text=f"Estoque: {produto.get('estoque', 0)}"))
        self.add_widget(info)


class LoginScreen(BoxLayout):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.orientation = 'vertical'
        self.api = APIClient(API_URL)

        self.add_widget(Label(text="Email"))
        self.email_input = TextInput(multiline=False)
        self.add_widget(self.email_input)

        self.add_widget(Label(text="Senha"))
        self.senha_input = TextInput(multiline=False, password=True)
        self.add_widget(self.senha_input)

        self.status_label = Label(text="")
        self.add_widget(self.status_label)

        btn_login = Button(text="Login")
        btn_login.bind(on_press=self.login)
        self.add_widget(btn_login)

    def login(self, instance):
        email = self.email_input.text
        senha = self.senha_input.text
        res, status = self.api.login(email, senha)
        if status == 200:
            self.status_label.text = "✅ Login realizado!"
            # Troca a tela para mostrar produtos
            self.clear_widgets()
            self.add_widget(Label(text=f"Bem-vindo, {res.get('nome', 'Usuário')}!"))
            self.add_widget(ProdutoScreen(self.api))
        else:
            self.status_label.text = f"❌ Erro: {res.get('message', 'Desconhecido')}"


class ProdutoScreen(BoxLayout):
    def __init__(self, api_client, **kwargs):
        super().__init__(**kwargs)
        self.api = api_client
        self.orientation = 'vertical'

        self.add_widget(Label(text="Katiana Store", size_hint_y=None, height=40, font_size=20))

        scroll = ScrollView()
        self.grid = GridLayout(cols=1, spacing=10, size_hint_y=None)
        self.grid.bind(minimum_height=self.grid.setter('height'))
        scroll.add_widget(self.grid)
        self.add_widget(scroll)

        self.carregar_produtos()

    def carregar_produtos(self):
        try:
            produtos, status = self.api.listar_produtos()
            if status == 200:
                if not produtos:
                    self.grid.add_widget(Label(text="Nenhum produto encontrado"))
                for p in produtos:
                    card = ProdutoCard(p)
                    self.grid.add_widget(card)
            else:
                self.grid.add_widget(Label(text="Erro ao carregar produtos"))
        except Exception as e:
            self.grid.add_widget(Label(text=f"Erro de conexão: {e}"))


class KatianaApp(App):
    def build(self):
        Builder.load_string(KV)
        return LoginScreen()


if __name__ == '__main__':
    KatianaApp().run()
