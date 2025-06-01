var User = require('../models/user')

// Lista de utilizadores
module.exports.list = () => {
    return User
        .find()
        .sort('name')
        .exec()
}

module.exports.getUser = (id) => {
    return User
        .findOne({username: id})
        .exec()
}

module.exports.getAdmins = () => {
    return User
        .find({level: 1})
        .exec()
}

module.exports.existsUser = async (id) => {
    const e = await User
        .exists({username: id})
        .exec();
    if(e==null){
        return false;
    }
    else{
        return true;
    }
}

module.exports.addUser = (user) => {
    var userDb = new User(user)
    return userDb.save()
}

module.exports.updateUser = async (id, data) => {
    var user = await User.findOne({username: id}).exec()
    if (data.password && data.password.trim() != "") {
        await user.setPassword(data.password)
        await user.save()
    }
    delete data.password
    return await User
        .findByIdAndUpdate(user._id, data, {new: true})
        .exec()
}

module.exports.updateUserStatus = (id, status) => {
    return User
        .findOneAndUpdate({username: id}, {active: status}, {new: true})
        .exec()
}

module.exports.updateUserPassword = async (id, password) => {
    var user = await User.findOne({username: id}).exec()
    await user.setPassword(password)
    return user.save()
}

module.exports.deleteUser = async (id) => {
    var user = await User.findOne({username: id}).exec()
    return await User
        .findByIdAndDelete(user._id, {new: true})
        .exec()
}

module.exports.initAdmin = async () => {
    const adminExists = await User.findOne({ level: 1 });
    if (!adminExists) {
        var date = new Date().toISOString().substring(0, 19)
        await User.register(new User({
            username: "admin",
            name: "admin",
            level: 1,
            active: true,
            dateCreated: date
        }), "admin");
    }
}
