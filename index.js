const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const db = require("./db");
const app = express();
const routes = require("./routes");

app.use(cors());
app.use(bodyParser.json({ urlencoded: true }));
app.use(express.json());

routes(app);
app.listen(process.env.PORT | 3001, () => {
  console.log(`api running at port:${process.env.PORT}`);
});

module.exports = app;
