const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Função para criar a tabela se ela não existir
const createTable = async () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS salasdeaula (
      salasdeaulaid SERIAL PRIMARY KEY,
      descricao VARCHAR(255) NOT NULL,
      localizacao VARCHAR(255) NOT NULL,
      capacidade INTEGER NOT NULL,
      removido BOOLEAN DEFAULT FALSE
    );
  `;
    try {
        const res = await pool.query(queryText);
        console.log('Tabela "salasdeaula" verificada/criada com sucesso.');
    } catch (err) {
        console.error('Erro ao criar a tabela:', err.stack);
    }
};

module.exports = {
    query: (text, params) => pool.query(text, params),
    createTable,
};