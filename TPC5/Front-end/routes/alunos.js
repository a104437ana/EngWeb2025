var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/', function(req, res, next) {
  var date = new Date().toLocaleString('pt-PT', { hour12: false });
  axios.get('http://localhost:3000/alunos')
      .then(resp => {
        res.status(200).render("alunos", {title: "Alunos", date: date, alunos: resp.data});
      })
      .catch(error => {
        console.log(error);
        res.status(500).render('error',{title: "Erro", date: date, error: error});
      })
});

router.get('/registar', function(req, res, next) {
  var date = new Date().toLocaleString('pt-PT', { hour12: false });
  res.status(200).render("registar", {title: "Registar Aluno", date: date})
})

router.post('/registar', function(req, res, next) {
  var date = new Date().toLocaleString('pt-PT', { hour12: false });
  axios.post('http://localhost:3000/alunos', req.body)
      .then(resp => {
        res.status(201).redirect('/alunos');
      })
      .catch(error => {
        console.log(error);
        res.status(500).render('error',{title: "Erro", date: date, error: error});
      })
});

router.get('/apagar/:id', function(req, res, next) {
  var date = new Date().toLocaleString('pt-PT', { hour12: false });
  axios.delete('http://localhost:3000/alunos/' + req.params.id)
      .then(resp => {
        res.status(200).render("aluno", {title: "Apagar Aluno " + req.params.id, date: date, aluno: resp.data});
      })
      .catch(error => {
        console.log(error);
        res.status(500).render('error',{title: "Erro", date: date, error: error});
      })
});

router.get('/editar/:id', function(req, res, next) {
  var date = new Date().toLocaleString('pt-PT', { hour12: false });
  axios.get('http://localhost:3000/alunos/' + req.params.id)
      .then(resp => {
        res.status(200).render("editar", {title: "Editar Aluno " + req.params.id, date: date, aluno: resp.data});
      })
      .catch(error => {
        console.log(error);
        res.status(500).render('error',{title: "Erro", date: date, error: error});
      })
});

router.post('/editar/:id', function(req, res, next) {
  var date = new Date().toLocaleString('pt-PT', { hour12: false });
  axios.put('http://localhost:3000/alunos/' + req.params.id, req.body)
      .then(resp => {
        res.status(200).redirect('/alunos');
      })
      .catch(error => {
        console.log(error);
        res.status(500).render('error',{title: "Erro", date: date, error: error});
      })
});

router.get('/:id', function(req, res, next) {
  var date = new Date().toLocaleString('pt-PT', { hour12: false });
  axios.get('http://localhost:3000/alunos/' + req.params.id)
      .then(resp => {
        res.status(200).render("aluno", {title: "Aluno " + req.params.id, date: date, aluno: resp.data});
      })
      .catch(error => {
        console.log(error);
        res.status(500).render('error',{title: "Erro", date: date, error: error});
      })
});

module.exports = router;
