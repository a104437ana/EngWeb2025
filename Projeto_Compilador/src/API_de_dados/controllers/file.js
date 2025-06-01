const { files } = require('jszip')
var File = require('../models/file')

module.exports.findAll = () => {
    return File
        .find()
        .exec()
}

module.exports.findById = (id) => {
    return File
        .findById(id)
        .exec()
}

module.exports.save = async (file) => {
    var fileDB = new File(file)
    return fileDB.save()
}

module.exports.delete = async (id) => {
    var file = await File
        .findByIdAndDelete(id, {new : true})
        .exec()
    return file.path
}

module.exports.update = async (id, data, public) => {
    var old = File.findById(id).exec();
    var file = {
        path : old.path,
        title : data.title,
        type : old.type,
        tags : data.tags,
        uploaded_by : old.uploaded_by,
        public : public
    }
    return File
        .findByIdAndUpdate(id, file, {new : true})
        .exec()
}

module.exports.updateInfo = async (id, info) => {
    var old = File.findById(id).exec();
    var file = {
        path : info.path,
        title : old.title,
        type : info.type,
        tags : old.tags,
        uploaded_by : old.uploaded_by,
        public : old.public
    }
    return File
        .findByIdAndUpdate(id, file, {new : true})
        .exec()
}

module.exports.insert = async (file) => {
    var fileDB = new File({
        path : "",
        title : file.title,
        type : "",
        tags : file.tags,
        uploaded_by : file.uploaded_by,
        public : file.public
    })
    const f = await fileDB.save();
    return f._id;
}