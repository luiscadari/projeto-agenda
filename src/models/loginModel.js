const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')

const LoginSchema = new mongoose.Schema({
  email: {type: String, required: true},
  password: {type: String, required: true}
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
  constructor(body){
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  valida() {
    // Validação dos campos;
    this.cleanUp();
    console.log("Body que chegou no valida: ", this.body)

    // Valida o email;
    if(!validator.isEmail(this.body.email)){
      console.log("Email inválido")
      this.errors.push('Email inválido')
    }
    //valida a senha
    if(this.body.password.length < 3 || this.body.password.length > 50){
      console.log('senha inválida')
      console.log("password: ", this.body.password);
      console.log("password.length", this.body.password.length)
      this.errors.push("A senha precisa ter entre 3 e 50 caracteres")
    }
  }
  async register() {
    console.log('Dados que chegaram: ', this.body)
    this.valida();
    if(this.errors.length > 0){
      return
    }
    try{
      // é necessário verificar se o usuário já existe;
      const isCreatedUser = await LoginModel.findOne({email: this.body.email});
      if(isCreatedUser){
        this.errors.push("Usuário já cadastrado");
        return
      }
      const salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(this.body.password, salt);
      this.body.password = hash;
      this.user = await LoginModel.create(this.body);
    }catch(e){
      console.log(e);
    }

  }
  cleanUp() {
    this.errors = []
    for(const key in this.body){
      if(typeof this.body[key] !== 'string'){
        this.body[key] = '';
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password
    }
  }
}

module.exports = Login;
