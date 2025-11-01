import requests

# URL base do seu backend
BASE_URL = "http://127.0.0.1:5000/api"

# Dados do usuário que você já criou manualmente
login_data = {
    "email": "teste@x.com",
    "senha": "1234"
}

# 1️⃣ Login para receber token JWT
res = requests.post(f"{BASE_URL}/login", json=login_data)
if res.status_code == 200:
    token = res.json().get("token")
    print("✅ Login realizado!")
    print("Token recebido:", token)

    # 2️⃣ Testar rota protegida /api/me
    headers = {"Authorization": f"Bearer {token}"}
    res_me = requests.get(f"{BASE_URL}/me", headers=headers)
    if res_me.status_code == 200:
        print("Dados do usuário logado:", res_me.json())
    else:
        print("❌ Erro ao acessar /api/me:", res_me.status_code, res_me.text)
else:
    print("❌ Erro no login:", res.status_code, res.text)
