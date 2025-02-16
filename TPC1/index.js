const http = require('http')
const axios = require('axios')

http.createServer((req,res) => {
    console.log("METHOD: " + req.method)
    console.log("URL: " + req.url)
    switch(req.method) {
        case "GET":
            if (req.url == "/") {
                res.writeHead(200, {'Content-Type' : 'text/html;charset=utf8'})
                res.write("<h1>Página Inicial:</h1>")
                res.write("<ul><li><a href='/reparacoes'>Listar Reparações</a></li><li><a href='/intervencoes'>Listar Intervenções</a></li><li><a href='/veiculos'>Listar Veículos</a></li><li><a href='/marcas'>Listar Marcas e Modelos dos Veículos Intervencionados</a></li></ul>")
                res.end()
            }
            else if (req.url == "/reparacoes") {
                axios.get("http://localhost:3000/reparacoes?_sort=data&_order=desc")
                    .then(resp => {
                        var reparacoes = resp.data
                        res.writeHead(200, {'Content-Type' : 'text/html;charset=utf8'})
                        res.write("<html><head><meta charset='utf-8'><style>table {width:100%;border-collapse: collapse;}thead {background-color: pink;}th, td {padding: 8px;border: 1px solid black;}tr:hover td {background-color: #f2f2f2;}</style></head><body><p><a href='/'>Voltar para a Página Inicial</a><h1>Reparações:</h1></p>")
                        res.write("<table><thead><tr><th>Nif do cliente</th><th>Nome do cliente</th><th>Data</th><th>Marca do veículo</th><th>Modelo do veículo</th><th>Número de intervenções</th></tr></thead><tbody>")
                        reparacoes.forEach(e => {
                            res.write(`<tr onclick="window.location.href='/reparacoes/${e.id}'"><td>${e.id}</td></td><td>${e.nome}</td><td>${e.data}</td><td>${e.viatura.marca}</td><td>${e.viatura.modelo}</td><td>${e.nr_intervencoes}</td></tr>`)
                        });
                        res.write("</tbody></table></body></html>")
                        res.end()
                    })
                    .catch(err => {
                        res.writeHead(500, {'Content-Type' : 'text/html;charset=utf8'})
                        console.log(err)
                        res.end()
                    })
            }
            else if (req.url == "/intervencoes") {
                axios.get("http://localhost:3000/intervencoes?_sort=id")
                    .then(resp => {
                        var intervencoes = resp.data
                        res.writeHead(200, {'Content-Type' : 'text/html;charset=utf8'})
                        res.write("<html><head><meta charset='utf-8'><style>table {width:100%;border-collapse: collapse;}thead {background-color: pink;}th, td {padding: 8px;border: 1px solid black;}tr:hover td {background-color: #f2f2f2;}</style></head><body><p><a href='/'>Voltar para a Página Inicial</a><h1>Intervenções:</h1></p>")
                        res.write("<table><thead><tr><th>Código</th><th>Nome</th><th>Descrição</th></tr></thead><tbody>")
                        intervencoes.forEach(e => {
                            res.write(`<tr onclick="window.location.href='/intervencoes/${e.id}'"><td>${e.id}</td></td><td>${e.nome}</td><td>${e.descricao}</td></tr>`)
                        });
                        res.write("</tbody></table></body></html>")
                        res.end()
                    })
                    .catch(err => {
                        res.writeHead(500, {'Content-Type' : 'text/html;charset=utf8'})
                        console.log(err)
                        res.end()
                    })
            }
            else if (req.url == "/veiculos") {
                axios.get("http://localhost:3000/veiculos?_sort=marca,modelo")
                    .then(resp => {
                        var veiculos = resp.data
                        res.writeHead(200, {'Content-Type' : 'text/html;charset=utf8'})
                        res.write("<html><head><meta charset='utf-8'><style>table {width:100%;border-collapse: collapse;}thead {background-color: pink;}th, td {padding: 8px;border: 1px solid black;}tr:hover td {background-color: #f2f2f2;}</style></head><body><p><a href='/'>Voltar para a Página Inicial</a><h1>Veículos:</h1></p>")
                        res.write("<table><thead><tr><th>Matricula</th><th>Marca</th><th>Modelo</th></tr></thead><tbody>")
                        veiculos.forEach(e => {
                            res.write(`<tr onclick="window.location.href='/veiculos/${e.id}'"><td>${e.id}</td></td><td>${e.marca}</td><td>${e.modelo}</td></tr>`)
                        });
                        res.write("</tbody></table></body></html>")
                        res.end()
                    })
                    .catch(err => {
                        res.writeHead(500, {'Content-Type' : 'text/html;charset=utf8'})
                        console.log(err)
                        res.end()
                    })
            }
            else if (req.url == "/marcas") {
                axios.get("http://localhost:3000/veiculos")
                    .then(resp => {
                        var veiculos = resp.data
                        res.writeHead(200, {'Content-Type' : 'text/html;charset=utf8'})
                        res.write("<html><head><meta charset='utf-8'><style>table {width:100%;border-collapse: collapse;}thead {background-color: pink;}th, td {padding: 8px;border: 1px solid black;}tr:hover td {background-color: #f2f2f2;}</style></head><body><p><a href='/'>Voltar para a Página Inicial</a><h1>Marcas e Modelos dos veículos:</h1></p>")
                        res.write("<table><thead><tr><th>Marca</th><th>Modelo</th><th>Número de veículos</th></tr></thead><tbody>")
                        let contagem = {};
                        veiculos.forEach(veiculo => {
                            if (!contagem[veiculo.marca]) {
                                contagem[veiculo.marca] = {};
                            }
                            if (contagem[veiculo.marca][veiculo.modelo]) {
                                contagem[veiculo.marca][veiculo.modelo]++;
                            } else {
                                contagem[veiculo.marca][veiculo.modelo] = 1;
                            }
                        });
                        let marcasOrdenadas = Object.keys(contagem).sort();
                        marcasOrdenadas.forEach(marca => {
                            let modelosOrdenados = Object.keys(contagem[marca]).sort();
                            modelosOrdenados.forEach(modelo => {
                                res.write(`<tr onclick="window.location.href='/marcas/${marca}/${modelo}'"><td>${marca}</td></td><td>${modelo}</td><td>${contagem[marca][modelo]}</td></tr>`)
                            });
                        });
                        res.write("</tbody></table></body></html>")
                        res.end()
                    })
                    .catch(err => {
                        res.writeHead(500, {'Content-Type' : 'text/html;charset=utf8'})
                        console.log(err)
                        res.end()
                    })
            }
            else if (req.url.match(/\/reparacoes\/.+/)) {
                var id = req.url.split("/")[2]
                axios.get(`http://localhost:3000/reparacoes/${id}`)
                    .then(resp => {
                        var reparacao = resp.data
                        res.writeHead(200, {'Content-Type' : 'text/html;charset=utf8'})
                        res.write('<h1>Reparação:</h1>')
                        res.write('<ul>')
                        res.write(`<li>Nif do cliente: ${reparacao.id}</li>`)
                        res.write(`<li>Nome do cliente: ${reparacao.nome}</li>`)
                        res.write(`<li>Data: ${reparacao.data}</li>`)
                        res.write(`<li>Viatura:<ul>`)
                        res.write(`<li>Matricula: <a href='/veiculos/${reparacao.viatura.id}'>${reparacao.viatura.id}</a></li>`)
                        res.write(`<li>Marca: ${reparacao.viatura.marca}</li>`)
                        res.write(`<li>Modelo: ${reparacao.viatura.modelo}</li></ul></li>`)
                        res.write(`<li>Número de intervenções: ${reparacao.nr_intervencoes}</li>`)
                        res.write('<li>Intervenções:<ol>')
                        reparacao.intervencoes.forEach(i => {
                            res.write(`<li>Código: <a href='/intervencoes/${i.id}'>${i.id}</a> | Nome: ${i.nome} | Descrição: ${i.descricao}</li>`)
                        })
                        res.write('</ol></li></ul>')
                        res.write(`<a href='/reparacoes'>Voltar para a Listagem de Reparações</a>`)
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
            else if (req.url.match(/\/intervencoes\/.+/)) {
                var id = req.url.split("/")[2]
                axios.get(`http://localhost:3000/intervencoes/${id}`)
                    .then(resp => {
                        var intervencao = resp.data
                        axios.get(`http://localhost:3000/reparacoes?_sort=id`)
                            .then(respo => {
                                var reparacoes = respo.data
                                res.writeHead(200, {'Content-Type' : 'text/html;charset=utf8'})
                                res.write('<h1>Intervenção:</h1>')
                                res.write('<ul>')
                                res.write(`<li>Código: ${intervencao.id}</li>`)
                                res.write(`<li>Nome: ${intervencao.nome}</li>`)
                                res.write(`<li>Descrição: ${intervencao.descricao}</li>`)
                                res.write('<li>Reparações onde se fez esta intervenção:<ol>')
                                reparacoes.forEach(r => {
                                    r.intervencoes.forEach(i => {
                                        if (i.id == intervencao.id) {
                                            res.write(`<li>Reparação do cliente com nif: <a href='/reparacoes/${r.id}'>${r.id}</a></li>`)
                                            return
                                        }
                                    })
                                })
                                res.write('</ol></li></ul>')
                                res.write(`<a href='/intervencoes'>Voltar para a Listagem de Intervenções</a>`)
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
            else if (req.url.match(/\/veiculos\/.+/)) {
                var id = req.url.split("/")[2]
                axios.get(`http://localhost:3000/veiculos/${id}`)
                    .then(resp => {
                        var veiculo = resp.data
                        res.writeHead(200, {'Content-Type' : 'text/html;charset=utf8'})
                        res.write('<h1>Veículo:</h1>')
                        res.write('<ul>')
                        res.write(`<li>Matricula: ${veiculo.id}</li>`)
                        res.write(`<li>Marca: ${veiculo.marca}</li>`)
                        res.write(`<li>Modelo: ${veiculo.modelo}</li>`)
                        res.write(`<li><a href='/marcas/${veiculo.marca}/${veiculo.modelo}'>Ir para a página da marca e modelo deste veículo</a></li>`)
                        res.write('</ul>')
                        res.write(`<a href='/veiculos'>Voltar para a Listagem de Veículos</a>`)
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
            else if (req.url.match(/\/marcas\/.+\/.+/)) {
                var marca = decodeURIComponent(req.url.split("/")[2]);
                var modelo = decodeURIComponent(req.url.split("/")[3]);
                axios.get(`http://localhost:3000/veiculos/`)
                    .then(resp => {
                        const matriculas = new Set();
                        var veiculos = resp.data
                        const marcasExistem = veiculos.map(v => v.marca).includes(marca);
                        const modelosExistem = veiculos.filter(v => v.marca == marca).map(v => v.modelo).includes(modelo);
                        if (marcasExistem && modelosExistem) {
                            veiculos.forEach(veiculo => {
                                if (veiculo.marca == marca) {
                                    if (veiculo.modelo == modelo) {
                                        matriculas.add(veiculo.id);
                                    }
                                }
                            });
                            res.writeHead(200, {'Content-Type' : 'text/html;charset=utf8'})
                            res.write('<h1>Marca e Modelo:</h1>')
                            res.write('<ul>')
                            res.write(`<li>Marca: ${marca}</li>`)
                            res.write(`<li>Modelo: ${modelo}</li>`)
                            res.write(`<li>Número de veículos: ${matriculas.size}</li>`)
                            res.write(`<li>Matriculas dos veículos:<ol>`)
                            matriculas.forEach(m => {
                                res.write(`<li><a href='/veiculos/${m}'>${m}</a></li>`)
                            });
                            res.write('</ol></ul>')
                            res.write(`<a href='/marcas'>Voltar para a Listagem de Marcas e Modelos</a>`)
                            res.end()
                        }
                        else {
                            res.writeHead(404, {'Content-Type' : 'text/html;charset=utf8'})
                            console.log("erro 404")
                            res.end()
                        }
                    })
                    .catch(err => {
                        res.writeHead(500, {'Content-Type' : 'text/html;charset=utf8'})
                        console.log(err)
                        res.end()
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