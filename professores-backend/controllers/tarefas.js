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
exports.createAtividade = (req, res) => {
    const { descricao, turma_id } = req.body;

    const sql = 'INSERT INTO atividades (descricao, turma_id) VALUES (?, ?)';
    connection.query(sql, [descricao, turma_id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao criar atividade no banco de dados');
        } else {
            res.status(201).send('Atividade criada com sucesso!');
        }
    });
};

exports.getAtividadesByTurmaId = (req, res) => {
    const turmaId = req.params.turma_id;

    const sql = 'SELECT * FROM atividades WHERE turma_id = ?';
    connection.query(sql, [turmaId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao buscar atividades no banco de dados');
        } else {
            if (result.length === 0) {
                res.status(404).send('Nenhuma atividade encontrada para a turma informada');
            } else {
                res.status(200).json(result);
            }
        }
    });
};