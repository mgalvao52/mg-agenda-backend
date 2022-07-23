const validation = require("../validations/validate");
const ValidationError = require("../validations/ValidationError");
const service = require("./service");

module.exports = class categoriaService {
  static async insert(categoria) {
    try {
      validation.validateNull(categoria);
      var categoriaDb = await this.getByDescricao(categoria.descricao);
      if (categoriaDb.length > 0) {
        throw new ValidationError({ message: "categoria já existe" });
      }
      const result = service.query("insert into categoria set ?", categoria);
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async update(categoria) {
    try {
      validation.validateNull(categoria);
      var catgegoriaDb = await service.query(
        "select * from categoria where id = ?",
        categoria.id
      );
      if (catgegoriaDb.length <= 0) {
        throw new ValidationError({ message: "categoria não encontrada" });
      }
      const result = await service.query(
        "update categoria set descricao = ? where id = ?",
        [categoria.descricao, categoria.id]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async delete(id) {
    try {
      const result = await service.query("delete categoria where id = ?", id);
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async getById(id) {
    try {
      const categoria = await service.query(
        "select * from categoria where id = ?",
        id
      );
      return categoria;
    } catch (error) {
      throw error;
    }
  }
  static async getByDescricao(descricao) {
    try {
      const categoria = await service.query(
        "select * from categoria where descricao = ?",
        descricao
      );
      return categoria;
    } catch (error) {
      throw error;
    }
  }

  static async getAll() {
    try {
      const categoria = await service.query(
        "select * from categoria order by id"
      );
      return categoria;
    } catch (error) {
      throw error;
    }
  }
};
