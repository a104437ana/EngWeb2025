var express = require('express');
var router = express.Router();
var axios = require('axios');
var path = require('path');
const session = require('express-session');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs')
const FormData = require('form-data');

function now() {
  return new Date().toLocaleString('pt-PT', { hour12: false });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  delete req.session.currentDiary;
  var date = now();
  const errorMsg = req.session.searchError;
  delete req.session.searchError;
  res.render('home',{title: "O Meu Eu Digital", date: date, role: req.session.level, username: req.session.user, error: errorMsg});
});

router.get('/myAccount', function(req, res, next) {
  if(req.session.user){
    var date = now();
    axios.get(`http://localhost:3002/users/${req.session.user}`, {
      headers: {
        Authorization: `Bearer ${req.session.token}`
      }
    }).then(resp => {
      res.render('editarConta',{title: "Editar Conta", date: date, user: resp.data.data, role: req.session.level, username: req.session.user, token: req.session.token});
    }).catch(function (error) {
      res.render('error',{title: "Erro", date: date, message : "Erro ao ler utilizador", error: error});
    });
  }
  else{
    res.redirect("/");
  }
});

router.post('/myAccount', function(req, res, next) {
  var date = now();
  req.body.user = req.session.user;
  req.body.token = req.session.token;
  axios.put(`http://localhost:3002/users/account/${req.session.user}`, req.body, {
    headers: {
      Authorization: `Bearer ${req.session.token}`
    }
  }).then(resp => {
    res.redirect('/');
  }).catch(function (error) {
    res.render('error',{title: "Erro", date: date, message : "Erro ao editar utilizador", error: error});
  });
});

router.get('/administration/stats', function(req, res, next) {
  var date = now();
  axios.get(`http://localhost:3001/upload/stats`, {
    headers: {
      Authorization: `Bearer ${req.session.token}`
    }
  }).then(resp => {
    res.render('stats',{title: "Estatísticas", date: date, stats : resp.data, role: req.session.level, username: req.session.user, token: req.session.token});
  }).catch(function (error) {
    res.render('error',{title: "Erro", date: date, message : "Erro ao ler estatísticas", error: error});
  });
});

// formulário registar utilizador
router.get('/administration/users/register', function(req, res, next) {
  var date = now();
  res.render('registarUser',{title: "Adicionar Item", date: date, role: req.session.level, username: req.session.user});
});

// post do formulário de registo
router.post('/administration/users/register', function(req, res, next) {
  var date = now();
  req.body.user = req.session.user;
  req.body.token = req.session.token;
  axios.post('http://localhost:3002/users', req.body, {
    headers: {
      Authorization: `Bearer ${req.session.token}`
    }
  }).then(resp => {
    res.redirect('/administration/users');
  }).catch(function (error) {
    res.render('error',{title: "Erro", date: date, message : "Erro ao registar utilizador", error: error});
  });
});

// formulário editar utilizador
router.get('/administration/users/edit/:id', function(req, res, next) {
  var date = now();
  axios.get(`http://localhost:3002/users/${req.params.id}`, {
    headers: {
      Authorization: `Bearer ${req.session.token}`
    }
  }).then(resp => {
    res.render('editarUser',{title: "Editar Utilizador", date: date, user: resp.data.data, role: req.session.level, username: req.session.user, token: req.session.token});
  }).catch(function (error) {
    res.render('error',{title: "Erro", date: date, message : "Erro ao ler utilizador", error: error});
  });
});

// post do formulário de editar utilizador
router.post('/administration/users/edit/:id', function(req, res, next) {
  var date = now();
  req.body.user = req.session.user;
  req.body.token = req.session.token;
  console.log(req.body)
  axios.put(`http://localhost:3002/users/${req.params.id}`, req.body, {
    headers: {
      Authorization: `Bearer ${req.session.token}`
    }
  }).then(resp => {
    res.redirect('/administration/users');
  }).catch(function (error) {
    res.render('error',{title: "Erro", date: date, message : "Erro ao editar utilizador", error: error});
  });
});

// eliminar utilizador
router.get('/administration/users/remove/:id', function(req, res, next) {
  axios.delete(`http://localhost:3002/users/${req.params.id}`, {
    headers: {
      Authorization: `Bearer ${req.session.token}`
    }
  }).then(resp => {
    res.redirect('/administration/users');
  }).catch(function (error) {
    res.render('error',{title: "Erro", date: date, message : "Erro ao editar utilizador", error: error});
  });
});

