const route = require("express").Router();
const controller = require("../controllers/tarefa-controller");
const { authentication } = require("../middlewares/auth");
route.post("/api/tarefa", authentication, controller.insert);
route.put("/api/tarefa", authentication, controller.update);
route.delete("/api/tarefa/:id", authentication, controller.delete);
route.get("/api/tarefa/:id", authentication, controller.getById);
route.get("/api/tarefa/usuario/lista", authentication, controller.getByUsuario);
route.get(
  "/api/tarefa/categoria/:idCategoria",
  authentication,
  controller.getByUsuarioCategoria
);
route.put(
  "/api/tarefa/finaliza/:id",
  authentication,
  controller.finalizeTarefa
);
module.exports = route;
