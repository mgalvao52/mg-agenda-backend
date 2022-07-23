const Usuario = require("../models/usuario-model");
const usuarioService = require("../services/usuario-service");
const ValidationError = require("../validations/ValidationError");
const jwt = require("jsonwebtoken");

module.exports = {
  insert: async (request, response) => {
    try {
      const usuario = new Usuario(request.body);
      const result = await usuarioService.insert(usuario);
      if (result) {
        return response.json({ message: "usuario criado com sucesso! " });
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        return response.status(400).json(error.message);
      }
      return response
        .status(500)
        .json({ message: "falha ao cadastrar usuario" });
    }
  },
  update: async (request, response) => {
    try {
      const usuario = new Usuario(request.body);
      const result = await usuarioService.update(usuario);
      if (result) {
        return response
          .status(204)
          .json({ message: "usuario alterado com sucesso" });
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        return response.status(400).json(error.message);
      }
      console.log(error.message);
      return response.status(500).json({ message: "falha ao alterar usuario" });
    }
  },
  login: async (request, response) => {
    try {
      const email = request.body.email;
      const senha = request.body.senha;
      const result = await usuarioService.login({ email, senha });
      if (result) {
        let token = jwt.sign(
          { id: result.id, admin: false, name: result.nome },
          process.env.API_SECRET_KEY,
          { expiresIn: "2h" }
        );
        response.header("access-token", token);
        response.status(200).json({ message: token });
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        return response.status(400).json(error.message);
      }
      console.log(error);
      return response.status(500).json({ message: "falha no login" });
    }
  },
};