// listagem de utilizadores
router.get('/administration/users', function(req, res, next) {
  var date = now();
  axios.get(`http://localhost:3002/users`, {
    headers: {
      Authorization: `Bearer ${req.session.token}`
    }
  }).then(resp => {
    resp.data.data.forEach(e => e.formatted_dateCreated = new Date(e.dateCreated).toLocaleString('pt-PT', { hour12: false }));
    res.render('users',{title: "Utilizadores", users: resp.data.data, date: date, role: req.session.level, username: req.session.user});
  }).catch(function (error) {
    res.render('error',{title: "Erro", date: date, message : "Não foi possível aceder à página", error: error});
  });
});

router.get('/file/:id', async (req, res) => {
  const fileId = req.params.id;
  const token = req.session.token;
  try {
    const axiosConfig = {
      responseType: 'stream',
      headers: {}
    };
    if (token) {
      axiosConfig.headers.Authorization = `Bearer ${token}`;
    }
    const axiosResponse = await axios.get(`http://localhost:3001/file/${fileId}`, axiosConfig);
    res.setHeader('Content-Type', axiosResponse.headers['content-type']);
    axiosResponse.data.pipe(res);
  } catch (err) {
    console.error('Erro ao obter ficheiro:', err.message);
    res.status(500).send('Erro ao obter ficheiro');
  }
});

router.get('/users', async (req, res) => {
  const user = req.query.user;
  if (!user) {
    return res.redirect('/');
  }
  else if (user == req.session.user){
    return res.redirect('/myDiary');
  }
  var date = now();
  const exists = await axios.get(`http://localhost:3002/users/exists/${user}`);
  if(exists.data.data==true){
    req.session.currentDiary = user;
    axios.get(`http://localhost:3001/upload/diary/${user}`, {
      headers: {
        Authorization: `Bearer ${req.session.token}`
      }
    }).then(resp => {
      resp.data.forEach(e => e.formatted_date = new Date(e.upload_date).toLocaleString('pt-PT', { hour12: false }));
      res.render('diary',{title: `Diário de ${user}`, date: date, diary: resp.data, role: req.session.level, username: req.session.user, user:user});
    }).catch(function (error) {
      res.render('error',{title: "Erro", date: date, message : "Erro ao ler o diário", error: error});
    });
  }
  else{
    req.session.searchError = "Utilizador não existe";
    return res.redirect('/');
  }
});

router.get('/myDiary', function(req, res, next) {
  if(req.session.user){
    req.session.currentDiary = req.session.user;
    var date = now();
    axios.get(`http://localhost:3001/upload/diary/${req.session.user}`, {
      headers: {
        Authorization: `Bearer ${req.session.token}`
      }
    }).then(resp => {
      resp.data.forEach(e => e.formatted_date = new Date(e.upload_date).toLocaleString('pt-PT', { hour12: false }));
      res.render('myDiary',{title: "O Meu Diário", date: date, diary: resp.data, role: req.session.level, username: req.session.user});
    }).catch(function (error) {
      res.render('error',{title: "Erro", date: date, message : "Erro ao ler o diário", error: error});
    });
  }
  else{
    res.redirect("/");
  }
});

router.get('/uploads/download/:id', async function(req, res, next) {
  const uploadId = req.params.id;
  const token = req.session.token;
  try {
    const axiosConfig = {
      responseType: 'stream',
      headers: {}
    };
    if (token) {
      axiosConfig.headers.Authorization = `Bearer ${token}`;
    }
    const axiosResponse = await axios.get(`http://localhost:3001/upload/download/${uploadId}`, axiosConfig);
    res.setHeader('Content-Type', axiosResponse.headers['content-type']);
    axiosResponse.data.pipe(res);
  } catch (err) {
    console.error('Erro ao obter o upload:', err.message);
    res.status(500).send('Erro ao obter o upload');
  }
});

router.get('/uploads/delete/:id', function(req, res, next) {
  var date = now();
  axios.delete(`http://localhost:3001/upload/${req.params.id}`, {
    headers: {
      Authorization: `Bearer ${req.session.token}`
    }
  }).then(resp => {
    if(req.session.level == 1){
      res.redirect(`/users?user=${req.session.currentDiary}`)
    }
    else{
      res.redirect(`/myDiary`)
    }
  }).catch(function (error) {
    res.render('error',{title: "Erro", date: date, message : "Erro ao apagar o upload", error: error});
  });
});


