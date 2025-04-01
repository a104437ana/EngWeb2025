var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/', function(req, res, next) {
  var date = new Date().toLocaleString('pt-PT', { hour12: false });
  axios.get('http://localhost:17000/books')
      .then(resp => {
        res.status(200).render("livros", {title: "Livros", date: date, livros: resp.data});
      })
      .catch(error => {
        console.log(error);
        res.status(500).render('error',{title: "Erro", date: date, error: error});
      })
});

router.get('/:id', function(req, res, next) {
  var date = new Date().toLocaleString('pt-PT', { hour12: false });
  axios.get('http://localhost:17000/books/' + req.params.id)
      .then(resp => {
        res.status(200).render("livro", {title: "Livro de id " + req.params.id, date: date, livro: resp.data});
      })
      .catch(error => {
        console.log(error);
        res.status(500).render('error',{title: "Erro", date: date, error: error});
      })
});

router.get('/entidades/:idAutor', function(req, res, next) {
  var date = new Date().toLocaleString('pt-PT', { hour12: false });
  axios.get('http://localhost:17000/books/')
      .then(resp => {
        let l = resp.data.filter(livro => 
          livro.author.includes(req.params.idAutor)
        );
        res.status(200).render("autor", {title: "Autor " + req.params.idAutor, date: date, livros: l, autor: req.params.idAutor});
      })
      .catch(error => {
        console.log(error);
        res.status(500).render('error',{title: "Erro", date: date, error: error});
      })
});

module.exports = router;
