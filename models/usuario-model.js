module.exports = class Usuario {
  constructor({ id, nome, email, senha }) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
  }
  setSenha(senha) {
    this.senha = senha;
  }
};