router.get('/uploads/edit/:id', function(req, res, next) {
  var date = now();
  axios.get(`http://localhost:3001/upload/${req.params.id}`, {
    headers: {
      Authorization: `Bearer ${req.session.token}`
    }
  }).then(resp => {
    resp.data.formatted_date = new Date(resp.data.upload_date).toLocaleString('pt-PT', { hour12: false });
    res.render('editar',{title: "Editar Item", upload: resp.data, date: date, role: req.session.level, username: req.session.user});
  }).catch(function (error) {
    res.render('error',{title: "Erro", date: date, message : "Erro ao ler o upload", error: error});
  });
});

function parseFilesFromBody(body, files, newFiles) {
  const result = [];
  const fileMap = {};
  if (files) {
    for (const f of files) {
      var match;
      if(newFiles){
        f.fieldname.match(/^newFiles\[(\d+)\]\[file]$/);
      }
      else{
        match = f.fieldname.match(/^files\[(\d+)]\[file]$/);
      }
      if (match) {
        const index = parseInt(match[1]);
        fileMap[index] = f;
      }
    }
  }
  Object.keys(body).forEach(key => {
    var match;
    if(newFiles){
      match = key.match(/^newFiles\[(\d+)]\[(\w+)]$/);
    }
    else{
      match = key.match(/^files\[(\d+)]\[(\w+)]$/);
    }
    if (match) {
      const index = parseInt(match[1]);
      const prop = match[2];
      if (!result[index]) result[index] = {};
      result[index][prop] = body[key];
    }
  });
  for (const index in fileMap) {
    if (!result[index]) result[index] = {};
    result[index].file = fileMap[index];
  }
  return result;
}


router.post('/uploads/edit/:id', upload.any(), async function(req, res, next) {
  var date = now();
  try {
    let filesData = [];
    if (req.body.files && Array.isArray(req.body.files)) {
      filesData = req.body.files;
    } else {
      filesData = parseFilesFromBody(req.body, req.files);
    }
    await axios.put(`http://localhost:3001/upload/${req.params.id}`, {
      description: req.body.description,
      public: req.body.public === 'true' || req.body.public === true,
      user: req.session.user,
      token: req.session.token,
      files: filesData.map(f => ({
        id: f.id,
        title: f.title,
        tags: f.tags,
        delete: f.delete
      }))
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${req.session.token}`
      }
    });
    for (const file of req.files) {
      const match = file.fieldname.match(/files\[(\d+)\]\[file\]/);
      if (match) {
        const index = parseInt(match[1], 10);
        if (filesData[index]) {
          filesData[index].file = file;
        }
      }
    }
    for (const file of filesData) {
      if (file.file) {
        const formData = new FormData();
        const filePath = path.resolve(file.file.path);
        const fileBuffer = fs.readFileSync(filePath);
        formData.append('file', fileBuffer, file.file.originalname);
        await axios.put(`http://localhost:3001/file/${file.id}`, formData, {
          headers: {
            ...formData.getHeaders(),
            Authorization: `Bearer ${req.session.token}`
          }
        });
        fs.unlink(filePath, (err) => {
        });
      }
        }
    let newFiles = [];

    if (req.body.newFiles && Array.isArray(req.body.newFiles)) {
      newFiles = req.body.newFiles;
    } else {
      newFiles = parseFilesFromBody(req.body, req.files, true); 
    }
    for (const file of req.files) {
      const match = file.fieldname.match(/newFiles\[(\d+)\]\[file\]/);
      if (match) {
        const index = parseInt(match[1], 10);
        if (newFiles[index]) {
          newFiles[index].file = file;
        }
      }
    }
    for (const file of newFiles) {
      if (file.file) {
        const formData = new FormData();
        const filePath = path.resolve(file.file.path);
        const fileBuffer = fs.readFileSync(filePath);
        formData.append('file', fileBuffer, file.file.originalname);
        formData.append('title', String(file.title || ''));
        formData.append('tags', JSON.stringify(file.tags || []));
        formData.append('public', String(req.body.public === 'true' || req.body.public === true));
        await axios.put(`http://localhost:3001/upload/addFile/${req.params.id}`, formData, {
          headers: {
            ...formData.getHeaders(),
            Authorization: `Bearer ${req.session.token}`
          }
        });
        fs.unlink(filePath, (err) => {
        });
      }
    }
    if (req.session.level == 1) {
      res.redirect(`/users?user=${req.session.currentDiary}`);
    } else {
      res.redirect(`/myDiary`);
    }
  } catch (error) {
    res.render('error', {
      title: "Erro",
      date,
      message: "Erro ao editar o upload",
      error
    });
  }
});

