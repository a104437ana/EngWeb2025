var Contrato = require('../models/contrato')

module.exports.list = () => {
    return Contrato.find().exec()
}

module.exports.listEntidade = (e) => {
    return Contrato.find({NIPC_entidade_comunicante : e}).exec()
}

module.exports.listTipo = (t) => {
    return Contrato.find({tipoprocedimento : t}).exec()
}

module.exports.findById = (id) => {
    return Contrato.findById(id).exec()
}

module.exports.tipos = () => {
    return Contrato.distinct("tipoprocedimento").exec()
}

module.exports.entidades = () => {
    return Contrato.distinct("entidade_comunicante").exec()
}

module.exports.insert = (contrato) => {
    return Contrato.findById(contrato._id).exec().then(c => {
        if (!c) {
            const newContrato = new Contrato(contrato);
            return newContrato.save();
        }
        return null;
    }).catch(err => {
        console.error("Erro ao inserir contrato:", err);
        throw err;
    });
}

module.exports.update = (id, contrato) => {
    return Contrato.findByIdAndUpdate(id, contrato).exec()
}

module.exports.delete = (id) => {
    return Contrato.findByIdAndDelete(id).exec()
}