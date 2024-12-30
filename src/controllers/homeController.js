const Contato = require("../models/contatoModel");

exports.index = async (req, res) => {
  const contatos = await Contato.fetchContacts();
  res.render("index", { contatos });
  return;
};
