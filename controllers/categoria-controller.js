const Categoria = require("../models/categoria-model");
const categoriaService = require("../services/categoria-service");
const ValidationError = require("../validations/ValidationError");

module.exports = {
  insert: async (request, response) => {
    try {
      const categoria = new Categoria(request.body);
      const result = await categoriaService.insert(categoria);
      categoria.set(result.insertId);
      return response.status(201).json(categoria);
    } catch (error) {
      if (error instanceof ValidationError) {
        return response.status(400).json(error.message);
      }
      console.log(error);
      return response
        .status(500)
        .json({ message: "erro ao cadastrar categoria" });
    }
  },
  update: async (request, response) => {
    try {
      const categoria = new Categoria(request.body);
      const result = await categoriaService.update(categoria);
      return response
        .status(204)
        .json({ message: "categoria alterada com sucesso" });
    } catch (error) {
      if (error instanceof ValidationError) {
        return response.status(400).json(error.message);
      }
      return response
        .status(500)
        .json({ message: "erro ao cadastrar categoria" });
    }
  },
  delete: async (request, response) => {
    try {
      await categoriaService.delete(request.params.id);
      return response
        .status(204)
        .json({ message: "categoria removida com sucesso" });
    } catch (error) {
      return response
        .status(500)
        .json({ message: "erro ao cadastrar categoria" });
    }
  },
  getById: async (request, response) => {
    try {
      const id = request.params.id;
      const result = await categoriaService.getById(id);
      if (result.length > 0) {
        return response.status(200).json(result[0]);
      }
      return response.status(404).json({ message: "categoria não encontrada" });
    } catch (error) {
      return response
        .status(500)
        .json({ message: "erro ao pesquisar categoria" });
    }
  },
  getByDescricao: async (request, response) => {
    try {
      const descricao = request.params.descricao;
      const result = await categoriaService.getByDescricao(descricao);
      if (result.length > 0) {
        return response.status(200).json(result[0]);
      }
      return response.status(404).json({ message: "categoria não encontrada" });
    } catch (error) {
      return response
        .status(500)
        .json({ message: "erro ao pesquisar categoria" });
    }
  },
  getAll: async (request, response) => {
    try {
      const result = await categoriaService.getAll();
      return response.status(200).json(result);
    } catch (error) {
      return response
        .status(500)
        .json({ message: "erro ao pesquisar categorias" });
    }
  },
};
