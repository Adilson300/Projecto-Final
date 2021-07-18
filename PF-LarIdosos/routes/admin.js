const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Funcionario")
require("../models/Idoso")
const Funcionario = mongoose.model("funcionarios")
const Idoso = mongoose.model("idosos")
require("../models/Ocorrencia")
const Ocorrencia = mongoose.model("ocorrencias")

router.get('/', (req, res) => {
    res.render("admin/index.handlebars")
    
})

//.................................funcionario
//Página Inicial
router.get('/funcionarios', (req, res) => {
    Funcionario.find().sort({nome:'asc'}).then((funcionarios) => {
        res.render("admin/funcionarios.handlebars", {funcionarios: funcionarios})
    }).catch((err) => {
        req.flash("error_msg", "Lamentamos, Houve um erro ao Listar o Funcionàrio!!")
        res.redirect("/admin")
   })
   

})
//Página adição
router.get('/funcionarios/add', (req, res) => {
    res.render("admin/addfuncionarios.handlebars")
})

//Novo funcionario
router.post('/funcionarios/novo', (req, res) => {
    var erros =[]

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){

        erros.push({texto: "Nome invalido"})
    }

    if(!req.body.funcao || typeof req.body.funcao == undefined || req.body.funcao == null){

        erros.push({texto: "Função invalido"})
    }

    if(!req.body.telefone || typeof req.body.telefone == undefined || req.body.telefone == null){

        erros.push({texto: "Função invalido"})
    }

    if(req.body.nome.length <2){
        erros.push({texto: "Nome do funcionario muito pequeno!"})
    }

    if(erros.length > 0){
        res.render("admin/addfuncionarios.handlebars", {erros: erros})
    }else{
        const novoFuncionario = {
            nome:       req.body.nome,
            funcao:     req.body.funcao,
            telefone:   req.body.telefone
        
           }
        
           new Funcionario (novoFuncionario).save().then(() => {
               req.flash("success_msg", "Funcionàrio Criado com sucesso!!")
               res.redirect("/admin/funcionarios")
           }).catch((err) => {
                req.flash("error_msg", "Lamentamos, Houve um erro ao ciar o Funcionàrio, tente novamente!!")
                res.redirect("/admin")
           })
    }




})

//editar funcionario
//Página editar
router.get('/funcionarios/edit/:id', (req, res) => {
    Funcionario.findOne({_id:req.params.id}).then((funcionario) => {
            res.render("admin/editfuncionarios.handlebars", {funcionario: funcionario})
    }).catch((err) => {
        req.flash("error_msg", "Este Funcionário não existe")
        res.redirect("/admin/funcionarios.handlebars")
    })
    
})

router.post("/funcionarios/edit",(req, res) => {
    Funcionario.findOne({_id: req.body.id}).then((funcionario) => {
        
        funcionario.nome = req.body.nome
        funcionario.funcao = req.body.funcao
        funcionario.telefone = req.body.telefone

        funcionario.save().then(() => {
            req.flash("success", "Funcionário editado com sucesso!!")
            res.redirect("/admin/funcionarios")
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno ao salvar a edição da categoria")
            res.redirect("/admin/funcionarios")
        })
    }).catch((err) => {
        req.flash("error_msg", "Hoyve um erro ao editar o funcionário")
        res.redirect("/admin/funcionarios")
    })
})

//Remover funcionario
router.post('/funcionarios/deletar', (req, res) => {
    Funcionario.remove({_id: req.body.id}).then(() =>{
        req.flash("success_msg","Funcionario deletado com sucesso!")
        res.redirect("/admin/funcionarios")
    }).catch((err) =>{
        req.flash("error_msg","Houve um erro ao deletar o funcionário!")
        res.redirect("/admin/funcionarios")
    }).catch((err) =>{
        req.flash("error_msg", "Houve um erro ao deletar o funcionário!")
        res.redirect("/admin/funcionarios")
    })
   
})

//idosos
router.get('/idosos', (req, res) => {
    Idoso.find().sort({nomecompleto:'asc'}).then((idosos) => {
        res.render("admin/idosos.handlebars", {idosos: idosos})
    }).catch((err) => {
        req.flash("error_msg", "Lamentamos, Houve um erro ao Listar os idosos cadastrados!")
        res.redirect("/admin")
   })

})

router.get('/idosos/add', (req, res) => {
    res.render("admin/addidosos.handlebars")
})

