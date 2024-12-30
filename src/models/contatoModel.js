const mongoose = require("mongoose");
const validator = require("validator");

const ContatoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: false },
  phone: { type: String, required: false },
  created: { type: Date, default: Date.now },
});

const ContatoModel = mongoose.model("Contato", ContatoSchema);

function Contato(body) {
  this.body = body;
  this.errors = [];
  this.contato = null;
}

Contato.prototype.valida = function () {
  // Validação dos campos;
  this.cleanUp();
  console.log("Body que chegou no valida: ", this.body);
  if (this.body.email && !validator.isEmail(this.body.email)) {
    this.errors.push("Email inválido!");
  }
  if (!this.body.name) {
    this.errors.push("Nome é um campo obrigatório");
  }
  if (!this.body.email && !this.body.phone) {
    this.errors.push("Insira pelo menos uma maneira de contato.");
  }
};

Contato.prototype.register = async function () {
  this.valida();
  if (this.errors.length > 0) return;

  try {
    this.contato = await ContatoModel.create(this.body);
  } catch (e) {
    console.log(e);
  }
};

Contato.fetchContact = async function (id) {
  if (typeof id !== "string") return;
  const user = await ContatoModel.findById(id);
  return user;
};

Contato.prototype.cleanUp = function () {
  for (const key in this.body) {
    if (typeof this.body[key] !== "string") {
      this.body[key] = "";
    }
  }

  this.body = {
    name: this.body.name,
    email: this.body.email,
    phone: this.body.phone,
  };
};

Contato.prototype.update = async function (id) {
  if (typeof id != "string") return;
  this.valida();
  if (this.errors.length > 0) return;
  this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {
    new: true,
  });
};

module.exports = Contato;
