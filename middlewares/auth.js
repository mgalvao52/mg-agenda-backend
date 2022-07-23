const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = {
  authentication: (request, response, next) => {
    let token = request.header("authorization");
    if (!token) {
      return response.status(401).json();
    }
    try {
      if (token.includes("Bearer ")) {
        token = token.slice(7, token.length).trimLeft();
      }
      const result = jwt.verify(token, process.env.API_SECRET_KEY);
      request.usuario = result;
      next();
    } catch (error) {
      return response.status(401).json({ message: "token invalido" });
    }
  },
  authorization: (request, response, next) => {
    let { admin } = request.body;
    if (!admin || admin !== true) {
      return response.status(403).json({ message: "acesso não permitido" });
    }
    next();
  },
};