router.get('/uploads/:id', function(req, res, next) {
  var date = now();
  axios.get(`http://localhost:3001/upload/${req.params.id}`, {
    headers: {
      Authorization: `Bearer ${req.session.token}`
    }
  }).then(resp => {
    resp.data.formatted_date = new Date(resp.data.upload_date).toLocaleString('pt-PT', { hour12: false });
    res.render('upload',{title: resp.data.description, date: date, upload: resp.data, role: req.session.level, username: req.session.user, token: req.session.token});
  }).catch(function (error) {
    res.render('error',{title: "Erro", date: date, message : "Erro ao ler o upload", error: error});
  });
});

router.get('/registar', function(req, res, next) {
  var date = now();
  res.render('registar',{title: "Adicionar Item", date: date, role: req.session.level, username: req.session.user});
});


router.post('/registar', upload.single('ficheiro'), async function(req, res, next) {
  const date = now();
  if (!req.file || !req.file.path) {
    return res.render('error', {
      title: "Erro",
      date: date,
      message: "Ficheiro não foi recebido corretamente.",
      error: {}
    });
  }
  const formData = new FormData();
  formData.append('user', req.session.user);
  formData.append('token', req.session.token);
  formData.append('ficheiro', fs.createReadStream(req.file.path), req.file.originalname);
  try {
    await axios.post('http://localhost:3001/upload/', formData, {
      headers: {
        ...formData.getHeaders(),
        Authorization: `Bearer ${req.session.token}`
      }
    });
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error('Erro ao apagar ficheiro temporário:', err);
      } else {
        console.log('Ficheiro temporário apagado com sucesso:', req.file.path);
      }
    });
    res.redirect('/myDiary');
  } catch (error) {
    res.render('error', {
      title: "Erro",
      date: date,
      message: "Erro ao fazer upload",
      error: error
    });
  }
});


router.get('/logout', function(req, res, next) {
  delete req.session.user;
  delete req.session.level;
  delete req.session.token;
  delete req.session.currentDiary;
  res.redirect('/');
});

router.get('/login', function(req, res, next) {
  if(req.session.user){
    return res.redirect("/");
  }
  var date = now();
  const errorMsg = req.session.loginError;
  delete req.session.loginError;
  res.render('login',{title: "Log in", date: date, error: errorMsg});
});

router.post('/login', function(req, res, next) {
  axios.get(`http://localhost:3002/users/admins`).then(resp1 => {
    var admins = resp1.data.data
    if(admins.includes(req.body.username)){
      req.body.level = 1;
    }
    else{
      req.body.level = 0;
    }
    axios.post(`http://localhost:3002/users/login`, req.body).then(resp => {
      req.session.user = req.body.username;
      req.session.level = req.body.level;
      req.session.token = resp.data.token;
      res.redirect('/');
    }).catch(function (error) {
      req.session.loginError = "Erro no login: " + (error.response?.data?.message || error.response?.data?.error || "Tente novamente.");
      res.redirect('/login');
    });
  }).catch(function (error) {
      req.session.loginError = "Erro no login: " + (error.response?.data?.message || error.response?.data?.error || "Tente novamente.");
      res.redirect('/login');
  })
});

router.get('/signup', function(req, res, next) {
  if(req.session.user){
    return res.redirect("/");
  }
  var date = now();
  const errorMsg = req.session.signupError;
  delete req.session.signupError;
  res.render('signup', {title: "Sign up", date: date, error: errorMsg });
});

router.post('/signup', function(req, res, next) {
  axios.post(`http://localhost:3002/users/`, req.body).then(resp => {
    req.session.user = req.body.username;
    req.session.level = 0;
    req.session.token = resp.data.token;
    res.redirect('/')
  }).catch(function (error) {
    req.session.signupError = "Erro ao criar utilizador: " + (error.response?.data?.message || "Tente novamente.");
    res.redirect('/signup');
  });
});

module.exports = router;
