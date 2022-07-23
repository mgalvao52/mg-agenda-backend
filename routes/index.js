const usuarioRoute = require("../routes/usuario-route");
const categoriaRoute = require("../routes/categoria-route");
const tarefaRoute = require("../routes/tarefa-route");
module.exports = (app) => {
  app.use(usuarioRoute);
  app.use(categoriaRoute);
  app.use(tarefaRoute);
};
