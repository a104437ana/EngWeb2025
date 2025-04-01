var express = require('express');
var router = express.Router();
var Book = require('../controllers/books')

router.post('/', function(req, res, next) {
  Book.insert(req.body)
  .then(data => res.status(201).jsonp(data))
  .catch(erro => res.status(500).jsonp(erro))
});

router.get('/', function(req, res, next) {
  if (req.query.character) {
    Book.listCharacter(req.query.character)
  .then(data => res.status(200).jsonp(data))
  .catch(erro => res.status(500).jsonp(erro))
  }
  else if (req.query.genre) {
    Book.listGenre(req.query.genre)
  .then(data => res.status(200).jsonp(data))
  .catch(erro => res.status(500).jsonp(erro))
  }
  else {
    Book.list()
  .then(data => res.status(200).jsonp(data))
  .catch(erro => res.status(500).jsonp(erro))
  }
});

router.get('/genres', function(req, res, next) {
  Book.genres()
  .then(data => res.status(200).jsonp(data))
  .catch(erro => res.status(500).jsonp(erro))
});

router.get('/characters', function(req, res, next) {
  Book.characters()
  .then(data => res.status(200).jsonp(data))
  .catch(erro => res.status(500).jsonp(erro))
});

router.get('/:id', function(req, res, next) {
  Book.findById(req.params.id)
  .then(data => res.status(200).jsonp(data))
  .catch(erro => res.status(500).jsonp(erro))
});

router.put('/:id', function(req, res, next) {
  Book.update(req.params.id, req.body)
  .then(data => res.status(200).jsonp(data))
  .catch(erro => res.status(500).jsonp(erro))
});

router.delete('/:id', function(req, res, next) {
  Book.delete(req.params.id)
  .then(data => res.status(200).jsonp(data))
  .catch(erro => res.status(500).jsonp(erro))
});

module.exports = router;
