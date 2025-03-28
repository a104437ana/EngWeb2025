var express = require('express');
var router = express.Router();
var Contrato = require('../controllers/contratos')

router.post('/', function(req, res, next) {
  Contrato.insert(req.body)
  .then(data => res.status(201).jsonp(data))
  .catch(erro => res.status(500).jsonp(erro))
});

router.get('/', function(req, res, next) {
  if (req.query.entidade) {
    Contrato.listEntidade(req.query.entidade)
  .then(data => res.status(200).jsonp(data))
  .catch(erro => res.status(500).jsonp(erro))
  }
  else if (req.query.tipo) {
    Contrato.listTipo(req.query.tipo)
  .then(data => res.status(200).jsonp(data))
  .catch(erro => res.status(500).jsonp(erro))
  }
  else {
    Contrato.list()
  .then(data => res.status(200).jsonp(data))
  .catch(erro => res.status(500).jsonp(erro))
  }
});

router.get('/tipos', function(req, res, next) {
  Contrato.tipos()
  .then(data => res.status(200).jsonp(data))
  .catch(erro => res.status(500).jsonp(erro))
});

router.get('/entidades', function(req, res, next) {
  Contrato.entidades()
  .then(data => res.status(200).jsonp(data))
  .catch(erro => res.status(500).jsonp(erro))
});

router.get('/:id', function(req, res, next) {
  Contrato.findById(req.params.id)
  .then(data => res.status(200).jsonp(data))
  .catch(erro => res.status(500).jsonp(erro))
});

router.put('/:id', function(req, res, next) {
  Contrato.update(req.params.id, req.body)
  .then(data => res.status(200).jsonp(data))
  .catch(erro => res.status(500).jsonp(erro))
});

router.delete('/:id', function(req, res, next) {
  Contrato.delete(req.params.id)
  .then(data => res.status(200).jsonp(data))
  .catch(erro => res.status(500).jsonp(erro))
});

module.exports = router;
