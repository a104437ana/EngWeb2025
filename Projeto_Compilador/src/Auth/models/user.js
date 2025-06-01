var mongoose = require('mongoose'),
Schema = mongoose.Schema,
passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: { type: String, required: true, unique: true },
    password: String,
    name: String,
    level: Number,
    active: Boolean,
    dateCreated: String
});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('user', User);
