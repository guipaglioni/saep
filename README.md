Para o projeto funcionar de um git clone no repositorio

para iniciar o frontend-professores basta entrar na pasta professores e rodar os comandos

npm install

npm run dev

para iniciar o projeto da api basta entrar na pastar professores-backend e rodar os comandos

npm install

npm start

para iniciar seu banco sincronize o modelo de dados disponivel como schema_professores

insira alguns dados 

insert into usuarios(nome, email, senha) values ('kaka', 'kaka@gmail.com', 'sucodemaracuja');
insert into turmas(nome_turma, usuario_id) values ('idev1', 1);
insert into atividades(descricao, turma_id) values ('Lista de exercicios python', 1);
insert into atividades(descricao, turma_id) values ('Lista de exercicios php', 1);
insert into atividades(descricao, turma_id) values ('Lista de exercicios ruby', 1);
insert into atividades(descricao, turma_id) values ('Lista de exercicios javascript', 1);

altere as configurações da api para conectar o banco de dados, em cada controler do professores-backend tem um bloco de codigo de conexão como o do exemplo abaixo 

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: '21548721',
    database: 'mydb'
});

altere para as configurações de seu banco
