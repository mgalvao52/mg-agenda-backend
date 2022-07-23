const usuarioController = require("../controllers/usuario-controller");
const { authentication, authorization } = require("../middlewares/auth");
const route = require("express").Router();

route.post("/api/usuario", usuarioController.insert);
route.put(
  "/api/usuario",
  authentication,
  authorization,
  usuarioController.update
);
route.post("/api/usuario/login", usuarioController.login);

module.exports = route;
