const express = require('express');
const userController = require('./controllers/usuario');
const turmaControlle = require('./controllers/turmas');
const tarefaConteoller = require('./controllers/tarefas');
const authMiddleware = require('./middleware/authMiddleware');
const cors = require('cors');
const session = require('express-session');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());
app.set('view engine', 'pug');

app.use(session({
    secret: 'seu segredo aqui',
    resave: false,
    saveUninitialized: true
  }));

app.post('/register', userController.register);
app.put('/updateUser', authMiddleware, userController.updateUser);
app.post('/login', userController.login);
app.delete('/deleteUser', authMiddleware,userController.deleteUser);
app.get('/logout', userController.logout);
app.post('/registerTurma', turmaControlle.createTurma );
app.delete('/deleteTurma/:id',turmaControlle.deleteTurma );
app.get(`/getTurmas/:usuario_id`, turmaControlle.getTurmaByUserId);
app.post('/createAtividade', tarefaConteoller.createAtividade);
app.get('/getAtividades/:turma_id', tarefaConteoller.getAtividadesByTurmaId);

app.listen(PORT, console.log('Server is running on port: ' + PORT));