// userController.js
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const SECRET = process.env.JWT_SECRET || 'dsfkjdfhgsdlfshdgjfsdkjlh'

createToken = (user) => {
    return jwt.sign({ 
        name: user.nome,
        id: user.id,
        email: user.email
    }, SECRET)
}

exports.readToken = (token) => {
    try{
        return jwt.verify(token, SECRET)
    } catch {
        throw new Error('Token Inválido')
    }
}

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: '21548721',
    database: 'mydb'
});

connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        process.exit(1);
    }

    console.log('Conectado ao banco de dados');
});

exports.register = (req, res) => {
    const { name, email, password } = req.body.body;
    // Primeiro, verifique se o usuário já existe
    const checkUserSql = 'SELECT * FROM usuarios WHERE email = ?';
    connection.query(checkUserSql, [email],  (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao buscar usuário no banco de dados');
        } else if (results.length > 0) {
            // Se o usuário já existir, envie uma mensagem de erro
            res.status(400).send('Usuário já existe');
        } else {
            // Se o usuário não existir, prossiga com o registro
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Erro ao criar hash da senha');
                } else {
                    const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
                    connection.query(sql, [name ,email, hash], (err, result) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Erro ao inserir usuário no banco de dados');
                        } else {
                            const token = createToken(req.body.formData)
                            res.status(200).send(token);
                        }
                    });
                }
            });
        }
    });
};


exports.updateUser = (req, res) => {
    const { id, username, password } = req.body;

    bcrypt.hash(password, 10,  (err, hash) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao criar hash da senha');
        } else {
            const sql = 'UPDATE Users SET username = ?, password = ? WHERE id = ?';
            connection.query(sql, [username, hash, id],  (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Erro ao atualizar usuário no banco de dados');
                } else {
                    res.status(200).send('Usuário atualizado com sucesso!');
                }
            });
        }
    });
};



exports.login = (req, res) => {
    const { email, password } = req.body.formData;
    const sql = 'SELECT * FROM usuarios WHERE email = ?';
    connection.query(sql, [email],  (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao buscar email no banco de dados');
        } else if (results.length > 0) {
            bcrypt.compare(password, results[0].senha,  (err, result) => {
                if (result == true) {
                    const data = {
                        id: results[0].id,
                        nome: results[0]['nome'],
                        email: results[0].email,
                    }
                    console.log(data)
                    req.session.user = {
                        id: results[0].id,
                        isAuthenticated: true
                    };
                    
                    const token = createToken(data)
                    res.status(200).send(token);

                } else {
                    res.status(401).send('Senha incorreta');
                }
            });
        } else {
            res.status(404).send('Usuário não encontrado');
        }
    });
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Erro ao encerrar a sessão');
        }

        res.status(200).send('Logout bem-sucedido!');
    });
};

exports.deleteUser = (req, res) => {
    const { id } = req.body;

    const sql = 'DELETE FROM Users WHERE id = ?';
    connection.query(sql, [id],  (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao deletar usuário no banco de dados');
        } else {
            res.status(200).send('Usuário deletado com sucesso!');
        }
    });
};

