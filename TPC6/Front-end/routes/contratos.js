var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/', function(req, res, next) {
  var date = new Date().toLocaleString('pt-PT', { hour12: false });
  axios.get('http://localhost:16000/contratos')
      .then(resp => {
        res.status(200).render("contratos", {title: "Contratos", date: date, contratos: resp.data});
      })
      .catch(error => {
        console.log(error);
        res.status(500).render('error',{title: "Erro", date: date, error: error});
      })
});

router.get('/:id', function(req, res, next) {
  var date = new Date().toLocaleString('pt-PT', { hour12: false });
  axios.get('http://localhost:16000/contratos/' + req.params.id)
      .then(resp => {
        res.status(200).render("contrato", {title: "Contrato " + req.params.id, date: date, contrato: resp.data});
      })
      .catch(error => {
        console.log(error);
        res.status(500).render('error',{title: "Erro", date: date, error: error});
      })
});

router.get('/entidades/:nipc', function(req, res, next) {
  var date = new Date().toLocaleString('pt-PT', { hour12: false });
  axios.get('http://localhost:16000/contratos?entidade=' + req.params.nipc)
      .then(resp => {
        res.status(200).render("entidade", {title: "Entidade " + req.params.nipc, date: date, contratos: resp.data});
      })
      .catch(error => {
        console.log(error);
        res.status(500).render('error',{title: "Erro", date: date, error: error});
      })
});

module.exports = router;
