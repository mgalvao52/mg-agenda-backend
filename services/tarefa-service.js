const {
  validateNull,
  validateMinMaxLength,
} = require("../validations/validate");
const ValidationError = require("../validations/ValidationError");
const service = require("./service");

module.exports = class tarefaService {
  static async insert(tarefa) {
    try {
      this.validateTarefa(tarefa);
      const result = await service.query("insert into tarefa set ?", tarefa);
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async update(tarefa) {
    try {
      this.validateTarefa(tarefa);
      const tarefaDB = await this.getById(tarefa.id);
      if (tarefaDB.length <= 0) {
        throw new ValidationError({ message: "tarefa não encontrada" });
      }
      if (tarefaDB[0].concluida) {
        throw new ValidationError({
          message: "tarefa concluida não pode ser alterada",
        });
      }
      const result = await service.query(
        "update tarefa set descricao = ?,titulo = ?, data = ?, concluida = ?",
        [tarefa.descricao, tarefa.titulo, tarefa.data, tarefa.concluida]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async delete(id) {
    try {
      const result = await service.query("delete from tarefa where id = ?", [
        id,
      ]);
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async getById(id) {
    try {
      const result = await service.query("select * from tarefa where id = ?", [
        id,
      ]);
      if (result.length <= 0) {
        throw new ValidationError({ message: "tarefa não encontrada" });
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async getByUsuario(idUsuario) {
    try {
      const today = new Date();
      const date = new Date(today.getFullYear(), today.getMonth(), 1);
      const result = await service.query(
        `select t.*,u.nome as usuario from tarefa t 
        join usuario u on t.usuarioId = u.id
        where t.usuarioId = ? and data >= ? and concluida = 0`,
        [idUsuario, date]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async getByUsuarioCategoria(idUsuario, idCategoria) {
    try {
      const result = await service.query(
        `select t.*,u.nome as usuario from tarefa t 
        join usuario u on t.usuarioId = u.id
        where t.usuarioId = ? and t.categoriaId = ? and concluida = 0`,
        [idUsuario, idCategoria]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async finalizeTarefa(id) {
    try {
      let tarefa = await this.getById(id);
      if (tarefa) {
        const result = await service.query(
          "update tarefa set concluida = 1 where id = ?",
          [id]
        );
        return result;
      }
      throw new Error("tarefa não encontrada");
    } catch (error) {
      throw error;
    }
  }
  static validateTarefa(tarefa) {
    validateNull({ descricao: tarefa.descricao });
    validateMinMaxLength(tarefa.descricao, "descricao", 5, 250);
    validateMinMaxLength(tarefa.titulo, "titulo", 5, 30);
  }
};