//novo idoso
router.post('/idosos/novo', (req, res) => {
    var erros =[]

    if(!req.body.nomecompleto || typeof req.body.nomecompleto == undefined || req.body.nomecompleto == null){

        erros.push({texto: "Nome invalido"})
    }

    if(!req.body.nometratado || typeof req.body.nometratado == undefined || req.body.nometratado == null){

        erros.push({texto: "Nome invalido"})
    }

    if(!req.body.nprocesso || typeof req.body.nprocesso == undefined || req.body.nprocesso == null){

        erros.push({texto: "Número de processo invalido invalido"})
    }

    if(req.body.nomecompleto.length <2){
        erros.push({texto: "Nome muito pequeno!"})
    }

    if(erros.length > 0){
        res.render("admin/addidosos.handlebars", {erros: erros})
    }else{
        const novoIdoso = {
            nomecompleto: 	req.body.nomecompleto,
            nometratado:  	req.body.nometratado,
            nprocesso:		req.body.nprocesso,	
            idade:			req.body.idade,
            sexo:			req.body.sexo,
            estadocivil:	req.body.estadocivil,		
            profissao:		req.body.profissao,
            nacionalidade:	req.body.nacionalidade,
            nomeparente:	req.body.nomeparente,
            doencacronica:	req.body.doencacronica
        
           }
        
           new Idoso (novoIdoso).save().then(() => {
            req.flash("success_msg", "Idoso Criado com sucesso!!")
            res.redirect("/admin/idosos")
        }).catch((err) => {
             req.flash("error_msg", "Lamentamos, Houve um erro no cadastro, tente novamente!!")
             res.redirect("/admin")
        })
    }

})

//Página editar
router.get('/idosos/edit/:id', (req, res) => {
    Idoso.findOne({_id:req.params.id}).then((idoso) => {
            res.render("admin/editidosos.handlebars", {idoso: idoso})
    }).catch((err) => {
        req.flash("error_msg", "Este Idoso não existe")
        res.redirect("/admin/idosos.handlebars")
    })
    
})

router.post("/idosos/edit",(req, res) => {
    Idoso.findOne({_id: req.body.id}).then((idoso) => {

        idoso.nomecompleto      = 	req.body.nomecompleto,
        idoso.nometratado       =  	req.body.nometratado,
        idoso.nprocesso         =	req.body.nprocesso,	
        idoso.idade             =	req.body.idade,
        idoso.sexo              =	req.body.sexo,
        idoso.estadocivil       =	req.body.estadocivil,		
        idoso.profissao         =	req.body.profissao,
        idoso.nacionalidade     =	req.body.nacionalidade,
        idoso.nomeparente       =	req.body.nomeparente,
        idoso.doencacronica     =	req.body.doencacronica
        
        idoso.save().then(() => {
            req.flash("success", "Idoso editado com sucesso!!")
            res.redirect("/admin/idosos")
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno ao salvar a edição!")
            res.redirect("/admin/idosos")
        })
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao editar!")
        res.redirect("/admin/idosos")
    })
})


//.................................ocorrencias
router.get('/ocorrencias', (req, res) => {
    Ocorrencia.find().populate("idoso").sort({data:"desc"}).then((ocorrencias) => {
        res.render("admin/ocorrencias.handlebars", {ocorrencias: ocorrencias})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar ocorrências")
        res.redirect("/admin")
    })
   

})

router.get('/ocorrencias/add', (req, res) => {
    Idoso.find().then((idosos) =>{
        res.render("admin/addocorrencias.handlebars",{idosos:idosos})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao carregar o formulário")
        res.redirect("/admin")
    })
   

})

router.post('/ocorrencias/novo', (req, res) => {
    var erros =[]

    if(req.body.idoso == "0"){
        erros.push({texto: "Sem Registro, registre um Idoso"})
    }
   if(erros.length > 0){
       res.render("admin/addocorrencias.handlebars",{erros:erros})
   }else{
       const novaOcorrencia = {
        idoso:              req.body.idoso,
        tipoocorrencia:     req.body.tipoocorrencia,
        assistenciamedica:  req.body.assistenciamedica,
        descricao:          req.body.descricao
       }
       
       new Ocorrencia(novaOcorrencia).save().then(() =>{
           req.flash("success_msg", "Ocorrência criada com sucesso!")
           res.redirect("/admin/ocorrencias")
       }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao salvar uma ocorrência!")
        res.redirect("/admin/ocorrencias")
    })
   }

})


//.................................fim ocorrencias

module.exports = router