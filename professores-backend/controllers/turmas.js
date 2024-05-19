const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: '21548721',
    database: 'mydb'
});

// turmasController.js


// Função para criar uma nova turma
exports.createTurma = (req, res) => {
    const { nome_turma, usuario_id } = req.body;
    const sql = 'INSERT INTO turmas (nome_turma, usuario_id) VALUES (?, ?)';
    connection.query(sql, [nome_turma, usuario_id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao criar turma no banco de dados');
        } else {
            res.status(201).send('Turma criada com sucesso!');
        }
    });
};

// Função para buscar informações de uma turma pelo ID do usuário
exports.getTurmaByUserId = (req, res) => {
    const usuarioId = req.params.usuario_id;
    console.log(req.params.usuario_id)
    const sql = 'SELECT * FROM turmas WHERE usuario_id = ?';
    connection.query(sql, [usuarioId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao buscar turma no banco de dados');
        } else {
            if (result.length === 0) {
                res.status(404).send('Turma não encontrada para o usuário informado');
            } else {
                res.status(200).json(result);
            }
        }
    });
};

exports.updateTurma = (req, res) => {
    const { id, nome_turma, usuario_id } = req.body;

    const sql = 'UPDATE turmas SET nome_turma = ?, usuario_id = ? WHERE id = ?';
    connection.query(sql, [nome_turma, usuario_id, id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao atualizar turma no banco de dados');
        } else {
            res.status(200).send('Turma atualizada com sucesso!');
        }
    });
};

// turmasController.js

// Função para excluir uma turma pelo ID
exports.deleteTurma = (req, res) => {
    const idTurma = req.params.id;

    const sql = 'DELETE FROM turmas WHERE id = ?';
    connection.query(sql, [idTurma], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao excluir turma no banco de dados');
        } else {
            res.status(200).send('Turma excluída com sucesso!');
        }
    });
};
