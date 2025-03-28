var mongoose = require('mongoose');

var contratoSchema = new mongoose.Schema({
    _id : String,
    nAnuncio : String,
    tipoprocedimento : String,
    objetoContrato : String,
    dataPublicacao : String,
    dataCelebracao : String,
    precoContratual : Number,
    prazoExecucao : Number,
    NIPC_entidade_comunicante : String,
    entidade_comunicante : String,
    fundamentacao : String
}, {versionKey : false})

module.exports = mongoose.model('contrato',contratoSchema)