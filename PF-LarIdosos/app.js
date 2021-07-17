//Carregando modulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require("body-parser")
const app = express()
const admin = require("./routes/admin")
const path = require("path")
const mongoose = require("mongoose")
const session = require("express-session")
const flash = require("connect-flash")
require("./models/Funcionario")
require("./models/Idoso")
const Funcionario = mongoose.model("funcionarios")
const usuarios = require("./routes/usuario")
 

//consigurações
    //Sessão
        app.use(session({
            secret:"laridoso",
            resave: true,
            saveUninitialized:true
        }))
        app.use(flash())

    //Middleware
    app.use((req, res, next) => {
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")
            next()
    })    

    //Body Parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

    //Handlebars
    app.engine('handlebars', handlebars({defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },

    }))
    app.set('View engine', 'handlebars');
    
    //Mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://localhost/bdlaridoso").then(() => {
        console.log("Conectado ao mongo")
    }).catch((err) => {
        console.log("Erro ao se conectar: "+err)
    })

    //Public
    app.use(express.static(path.join(__dirname,"public")))

//Rotas
app.get('/',(req, res) =>{
    res.render("index.handlebars")
}

)
app.get('/posts',(req, res) =>{
    res.send('Lista Posts')
})
 
app.get("admin/idosos",(req, res) =>{
    res.render('admin/idosos.handlebars')
})

app.get("admin/funcionarios",(req, res) =>{
    res.render('admin/funcionarios.handlebars')
})
 

app.use('/admin', admin)
app.use('/usuarios', usuarios)

//Outros
const PORT = 8089
app.listen(PORT,() => {
    console.log("Servidor rodando! ")
})