const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Ocorrencia = new Schema({
    idoso:{
        type:Schema.Types.ObjectId,
        ref: "idosos",
        required: true
    },
    tipoocorrencia:{
        type:String,
        required:true
    },
    assistenciamedica:{
        type:String,
        required:true
    },
    descricao:{
        type: String,
        required:true
    },
    
    data:{
        type: Date,
        default: Date.now()
    }
})

mongoose.model("ocorrencias", Ocorrencia)

