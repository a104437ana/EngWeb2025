var jwt = require('jsonwebtoken')
var Upload = require('../controllers/upload')
var File = require('../controllers/file')

module.exports.validate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token){
        jwt.verify(token, "EngWeb2025", (err, payload) => {
            if(err) res.status(401).jsonp(err)
            else{
                req.user = payload.username
                next()
            }
        })
    }
    else{
        res.status(401).jsonp({error : "Token inexistente"})
    }
}

module.exports.validateAdmin = (req, res, next) => {
const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token){
        jwt.verify(token, "EngWeb2025", async (err, payload) => {
            if(err){
                res.status(401).jsonp({error : "Utilizador não tem permissão para ver as estatísticas"})
            }
            else{
                    if(payload.level == 1){
                        req.level = "ADMIN"
                        req.user = payload.username
                        next()
                    }
                    else{
                        res.status(401).jsonp({error : "Utilizador não tem permissão para ver as estatísticas"})
                    }
            }
        })
    }
    else{
            res.status(401).jsonp({error : "Utilizador não tem permissão para ver as estatísticas"})
    }
}

module.exports.validateChangeUpload = (req, res, next) => {
const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token){
        jwt.verify(token, "EngWeb2025", async (err, payload) => {
            if(err){
                res.status(401).jsonp({error : "Utilizador não tem permissão para alterar o upload"})
            }
            else{
                const upload = await Upload.findById(req.params.id);
                    if(payload.level == 1){
                        req.level = "ADMIN"
                        req.user = payload.username
                        next()
                    }
                    else if (upload.uploaded_by == payload.username){
                        req.level = "USER"
                        req.user = payload.username
                        next()
                    }
                    else{
                        res.status(401).jsonp({error : "Utilizador não tem permissão para alterar o upload"})
                    }
            }
        })
    }
    else{
            res.status(401).jsonp({error : "Utilizador não tem permissão para alterar o upload"})
    }
}

module.exports.validateChangeFile = (req, res, next) => {
const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token){
        jwt.verify(token, "EngWeb2025", async (err, payload) => {
            if(err){
                res.status(401).jsonp({error : "Utilizador não tem permissão para alterar o ficheiro"})
            }
            else{
                const file = await File.findById(req.params.id);
                    if(payload.level == 1){
                        req.level = "ADMIN"
                        req.user = payload.username
                        next()
                    }
                    else if (file.uploaded_by == payload.username){
                        req.level = "USER"
                        req.user = payload.username
                        next()
                    }
                    else{
                        res.status(401).jsonp({error : "Utilizador não tem permissão para alterar o ficheiro"})
                    }
            }
        })
    }
    else{
            res.status(401).jsonp({error : "Utilizador não tem permissão para alterar o ficheiro"})
    }
}

module.exports.validateGetUserDiary = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token) {
        jwt.verify(token, "EngWeb2025", async (err, payload) => {
            if (err) {
                req.level = "PUBLIC";
                next();
            } else {
                if (payload.level == 1) {
                    req.level = "ADMIN";
                    req.user = payload.username;
                } else {
                    req.level = "USER";
                    req.user = payload.username;
                }
                next();
            }
        });
    } else {
        req.level = "PUBLIC";
        next();
    }
}

module.exports.validateGetUpload = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token){
        jwt.verify(token, "EngWeb2025", async (err, payload) => {
            if(err){
                const upload = await Upload.findById(req.params.id);
                if(upload.public==true){
                    req.level = "PUBLIC"
                    next()
                }
                else{
                    res.status(401).jsonp({error : "Utilizador não tem permissão para aceder ao upload"})
                }
            }
            else{
                const upload = await Upload.findById(req.params.id);
                if(upload.public==true){
                    if(payload.level == 1){
                        req.level = "ADMIN"
                        req.user = payload.username
                        next()
                    }
                    else{
                        req.level = "USER"
                        req.user = payload.username
                        next()
                    }
                }
                else{
                    if(payload.level == 1){
                        req.level = "ADMIN"
                        req.user = payload.username
                        next()
                    }
                    else if (upload.uploaded_by == payload.username){
                        req.level = "USER"
                        req.user = payload.username
                        next()
                    }
                    else{
                        res.status(401).jsonp({error : "Utilizador não tem permissão para aceder ao upload"})
                    }
                }
            }
        })
    }
    else{
        const upload = await Upload.findById(req.params.id);
        if(upload.public==true){
            req.level = "PUBLIC"
            next()
        }
        else{
            res.status(401).jsonp({error : "Utilizador não tem permissão para aceder ao upload"})
        }
    }
}

module.exports.validateGetFile = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token){
        jwt.verify(token, "EngWeb2025", async (err, payload) => {
            if(err){
                const file = await File.findById(req.params.id);
                if(file.public==true){
                    req.level = "PUBLIC"
                    next()
                }
                else{
                    res.status(401).jsonp({error : "Utilizador não tem permissão para aceder ao ficheiro"})
                }
            }
            else{
                const file = await File.findById(req.params.id);
                if(file.public==true){
                    if(payload.level == 1){
                        req.level = "ADMIN"
                        req.user = payload.username
                        next()
                    }
                    else{
                        req.level = "USER"
                        req.user = payload.username
                        next()
                    }
                }
                else{
                    if(payload.level == 1){
                        req.level = "ADMIN"
                        req.user = payload.username
                        next()
                    }
                    else if (file.uploaded_by == payload.username){
                        req.level = "USER"
                        req.user = payload.username
                        next()
                    }
                    else{
                        res.status(401).jsonp({error : "Utilizador não tem permissão para aceder ao ficheiro"})
                    }
                }
            }
        })
    }
    else{
        const file = await File.findById(req.params.id);
        if(file.public==true){
            req.level = "PUBLIC"
            next()
        }
        else{
            res.status(401).jsonp({error : "Utilizador não tem permissão para aceder ao ficheiro"})
        }
    }
}