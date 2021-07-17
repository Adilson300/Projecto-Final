const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")



router.get("/registro", (req, res) =>{
    res.render("usuarios/registro.handlebars")
})



router.post('/registro', (req, res) => {
    var erros =[]

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){

        erros.push({texto: "Nome invalido"})
    }

    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){

        erros.push({texto: "Email invalido"})
    }

    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){

        erros.push({texto: "Senha invalido"})
    }

    if(req.body.nome.length <2){
        erros.push({texto: "Nome do usuário muito pequeno!"})
    }

    if(req.body.senha.length <4){
        erros.push({texto: "Senha muito curta!"})
    }

    if(req.body.senha = req.body.senha2){
        erros.push({texto: "As senhas são diferentes, tente novamente!"})
    }

    if(erros.length > 0){
        res.render("usuarios/registro.handlebars", {erros: erros})
    }else{
        
    }




})

module.exports = router