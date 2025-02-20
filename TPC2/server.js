const { createServer } = require("http");
const axios = require("axios");
const { genMainPage, genAlunosPage, genCursosPage, genInstrumentosPage, genAlunoPage} = require("./pages.js");
const { readFile } = require("fs");

createServer((req,res) => {
    var d = new Date().toISOString().substring(0,15)
    console.log("METHOD: " + req.method)
    console.log("URL: " + req.url)
    console.log("TIME: " + d)
    console.log("--------------")
    switch(req.method) {
        case "GET":
            if (req.url == "/") {
                res.writeHead(200, {'Content-Type' : 'text/html;charset=utf8'})
                res.write(genMainPage())
                res.end()
            }
            else if (req.url == "/alunos") {
                axios.get("http://localhost:3000/alunos?_sort=nome")
                    .then(resp => {
                        var alunos = resp.data
                        res.writeHead(200, {'Content-Type' : 'text/html;charset=utf8'})
                        res.write(genAlunosPage(alunos,null))
                        res.end()
                    })
                    .catch(err => {
                        res.writeHead(500, {'Content-Type' : 'text/html;charset=utf8'})
                        console.log(err)
                        res.end()
                    })
            }
            else if (req.url == "/cursos") {
                axios.get("http://localhost:3000/cursos?_sort=id")
                    .then(resp => {
                        var cursos = resp.data
                        res.writeHead(200, {'Content-Type' : 'text/html;charset=utf8'})
                        res.write(genCursosPage(cursos))
                        res.end()
                    })
                    .catch(err => {
                        res.writeHead(500, {'Content-Type' : 'text/html;charset=utf8'})
                        console.log(err)
                        res.end()
                    })
            }
            else if (req.url == "/instrumentos") {
                axios.get("http://localhost:3000/instrumentos?_sort=#text")
                    .then(resp => {
                        var instrumentos = resp.data
                        res.writeHead(200, {'Content-Type' : 'text/html;charset=utf8'})
                        res.write(genInstrumentosPage(instrumentos))
                        res.end()
                    })
                    .catch(err => {
                        res.writeHead(500, {'Content-Type' : 'text/html;charset=utf8'})
                        console.log(err)
                        res.end()
                    })
            }
            else if(req.url.match(/w3\.css$/)){
                readFile("w3.css", function(erro, dados){
                    if(erro){
                        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end('<p>Erro na leitura do ficheiro: ' + erro + '</p>')
                    }
                    else{
                        res.writeHead(200, {'Content-Type': 'text/css'})
                        res.end(dados)
                    }
                })
            }
            else if (req.url.match(/favicon\.ico$/)) {
                readFile("favicon.ico", function(erro, dados) {
                    if (erro) {
                        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end('<p>Erro na leitura do ficheiro: ' + req.url + '</p>')
                        res.end()
                    }
                    else {
                        res.writeHead(200, {'Content-Type': 'image/x-icon'})
                        res.end(dados)
                    }
                })
            }
            else if (req.url.match(/\/alunos\/.+/)) {
                var id = req.url.split("/")[2]
                axios.get(`http://localhost:3000/alunos/${id}`)
                    .then(resp => {
                        var aluno = resp.data
                        res.writeHead(200, {'Content-Type' : 'text/html;charset=utf8'})
                        res.write(genAlunoPage(aluno))
                        res.end()
                    })
                    .catch(err => {
                        if (err.response && err.response.status === 404) {
                            res.writeHead(404, {'Content-Type' : 'text/html;charset=utf8'})
                            console.log(err)
                            res.end()
                        }
                        else {
                            res.writeHead(500, {'Content-Type' : 'text/html;charset=utf8'})
                            console.log(err)
                            res.end()
                        }
                    })
            }
            else if (req.url.match(/\/instrumentos\/.+/)) {
                var id = req.url.split("/")[2]
                axios.get(`http://localhost:3000/instrumentos/${id}`)
                    .then(resp => {
                        var instrumento = resp.data
                        axios.get(`http://localhost:3000/alunos?instrumento=`+instrumento["#text"])
                            .then(respo => {
                                var alunos = respo.data
                                res.writeHead(200, {'Content-Type' : 'text/html;charset=utf8'})
                                res.write(genAlunosPage(alunos,instrumento))
                                res.end()
                            })
                            .catch(err => {
                                res.writeHead(500, {'Content-Type' : 'text/html;charset=utf8'})
                                console.log(err)
                                res.end()
                            })
                    })
                    .catch(err => {
                        if (err.response && err.response.status === 404) {
                            res.writeHead(404, {'Content-Type' : 'text/html;charset=utf8'})
                            console.log(err)
                            res.end()
                        }
                        else {
                            res.writeHead(500, {'Content-Type' : 'text/html;charset=utf8'})
                            console.log(err)
                            res.end()
                        }
                    })
            }
            else if (req.url.match(/\/cursos\/.+/)) {
                var id = req.url.split("/")[2]
                axios.get(`http://localhost:3000/cursos/${id}`)
                    .then(resp => {
                        var curso = resp.data
                        axios.get(`http://localhost:3000/alunos?curso=`+curso.id)
                            .then(respo => {
                                var alunos = respo.data
                                res.writeHead(200, {'Content-Type' : 'text/html;charset=utf8'})
                                res.write(genAlunosPage(alunos,curso))
                                res.end()
                            })
                            .catch(err => {
                                res.writeHead(500, {'Content-Type' : 'text/html;charset=utf8'})
                                console.log(err)
                                res.end()
                            })
                    })
                    .catch(err => {
                        if (err.response && err.response.status === 404) {
                            res.writeHead(404, {'Content-Type' : 'text/html;charset=utf8'})
                            console.log(err)
                            res.end()
                        }
                        else {
                            res.writeHead(500, {'Content-Type' : 'text/html;charset=utf8'})
                            console.log(err)
                            res.end()
                        }
                    })
            }
            else {
                res.writeHead(404, {'Content-Type' : 'text/html;charset=utf8'})
                console.log("erro 404")
                res.end()
            }
            break;
        default:
            res.writeHead(405, {'Content-Type' : 'text/html;charset=utf-8'})
            res.end()
            break;
    }
}).listen(1234)

console.log("Servidor à escuta na porta 1234...")