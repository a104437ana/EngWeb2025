var Upload = require('../models/upload')

module.exports.findAll = () => {
    return Upload
        .find()
        .exec()
}

module.exports.getStats = async () => {
    var mostViewed= await Upload.find({}, '_id views').sort({views: -1}).exec();
    var mostDownloaded= await Upload.find({}, '_id downloads').sort({downloads: -1}).exec();
    return {
        most_viewed : mostViewed.slice(0, 4),
        most_downloaded : mostDownloaded.slice(0,4)
    }
}

module.exports.findById = (id) => {
    return Upload
        .findById(id)
        .exec()
}

module.exports.hasUploads = async (id) =>{
    var nUploads = await Upload.countDocuments({uploaded_by : id}).exec();
    return (nUploads>0);
}

module.exports.publicUserUploads = (id) =>{
    return Upload.find({uploaded_by : id, public : true}, '_id upload_date public description').sort({upload_date: -1}).exec();
}

module.exports.allUserUploads = (id) =>{
    return Upload.find({uploaded_by : id}, '_id upload_date public description').sort({upload_date: -1}).exec();
}

module.exports.save = async (upload) => {
    var uploadDb = new Upload(upload)
    return uploadDb.save()
}

module.exports.delete = async (id) => {
    var upload = await Upload
        .findByIdAndDelete(id, {new : true})
        .exec()
    return upload;
}


module.exports.update = async (id, data) => {
    var old = Upload.findById(id).exec();
    var upload = {
        path : old.path,
        upload_date : old.upload_date,
        uploaded_by : old.uploaded_by,
        public : data.public,
        description : data.description,
        files : data.files,
        views: old.views,
        downloads: old.downloads
    }
    return Upload
        .findByIdAndUpdate(id, upload, {new : true})
        .exec()
}

module.exports.addFile = async (id, f_id) => {
    return await Upload.findByIdAndUpdate(id, { $push: { files: f_id } }, { new: true }).exec();
}

module.exports.updateFilesAndPath = async (id, path, f_ids) => {
    return await Upload.findByIdAndUpdate(id, { files: f_ids, path : path }, { new: true }).exec();
}

module.exports.addView = async (id) => {
    return await Upload.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true }).exec();
}

module.exports.addDownload = async (id) => {
    return await Upload.findByIdAndUpdate(id, { $inc: { downloads: 1 } }, { new: true }).exec();
}