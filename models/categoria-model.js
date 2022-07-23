module.exports = class Categoria {
  constructor({ id, descricao }) {
    this.id = id;
    this.descricao = descricao;
  }
  set(id) {
    this.id = id;
  }
};
