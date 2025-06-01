var mongoose = require('mongoose')

var uploadSchema = new mongoose.Schema({
    path : String,
    upload_date : Date,
    uploaded_by : String,
    public : Boolean,
    description : String,
    views: Number,
    downloads: Number,
    files : [String]
}, {versionKey : false})

module.exports = mongoose.model('upload', uploadSchema)