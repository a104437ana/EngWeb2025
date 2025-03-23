var Aluno = require('../models/aluno')

module.exports.list = () => {
    return Aluno.find().sort({nome : 1}).exec()
}

module.exports.findById = (id) => {
    return Aluno.findById(id).exec()
}

module.exports.insert = (aluno) => {
    return Aluno.findById(aluno._id).exec().then(a => {
        if (!a) {
            const newAluno = new Aluno(aluno);
            newAluno._id = aluno._id;
            return newAluno.save();
        }
        return null;
    }).catch(err => {
        console.error("Erro ao inserir aluno:", err);
        throw err;
    });
}

module.exports.update = (id, aluno) => {
    for (let i = 1; i <= 8; i++) {
        if (!aluno[`tpc${i}`]) aluno[`tpc${i}`] = false;
    }
    return Aluno.findByIdAndUpdate(id, aluno).exec()
}

module.exports.delete = (id) => {
    return Aluno.findByIdAndDelete(id).exec()
}