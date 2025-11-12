import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("katiana.db");

export async function initDatabase() {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      preco REAL,
      imagem TEXT
    );
  `);
  console.log("Banco criado com sucesso!");
}

export async function addProduto(nome, preco, imagem) {
  await db.runAsync(
    "INSERT INTO produtos (nome, preco, imagem) VALUES (?, ?, ?)",
    [nome, preco, imagem]
  );
}

export async function getProdutos() {
  return await db.getAllAsync("SELECT * FROM produtos");
}

export async function resetDatabase() {
  await db.execAsync("DELETE FROM produtos;");
  console.log("Banco resetado!");
}
