const Tarefa = require("../models/tarefa-model");
const tarefaService = require("../services/tarefa-service");
const ValidationError = require("../validations/ValidationError");

module.exports = {
  insert: async (request, response) => {
    try {
      let tarefa = new Tarefa(request.body);
      let id = request.usuario.id;
      tarefa.usuarioId = id;
      const result = await tarefaService.insert(tarefa);
      tarefa.id = result.insertId;
      return response.status(201).json(tarefa);
    } catch (error) {
      if (error instanceof ValidationError) {
        return response.status(400).json(error.message);
      }
      console.log(error.message);
      return response
        .status(500)
        .json({ message: "falha ao cadastrar tarefa" });
    }
  },
  update: async (request, response) => {
    try {
      let tarefa = new Tarefa(request.body);
      let id = request.usuario.id;
      tarefa.usuarioId = id;
      await tarefaService.update(tarefa);
      return response
        .status(204)
        .json({ message: "tarefa alterada com sucesso" });
    } catch (error) {
      if (error instanceof ValidationError) {
        return response.status(400).json(error.message);
      }
      console.log(error.message);
      return response.status(500).json({ message: "falha ao alterar tarefa" });
    }
  },
  delete: async (request, response) => {
    try {
      let id = request.params.id;
      await tarefaService.delete(id);
      return response
        .status(200)
        .json({ message: "tarefa removida com sucesso" });
    } catch (error) {
      if (error instanceof ValidationError) {
        return response.status(400).json(error.message);
      }
      console.log(error.message);
      return response.status(500).json({ message: "falha ao remover tarefa" });
    }
  },
  getById: async (request, response) => {
    try {
      let id = request.params.id;
      const tarefa = await tarefaService.getById(id);
      return response.status(200).json(tarefa);
    } catch (error) {
      if (error instanceof ValidationError) {
        return response.status(400).json(error.message);
      }
      console.log(error.message);
      return response
        .status(500)
        .json({ message: "falha ao pesquisar tarefa" });
    }
  },
  getByUsuario: async (request, response) => {
    try {
      let id = request.usuario.id;
      const tarefas = await tarefaService.getByUsuario(id);
      return response.status(200).json(tarefas);
    } catch (error) {
      if (error instanceof ValidationError) {
        return response.status(400).json(error.message);
      }
      console.log(error.message);
      return response
        .status(500)
        .json({ message: "falha ao pesquisar tarefas" });
    }
  },
  getByUsuarioCategoria: async (request, response) => {
    try {
      let idUsuario = request.usuario.id;
      let idCategoria = request.params.idCategoria;
      const tarefas = await tarefaService.getByUsuarioCategoria(
        idUsuario,
        idCategoria
      );
      return response.status(200).json(tarefas);
    } catch (error) {
      if (error instanceof ValidationError) {
        return response.status(400).json(error.message);
      }
      console.log(error.message);
      return response
        .status(500)
        .json({ message: "falha ao pesquisar tarefas" });
    }
  },
  finalizeTarefa: async (request, response) => {
    try {
      let id = request.params.id;
      await tarefaService.finalizeTarefa(id);
      return response
        .status(204)
        .json({ message: "tarefa concluida com sucesso" });
    } catch (error) {
      if (error instanceof ValidationError) {
        return response.status(400).json(error.message);
      }
      console.log(error.message);
      return response.status(500).json({ message: "falha ao concluir tarefa" });
    }
  },
};
