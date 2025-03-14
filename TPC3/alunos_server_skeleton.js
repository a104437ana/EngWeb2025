// alunos_server.js
// EW2024 : 04/03/2024
// by jcr

var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates')          // Necessario criar e colocar na mesma pasta
var static = require('./static.js')             // Colocar na mesma pasta

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation

var alunosServer = http.createServer((req, res) => {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET /alunos --------------------------------------------------------------------
                if (req.url == '/' || req.url == '/alunos') {
                    axios.get('http://localhost:3000/alunos')
                        .then(resp => {
                            data = resp.data
                            res.writeHead(200,{'Content-type': 'text/html; charset=utf-8'})
                            res.write(templates.studentsListPage(data,d))
                            res.end()
                        })
                        .catch(error => {
                            console.log("Erro: " + error)
                            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.errorPage(error,d))
                            res.end()
                        })
                }
                // GET /alunos/:id --------------------------------------------------------------------
                else if (req.url.match(/\/alunos\/A\d+$/)) {
                    id = req.url.split('/')[2]
                    axios.get(`http://localhost:3000/alunos/${id}`)
                        .then(resp => {
                            data = resp.data
                            res.writeHead(200,{'Content-type': 'text/html; charset=utf-8'})
                            res.write(templates.studentPage(data,d,""))
                            res.end()
                        })
                        .catch(error => {
                            console.log("Erro: " + error)
                            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.errorPage(error,d))
                            res.end()
                        })
                }
                // GET /alunos/registo --------------------------------------------------------------------
                else if (req.url == '/alunos/registo') {
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(templates.studentFormPage(d))
                    res.end()
                }
                // GET /alunos/edit/:id --------------------------------------------------------------------
                else if (req.url.match(/\/alunos\/edit\/A\d+$/)) {
                    id = req.url.split('/')[3]
                    axios.get(`http://localhost:3000/alunos/${id}`)
                        .then(resp => {
                            data = resp.data
                            res.writeHead(200,{'Content-type': 'text/html; charset=utf-8'})
                            res.write(templates.studentFormEditPage(data,d))
                            res.end()
                        })
                        .catch(error => {
                            console.log("Erro: " + error)
                            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.errorPage(error,d))
                            res.end()
                        })
                }
                // GET /alunos/delete/:id --------------------------------------------------------------------
                else if (req.url.match(/\/alunos\/delete\/A\d+$/)) {
                    id = req.url.split('/')[3]
                    axios.get(`http://localhost:3000/alunos/${id}`)
                    .then(resp => {
                        data = resp.data
                        axios.delete(`http://localhost:3000/alunos/${id}`)
                        .then(respp => {
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.studentPage(data,d," deleted"))
                            res.end()
                        })
                        .catch(error => {
                            console.log("Erro: " + error)
                            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.errorPage(error,d))
                            res.end()
                        })
                    })
                    .catch(error => {
                        console.log("Erro: " + error)
                        res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write(templates.errorPage(error,d))
                        res.end()
                    })
                }
                // GET ? -> Lancar um erro
                else {
                    res.writeHead(404,{'Content-type': 'text/html; charset=utf-8'});
                    res.write(templates.errorPage(404,d))
                    res.end()
                }
                break
            case "POST":
                // POST /alunos/registo --------------------------------------------------------------------
                if (req.url == '/alunos/registo') {
                    collectRequestBodyData(req,result => {
                        if (result) {
                            const regex = /^A\d+$/;
                            if (regex.test(result.id)) {
                                axios.post('http://localhost:3000/alunos/',result).then(
                                    resp => {
                                        data = resp.data;
                                        res.writeHead(201,{'Content-type': 'text/html; charset=utf-8'});
                                        res.write(templates.studentPage(data,d," added"))
                                        res.end()
                                    }
                                ).catch(
                                    err => {
                                        console.log(err)
                                        res.writeHead(500,{'Content-type': 'text/html; charset=utf-8'});
                                        res.write(templates.errorPage(500,d))
                                        res.end()
                                    }
                                )
                            }
                            else {
                                console.log("Erro: Id inválido")
                                res.writeHead(500,{'Content-type': 'text/html; charset=utf-8'});
                                res.write(templates.errorPage("Id invalid",d))
                                res.end()
                            }
                        }
                        else {
                            //em caso de nao ter resultado
                            console.log("Erro: NO BODY DATA")
                            res.writeHead(500,{'Content-type': 'text/html; charset=utf-8'});
                            res.write(templates.errorPage(500,d))
                            res.end()
                        }
                    })
                }
                // POST /alunos/edit/:id --------------------------------------------------------------------
                else if (req.url.match(/\/alunos\/edit\/A\d+$/)) {
                    id = req.url.split('/')[3]
                    collectRequestBodyData(req,result => {
                        if (result) {
                            axios.put('http://localhost:3000/alunos/' + id,result).then(
                                resp => {
                                    data = resp.data;
                                    res.writeHead(200,{'Content-type': 'text/html; charset=utf-8'});
                                    res.write(templates.studentPage(data,d," edited"))
                                    res.end()
                                }
                            ).catch(
                                err => {
                                    console.log(err)
                                    res.writeHead(500,{'Content-type': 'text/html; charset=utf-8'});
                                    res.write(templates.errorPage(500,d))
                                    res.end()
                                }
                            )
                        }
                        else {
                            //em caso de nao ter resultado
                            console.log("NO BODY DATA")
                            res.writeHead(500,{'Content-type': 'text/html; charset=utf-8'});
                            res.write(templates.errorPage(500,d))
                            res.end()
                        }
                    })
                }
                // POST ? -> Lancar um erro
                else {
                    res.writeHead(404,{'Content-type': 'text/html; charset=utf-8'});
                    res.write(templates.errorPage(404,d))
                    res.end()
                }
                break
            default: 
                // Outros metodos nao sao suportados
                res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(templates.errorPage("Método não suportado: "+req.method))
                res.end()
                break
        }
    }
})

alunosServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})



