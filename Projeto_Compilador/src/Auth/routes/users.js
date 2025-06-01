var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var passport = require('passport')
var userModel = require('../models/user')
var Auth = require('../auth/auth')

var User = require('../controllers/user')

router.get('/', Auth.validateAdmin, function(req, res) {
  User.list()
    .then(data => res.status(200).jsonp({ data: data }))
    .catch(err => res.status(500).jsonp({ error: err }))
});

router.get('/admins', function(req, res) {
  User.getAdmins()
    .then(data => res.status(200).jsonp({ data: data.map(admin => admin.username) }))
    .catch(err => res.status(500).jsonp({ error: err }))
});

router.get('/exists/:id', function(req, res) {
  User.existsUser(req.params.id)
    .then(exists => res.status(200).jsonp({ data: exists }))
    .catch(err => res.status(500).jsonp({ error: err }))
});

router.get('/:id', Auth.validateAdminOrUser, function(req, res) {
  User.getUser(req.params.id)
    .then(data => res.status(200).jsonp({ data: data }))
    .catch(err => res.status(500).jsonp({ error: err }))
});

router.post('/', function(req, res) {
  var date = new Date().toISOString().substring(0, 19)
  userModel.register(new userModel({
      username: req.body.username,
      name: req.body.name,
      level: req.body.level || 0,
      active: true,
      dateCreated: date
    }),
    req.body.password,
    (err, user) => {
      if (err) res.status(500).jsonp({ error: `Erro no registo: ${err}`})
      else {
        passport.authenticate("local")(req, res, () => {
          jwt.sign({
            username: user.username,
            level: user.level,
            sub: "Projeto EngWeb2025"
          },
          "EngWeb2025",
          {expiresIn: 3600},
          (e, token) => {
            if (e) res.status(500).jsonp({ error: `Erro na geração do token: ${e}` })
            else res.status(201).jsonp({ token: token })
          })
        })
      }
    })
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  if (!req.user.active) return res.status(403).jsonp({ error: 'Conta inativa. Contacte o administrador.' });
  jwt.sign({
    username: req.user.username,
    level: req.user.level,
    sub: "Projeto EngWeb2025"
  },
  "EngWeb2025",
  {expiresIn: 3600},
  (e, token) => {
    if (e) res.status(500).jsonp({ error: `Erro na geração do token: ${e}` })
    else res.status(201).jsonp({ token: token })
  })
});

router.put('/account/:id', Auth.validateUser, async function(req, res) {
  try {
    if (req.body.password) {
      await User.updateUserPassword(req.params.id, req.body.password);
    }
    if (req.body.active!=null) {
      await User.updateUserStatus(req.params.id, req.body.active);
    }
    return res.status(201).send({ message: 'Atualização bem sucedida.' });
  } catch (err) {
    return res.status(500).send({ error: 'Erro ao atualizar conta.' });
  }
});

router.put('/:id', Auth.validateAdmin, function(req, res) {
  User.updateUser(req.params.id, req.body)
    .then(data => { res.jsonp(data) })
    .catch(err => { res.render('error', { error: err, message: `Erro na atualização do utilizador` }) })
});

router.put('/:id/desativar', Auth.validateAdmin, function(req, res) {
  User.updateUser(req.params.id, false)
    .then(data => { res.jsonp(data) })
    .catch(err => { res.render('error', { error: err, message: `Erro na atualização do utilizador` }) })
});

router.put('/:id/ativar', Auth.validateAdmin, function(req, res) {
  User.updateUser(req.params.id, true)
    .then(data => { res.jsonp(data) })
    .catch(err => { res.render('error', { error: err, message: `Erro na atualização do utilizador` }) })
});

router.put('/:id/password', Auth.validateAdmin, function(req, res) {
  User.updateUserPassword(req.params.id, req.body)
    .then(data => { res.jsonp(data) })
    .catch(err => { res.render('error', { error: err, message: `Erro na atualização do utilizador` }) })
});

router.delete('/:id', Auth.validateAdmin, function(req, res) {
  User.deleteUser(req.params.id)
    .then(data => { res.jsonp(data) })
    .catch(err => { res.render('error', { error: err, message: `Erro na remoção do utilizador` }) })
});

module.exports = router;
