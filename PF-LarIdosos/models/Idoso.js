const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Idoso = new Schema({
    nomecompleto:{
        type: String ,
        required:true
    },
    nometratado:{
        type:String,
        required:true
    },
    nprocesso:{
        type: Number,
        required:true
    },
    idade:{
        type: String,
        required:true
    },
    sexo:{
        type: String,
        required:true
    },
    estadocivil:{
        type: String,
        required:true
    },
    profissao:{
        type: String,
        required:true
    },
    nacionalidade:{
        type: String,
        required:true
    },
    nomeparente:{
        type: String,
        required:true
    },
    doencacronica:{
        type: String,
        required:true
    }
})

mongoose.model("idosos", Idoso)

