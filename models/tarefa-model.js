module.exports = class Tarefa {
  constructor({ id, descricao, data, concluida, titulo, usuarioId }) {
    this.id = id;
    this.descricao = descricao;
    this.data = new Date(data);
    this.concluida = false;
    this.titulo = titulo;
    this.usuarioId = usuarioId;
    this.concluida = concluida;
  }
};
