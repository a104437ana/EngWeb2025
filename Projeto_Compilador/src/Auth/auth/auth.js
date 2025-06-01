var jwt = require('jsonwebtoken')

module.exports.validate = (req, res, next) => {
    var token = req.query.token || req.body.token || req.get('Authorization')
    if (token && token.startsWith('Bearer ')) token = token.slice(7);
    if (token) {
        jwt.verify(token, "EngWeb2025", (err, payload) => {
            if (err) res.status(401).jsonp(err)
            else next()
        })
    }
    else res.status(401).jsonp({ error: "Token inexistente" })
}

module.exports.validateUtilizador = (req, res, next) => {
    var token = req.query.token || req.body.token || req.get('Authorization')
    if (token && token.startsWith('Bearer ')) token = token.slice(7);
    if (token) {
        jwt.verify(token, "EngWeb2025", (err, payload) => {
            if (err) res.status(401).jsonp(err)
            else {
                next();
            }
        })
    }
    else res.status(401).jsonp({ error: "Token inexistente" })
}

module.exports.validateAdmin = (req, res, next) => {
    var token = req.query.token || req.body.token || req.get('Authorization')
    if (token && token.startsWith('Bearer ')) token = token.slice(7);
    if (token) {
        jwt.verify(token, "EngWeb2025", (err, payload) => {
            if (err) res.status(401).jsonp(err)
            else {
                if (payload.level == 1) next()
                else res.status(401).jsonp({ error: "Utilizador sem permissão para aceder ao conteúdo" })
            }
        })
    }
    else res.status(401).jsonp({ error: "Token inexistente" })
}

module.exports.validateUser = (req, res, next) => {
    var token = req.query.token || req.body.token || req.get('Authorization')
    if (token && token.startsWith('Bearer ')) token = token.slice(7);
    if (token) {
        jwt.verify(token, "EngWeb2025", (err, payload) => {
            if (err) res.status(401).jsonp(err)
            else {
                if (payload.username == req.params.id) next()
                else res.status(401).jsonp({ error: "Utilizador sem permissão para aceder ao conteúdo" })
            }
        })
    }
    else res.status(401).jsonp({ error: "Token inexistente" })
}

module.exports.validateAdminOrUser = (req, res, next) => {
    var token = req.query.token || req.body.token || req.get('Authorization')
    if (token && token.startsWith('Bearer ')) token = token.slice(7);
    if (token) {
        jwt.verify(token, "EngWeb2025", (err, payload) => {
            if (err) res.status(401).jsonp(err)
            else {
                if (payload.level == 1) next()
                else if (payload.username == req.params.id) next()
                else res.status(401).jsonp({ error: "Utilizador sem permissão para aceder ao conteúdo" })
            }
        })
    }
    else res.status(401).jsonp({ error: "Token inexistente" })
}