const Contato = require("../models/contatoModel");

exports.paginaInicial = (req, res) => {
  res.send("Obrigado por entrar em contato.");
};

exports.index = (req, res) => {
  res.render("contato");
};

exports.register = async (req, res) => {
  try {
    const contato = new Contato(req.body);
    await contato.register();
    if (contato.errors.length > 0) {
      req.flash("errors", contato.errors);
      console.log("errors:", contato.errors);
      req.session.save(() => res.redirect("/contato"));
      return;
    }
    console.log("sucesso!");
    req.flash("success", "Contato Salvo com sucesso!");
    req.session.save(() => res.redirect("/contato"));
    return;
  } catch (e) {
    console.log(e);
    return res.render("404");
  }
};
