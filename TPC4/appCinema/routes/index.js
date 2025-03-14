var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  res.status(200).render('index', { title: 'Cinema' , 'date' : date});
});

router.get('/filmes', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/filmes?_sort=year&_order=desc')
    .then(resp => {
      res.status(200).render('filmes', { title: 'Cinema - Lista de Filmes ' , date : date, filmes : resp.data});
    })
    .catch(error => {
      console.log(error);
      res.status(500).render('error',{title: 'Erro', date : date, error: error})
    })
});

router.get('/filmes/adicionar', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  res.status(200).render('adicionar',{title:'Cinema - Adicionar Filme', date: date})
});

router.post('/filmes/adicionar', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  const title = req.body.title;
  const year = Number(req.body.year);
  const cast = req.body.cast.split(',').map(actor => actor.trim());
  const genres = req.body.genres.split(',').map(genre => genre.trim());
  const result = {
      title: title,
      year: year,
      cast: cast,
      genres: genres
  };
  let regex = /^\s*$/;
  if (!genres || !cast || cast.includes("") || genres.includes("") || cast.some(item => regex.test(item)) || genres.some(item => regex.test(item))) {
    res.status(200).render('adicionar',{title:'Cinema - Adicionar Filme', date: date, e : 'O elenco e o género teem de ser válidos...'})
  }
  else {
    axios.post('http://localhost:3000/filmes', result)
    .then(resp => {
      console.log(result)
      res.status(201).redirect('/filmes')
    }).catch(error => {
      console.log(error);
      res.status(500).render("error", {title: 'Erro', date : date, error: error})
    })
  }
});

router.get('/filmes/apagar/:id', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  var id = req.params.id;
  axios.get(`http://localhost:3000/filmes/${id}`)
    .then(resp => {
      axios.delete(`http://localhost:3000/filmes/${id}`)
        .then(respp => {
          res.status(200).render('apagar', { title: 'Cinema - Filme Apagado com Sucesso ' , date : date, f : resp.data});
        })
        .catch(error => {
          console.log(error);
          res.status(500).render('error',{title: 'Erro', date : date, error: error})
        })
    })
    .catch(error => {
      console.log(error);
      res.status(500).render('error',{title: 'Erro', date : date, error: error})
    })
});

router.get('/filmes/:id', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  var id = req.params.id;
  axios.get(`http://localhost:3000/filmes/${id}`)
    .then(resp => {
      res.status(200).render('filme', { title: 'Cinema - Filme e suas Informações ' , date : date, f : resp.data});
    })
    .catch(error => {
      console.log(error);
      res.status(500).render('error',{title: 'Erro', date : date, error: error})
    })
});

router.get('/filmes/editar/:id', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  var id = req.params.id;
  axios.get(`http://localhost:3000/filmes/${id}`)
    .then(resp => {
      const title = resp.data.title;
      const year = Number(resp.data.year);
      const cast = resp.data.cast.join(", ");
      const genres = resp.data.genres.join(", ");
      const result = {
          title: title,
          year: year,
          cast: cast,
          genres: genres
      };
      console.log(result)
      res.status(200).render('editar',{title:'Cinema - Editar Filme', date: date, f : result})
    })
    .catch(error => {
      console.log(error);
      res.status(500).render('error',{title: 'Erro', date : date, error: error})
    })
});

router.get('/filmes/ator/:id', async function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  var a = decodeURIComponent(req.params.id);
  axios.get(`http://localhost:3000/filmes`)
    .then(resp => {
      let filmesFiltrados = Array.isArray(resp.data) 
      ? resp.data.filter(filme =>
      filme.cast && filme.cast.includes(a)) : [];
      res.status(200).render('ator', { title: 'Cinema - Ator e seus Filmes ' , date : date, filmes : filmesFiltrados, a : a});
    })
    .catch(error => {
      console.log(error);
      res.status(500).render("error", {title: 'Erro', date : date, error: error})
    })
});

router.post('/filmes/editar/:id', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  var id = req.params.id;
  const title = req.body.title;
  const year = Number(req.body.year);
  const cast = req.body.cast.split(',').map(actor => actor.trim());
  const genres = req.body.genres.split(',').map(genre => genre.trim());
  const result = {
      title: title,
      year: year,
      cast: cast,
      genres: genres
  };
  let regex = /^\s*$/;
  if (!genres || !cast || cast.includes("") || genres.includes("") || cast.some(item => regex.test(item)) || genres.some(item => regex.test(item))) {
    res.status(200).redirect(`/filmes/editar/${id}`)
  } else {
    axios.put(`http://localhost:3000/filmes/${id}`, result)
    .then(resp => {
      console.log(result)
      res.status(200).redirect('/filmes')
    }).catch(error => {
      console.log(error);
      res.status(500).render("error", {title: 'Erro', date : date, error: error})
    })
  }
});

module.exports = router;
