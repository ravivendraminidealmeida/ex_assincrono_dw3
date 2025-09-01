const db = require('../config/db');

exports.getAllSalasDeAula = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM salasdeaula WHERE removido = FALSE ORDER BY salasdeaulaid ASC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro no servidor.' });
    }
};

exports.getSalaDeAulaById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await db.query('SELECT * FROM salasdeaula WHERE salasdeaulaid = $1 AND removido = FALSE', [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Sala de aula não encontrada.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro no servidor.' });
    }
};

exports.insertSalaDeAula = async (req, res) => {
    const { descricao, localizacao, capacidade } = req.body;
    if (!descricao || !localizacao || capacidade === undefined) {
        return res.status(400).json({ message: 'Dados incompletos.' });
    }
    try {
        const result = await db.query(
            'INSERT INTO salasdeaula (descricao, localizacao, capacidade) VALUES ($1, $2, $3) RETURNING *',
            [descricao, localizacao, capacidade]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro no servidor.' });
    }
};

exports.updateSalaDeAula = async (req, res) => {
    const id = parseInt(req.params.id);
    const { descricao, localizacao, capacidade } = req.body;
    try {
        const result = await db.query(
            'UPDATE salasdeaula SET descricao = $1, localizacao = $2, capacidade = $3 WHERE salasdeaulaid = $4 AND removido = FALSE RETURNING *',
            [descricao, localizacao, capacidade, id]
        );
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Sala de aula não encontrada.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro no servidor.' });
    }
};

exports.deleteSalaDeAula = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await db.query(
            'UPDATE salasdeaula SET removido = TRUE WHERE salasdeaulaid = $1 RETURNING *',
            [id]
        );
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Sala de aula removida com sucesso (soft delete).' });
        } else {
            res.status(404).json({ message: 'Sala de aula não encontrada.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro no servidor.' });
    }
};
