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
    req.session.save(() => res.redirect(`/contato/${contato.contato._id}`));
    return;
  } catch (e) {
    console.log(e);
    return res.render("404");
  }
};

exports.editIndex = async function (req, res) {
  if (!req.params.id) return res.render("404");
  const contato = await Contato.fetchContact(req.params.id);
  if (!contato) return res.render("404");
  console.log("contato: ", contato);
  return res.render("contato", {
    contato: contato,
  });
};

exports.update = async function (req, res) {
  if (!req.params.id) return;
  try {
    const contato = new Contato(req.body);
    await contato.update(req.params.id);
    if (contato.errors.length > 0) {
      req.flash("errors", contato.errors);
      console.log("errors:", contato.errors);
      req.session.save(() => res.redirect(`back`));
      return;
    }
    req.flash("success", "Contato editado com sucesso!");
    req.session.save(() => res.redirect(`/contato/${contato.contato._id}`));
    return;
  } catch (e) {
    console.log(e);
    res.render("404");
  }
};

exports.delete = async function (req, res) {
  if (!req.params.id) return;
  try {
    const contato = new Contato(req.body);
    await contato.delete(req.params.id);
    if (contato.errors.length > 0) {
      req.flash("errors", contato.errors);
      console.log("errors:", contato.errors);
      req.session.save(() => res.redirect(`back`));
      return;
    }
    req.flash("success", "Contato removido com sucesso!");
    req.session.save(() => res.redirect(`back`));
    return;
  } catch (e) {
    console.log(e);
    res.render("404");
  }
};
