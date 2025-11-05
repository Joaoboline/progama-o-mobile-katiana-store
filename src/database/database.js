import * as SQLite from 'expo-sqlite';

// Abre (ou cria) o banco de dados
const db = SQLite.openDatabaseSync('katiana.db');

// Função para inicializar o banco
export const initDatabase = async () => {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        preco REAL NOT NULL,
        imagem TEXT
      );
    `);
    console.log("✅ Banco de dados inicializado com sucesso!");
    return true;
  } catch (error) {
    console.error("❌ Erro ao inicializar banco:", error);
    return false;
  }
};

export default db;
