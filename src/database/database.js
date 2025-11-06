import * as SQLite from "expo-sqlite";

let db;

export const getDB = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync("katiana.db");
  }
  return db;
};

// Cria a tabela de produtos, se não existir
export const initDatabase = async () => {
  const database = await getDB();
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      preco REAL NOT NULL,
      imagem TEXT
    );
  `);
  console.log("✅ Banco de dados criado e tabela pronta!");
};

// Insere um produto
export const addProduto = async (nome, preco, imagem) => {
  const database = await getDB();
  await database.runAsync(
    "INSERT INTO produtos (nome, preco, imagem) VALUES (?, ?, ?)",
    [nome, preco, imagem]
  );
};

// Busca todos os produtos
export const getProdutos = async () => {
  const database = await getDB();
  const results = await database.getAllAsync("SELECT * FROM produtos");
  return results;
};
