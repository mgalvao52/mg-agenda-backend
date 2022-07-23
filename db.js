const connection = require("./dbConfig");

const tableUsuario = () => {
  const sql = `create table if not exists usuario(
        id int not null auto_increment primary key,
        nome varchar(150) not null,
        email varchar(250) not null unique,
        senha longtext not null
        );`;

  connection.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log("tabela usuario");
  });
};

const tableCategoria = () => {
  const sql = `create table if not exists categoria(
        id int not null auto_increment primary key,
        descricao varchar(20) not null unique
        );`;

  connection.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log("tabela categoria");
  });
};

const tableTarefa = () => {
  const sql = `create table if not exists tarefa(
        id int not null auto_increment primary key,
        descricao varchar(250) not null,
        data datetime not null,
        concluida tinyint(1) not null default false,
        titulo varchar(30) not null,
        usuarioId int not null,
        constraint fk_usuario foreign key (usuarioId) references usuario(id)

        );`;

  connection.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log("tabela tarefa");
  });
};

module.exports = {
  createTables: () => {
    tableUsuario();
    tableCategoria();
    tableTarefa();
  },
};
