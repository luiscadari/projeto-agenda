const Login = require('../models/loginModel')
exports.index = (req, res) => {
    res.render('login')
}

exports.register = async (req, res) => {
    try{
        const login = new Login(req.body)
        await login.register();
        if(login.errors.length > 0){
            req.flash('errors', login.errors);
            req.session.save(()=>{
                return res.redirect('/login');
            })
            return;
        }
    req.flash('success', 'Seu usuário foi registrado com sucesso!')

    return res.redirect('/login')
    }catch(e){
        console.log(e);
        return res.render('404');
    }
}

exports.login = async (req, res) => {
    try{
        const login = new Login(req.body);
        await login.login();
        if(login.errors.length > 0){
            req.flash('errors', login.errors);
            req.session.save(()=>{
                return res.redirect('/login')
            })
            return;
        }
        req.flash('success', 'Logado com sucesso!');
        req.session.user = login.user;
        req.session.save(()=>{
            return res.redirect('/login')
        })
        return;
    }catch(e){
        console.log(e);
    }
}