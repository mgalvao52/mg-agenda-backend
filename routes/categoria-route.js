const categoriaController = require("../controllers/categoria-controller");
const { authentication, authorization } = require("../middlewares/auth");

const route = require("express").Router();

route.post("/api/categoria", categoriaController.insert);
route.put(
  "/api/categoria",
  authentication,
  authorization,
  categoriaController.update
);
route.delete(
  "/api/categroria/:id",
  authentication,
  authorization,
  categoriaController.delete
);
route.get("/api/categoria", authentication, categoriaController.getAll);
route.get("/api/categoria/:id", authentication, categoriaController.getById);
route.get(
  "/api/categoria/descricao/:descricao",
  authentication,
  categoriaController.getByDescricao
);

module.exports = route;
