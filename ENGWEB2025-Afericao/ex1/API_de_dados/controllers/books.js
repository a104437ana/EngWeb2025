var Book = require('../models/book')

module.exports.list = () => {
    return Book.find().exec()
}

module.exports.listGenre = (e) => {
    return Book.find({ genres: { $in: [e] } }).exec()
}

module.exports.listCharacter = (c) => {
    return Book.find({ characters: { $in: [c] } }).exec()
}

module.exports.findById = (id) => {
    return Book.findById(id).exec()
}

module.exports.genres = () => {
    return Book.distinct("genres").exec()
}

module.exports.characters = () => {
    return Book.distinct("characters").exec()
}

module.exports.insert = (contrato) => {
    return Book.findById(contrato._id).exec().then(c => {
        if (!c) {
            const newContrato = new Book(contrato);
            return newContrato.save();
        }
        return null;
    }).catch(err => {
        console.error("Erro ao inserir contrato:", err);
        throw err;
    });
}

module.exports.update = (id, contrato) => {
    return Book.findByIdAndUpdate(id, contrato).exec()
}

module.exports.delete = (id) => {
    return Book.findByIdAndDelete(id).exec()
}