import requests
from kivy.app import App
from kivy.lang import Builder
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.label import Label
from kivy.uix.image import AsyncImage
from kivy.uix.scrollview import ScrollView
from kivy.uix.gridlayout import GridLayout

# -------------------------------
# TROQUE pelo IP do seu backend Flask
API_URL = "http://172.20.10.2:5000/api/produtos"

# Estilo simples para os cartões
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
        # Imagem opcional
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


class MainScreen(BoxLayout):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.orientation = 'vertical'

        # Título
        self.add_widget(Label(text="Katiana Store", size_hint_y=None, height=40, font_size=20))

        # Scroll de produtos
        scroll = ScrollView()
        self.grid = GridLayout(cols=1, spacing=10, size_hint_y=None)
        self.grid.bind(minimum_height=self.grid.setter('height'))
        scroll.add_widget(self.grid)
        self.add_widget(scroll)

        self.carregar_produtos()

    def carregar_produtos(self):
        try:
            r = requests.get(API_URL)
            if r.status_code == 200:
                produtos = r.json()
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
        return MainScreen()


if __name__ == '__main__':
    KatianaApp().run()
