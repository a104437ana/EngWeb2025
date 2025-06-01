var mongoose = require('mongoose')

var fileSchema = new mongoose.Schema({
    path : String,
    title : String,
    type : String,
    tags : [String],
    uploaded_by : String,
    public : Boolean
}, {versionKey : false})

module.exports = mongoose.model('file', fileSchema)