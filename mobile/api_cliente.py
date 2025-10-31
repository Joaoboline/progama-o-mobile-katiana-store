class APIClient:
    def __init__(self, base_url):
        self.base_url = base_url.rstrip('/')
        self.token = None

    def set_token(self, token):
        self.token = token

    def headers(self):
        h = {'Content-Type':'application/json'}
        if self.token:
            h['Authorization'] = f'Bearer {self.token}'
        return h

    def register(self, nome, email, senha):
        payload = {'nome': nome, 'email': email, 'senha': senha}
        r = requests.post(f'{self.base_url}/api/register', json=payload, headers=self.headers())
        return r.json(), r.status_code

    def login(self, email, senha):
        payload = {'email': email, 'senha': senha}
        r = requests.post(f'{self.base_url}/api/login', json=payload, headers=self.headers())
        if r.status_code == 200:
            data = r.json()
            self.set_token(data.get('token'))
        return r.json(), r.status_code

    def listar_produtos(self, q=None, categoria=None):
        params = {}
        if q: params['q'] = q
        if categoria: params['categoria'] = categoria
        r = requests.get(f'{self.base_url}/api/produtos', params=params, headers=self.headers())
        return r.json(), r.status_code

    def criar_pedido(self, itens, forma_pagamento='pix'):
        payload = {'itens': itens, 'forma_pagamento': forma_pagamento}
        r = requests.post(f'{self.base_url}/api/pedido', json=payload, headers=self.headers())
        return r.json(), r.status_code
