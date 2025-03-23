var express = require('express');
var router = express.Router();
var Aluno = require('../controllers/alunos')

router.post('/', function(req, res, next) {
  Aluno.insert(req.body)
  .then(data => res.status(201).jsonp(data))
  .catch(erro => res.status(500).jsonp(erro))
});

router.get('/', function(req, res, next) {
  Aluno.list()
  .then(data => res.status(200).jsonp(data))
  .catch(erro => res.status(500).jsonp(erro))
});

router.get('/:id', function(req, res, next) {
  Aluno.findById(req.params.id,req.body)
  .then(data => res.status(200).jsonp(data))
  .catch(erro => res.status(500).jsonp(erro))
});

router.put('/:id', function(req, res, next) {
  Aluno.update(req.params.id, req.body)
  .then(data => res.status(200).jsonp(data))
  .catch(erro => res.status(500).jsonp(erro))
});

router.delete('/:id', function(req, res, next) {
  Aluno.delete(req.params.id)
  .then(data => res.status(200).jsonp(data))
  .catch(erro => res.status(500).jsonp(erro))
});

module.exports = router;
