const express = require("express");
const route = express.Router();
const homeController = require("./src/controllers/homeController");
const loginController = require("./src/controllers/loginController");
const contatoController = require("./src/controllers/contatoController");

const { authRequired } = require("./src/middlewares/middleware");

// Rotas da home
route.get("/", homeController.index);

// Rotas de login;
route.get("/login", loginController.index);
route.post("/login/register", loginController.register);
route.post("/login/login", loginController.login);
route.get("/login/logout", loginController.logout);
// Rotas de contato;
route.get("/contato", authRequired, contatoController.index);
route.post("/contato/register", authRequired, contatoController.register);
route.get("/contato/:id", authRequired, contatoController.editIndex);
route.post("/contato/update/:id", authRequired, contatoController.update);
route.get("/contato/delete/:id", authRequired, contatoController.delete);

module.exports = route;
