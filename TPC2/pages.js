
export function genMainPage() {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset = "UTF-8"/>
            <title>Escola de Música</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
            <link rel="icon" type="image/x-icon" href="/favicon.ico">
        </head>
        <body>
            <div class = "w3-card-4">
                <div class="w3-bar w3-pale-red">
                    <a href="/" class="w3-bar-item w3-button"> > Página Principal</a>
                </div>
                <header class="w3-container w3-pink">
                    <h1>Consultas</h1>
                </header>

                <div class ="w3-container">
                    <ul class = "w3-ul">
                        <li>
                            <a href="/alunos">Lista de Alunos</a>
                        </li>
                        <li>
                            <a href="/cursos">Lista de Cursos</a>
                        </li>
                        <li>
                            <a href="/instrumentos">Lista de Instrumentos</a>
                        </li>
                    </ul>
                </div>

                <footer class="w3-container w3-pink">
                    <h5> Escola de Música </h5>
                </footer>

            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function genAlunosPage(alunos,objeto) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset = "UTF-8"/>
            <title>Lista de Alunos</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
            <link rel="icon" type="image/x-icon" href="/favicon.ico">
        </head>
        <body>
            <div class = "w3-card-4">
                <div class="w3-bar w3-pale-red">
                    <a href="/" class="w3-bar-item w3-button"> > Página Principal</a>`

                    
                if (objeto == null) {
                    pagHTML += `<a href="/alunos" class="w3-bar-item w3-button"> > Listar os Alunos</a>
                                </div>
                                <header class="w3-container w3-pink">
                                <h1>Lista de Alunos</h1>`
                }
                else if ("designacao" in objeto){
                    pagHTML += `<a href="/cursos" class="w3-bar-item w3-button"> > Listar os Cursos</a>
                                <a href="/cursos/${objeto.id}" class="w3-bar-item w3-button"> > Informações do ${objeto.designacao} (${objeto.id})</a>
                                </div>
                                <header class="w3-container w3-pink">
                                <h1>Lista de Alunos do <b>${objeto.designacao}</b> (${objeto.id}) com duração de ${objeto.duracao} anos</h1>`
                }
                else {
                    pagHTML += `<a href="/instrumentos" class="w3-bar-item w3-button"> > Listar os Instrumentos</a>
                                <a href="/instrumentos/${objeto.id}" class="w3-bar-item w3-button"> > Informações do Instrumento ${objeto["#text"]} (${objeto.id})</a>
                                </div>
                                <header class="w3-container w3-pink">
                                <h1>Lista de Alunos que tocam <b>${objeto["#text"]}</b> (${objeto.id})</h1>`
                }
                pagHTML += `</header>

                <div class ="w3-container">
                    <table class = "w3-table-all w3-hoverable">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Data de nascimento</th>
                        <th>Curso</th>
                        <th>Ano do Curso</th>
                        <th>Instrumento</th>
                    </tr>
                    </thead>
                    ` 
                    alunos.forEach(a => {
                        pagHTML += `
                        <tr onclick="window.location.href='/alunos/${a.id}'">
                            <td>${a.id}</td>
                            <td>${a.nome}</td>
                            <td>${a.dataNasc}</td>
                            <td>${a.curso}</td>
                            <td>${a.anoCurso}</td>
                            <td>${a.instrumento}</td>
                        </tr>
                        `
                    })
    pagHTML += 
                    `
                    </table>
                </div>`
                if (alunos.length == 0) {
                    pagHTML += `<div class="w3-panel w3-pale-red">
  <p>Não há alunos!</p>
</div>`
                }

            pagHTML += `<footer class="w3-container w3-pink">
                    <h5> Escola de Música </h5>
                </footer>

            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function genCursosPage(cursos) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset = "UTF-8"/>
            <title>Lista de Cursos</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
            <link rel="icon" type="image/x-icon" href="/favicon.ico">
        </head>
        <body>
            <div class = "w3-card-4">
            <div class="w3-bar w3-pale-red">
                    <a href="/" class="w3-bar-item w3-button"> > Página Principal</a>
                    <a href="/cursos" class="w3-bar-item w3-button"> > Listar os Cursos</a>
                </div>
                <header class="w3-container w3-pink">
                    <h1>Lista de Cursos</h1>
                </header>

                <div class ="w3-container">
                    <table class = "w3-table-all w3-hoverable">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Designação</th>
                        <th>Duração</th>
                        <th>Id do Instrumento</th>
                        <th>Nome do Instrumento</th>
                    </tr>
                    </thead>
                    ` 
                    cursos.forEach(c => {
                        pagHTML += `
                        <tr onclick="window.location.href='/cursos/${c.id}'">
                            <td>${c.id}</td>
                            <td>${c.designacao}</td>
                            <td>${c.duracao}</td>
                            <td>${c.instrumento.id}</td>
                            <td>${c.instrumento["#text"]}</td>
                        </tr>
                        `
                    })
    pagHTML += 
                    `
                    </table>
                </div>

                <footer class="w3-container w3-pink">
                    <h5> Escola de Música </h5>
                </footer>

            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function genInstrumentosPage(instrumentos) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset = "UTF-8"/>
            <title>Lista de Instrumentos</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
            <link rel="icon" type="image/x-icon" href="/favicon.ico">
        </head>
        <body>
            <div class = "w3-card-4">
                <div class="w3-bar w3-pale-red">
                    <a href="/" class="w3-bar-item w3-button"> > Página Principal</a>
                    <a href="/instrumentos" class="w3-bar-item w3-button"> > Listar os Instrumentos</a>
                </div>
                <header class="w3-container w3-pink">
                    <h1>Lista de Instrumentos</h1>
                </header>

                <div class ="w3-container">
                    <table class = "w3-table-all w3-hoverable">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                    </tr>
                    </thead>
                    ` 
                    instrumentos.forEach(i => {
                        pagHTML += `
                        <tr onclick="window.location.href='/instrumentos/${i.id}'">
                            <td>${i.id}</td>
                            <td>${i["#text"]}</td>
                        </tr>
                        `
                    })
    pagHTML += 
                    `
                    </table>
                </div>

                <footer class="w3-container w3-pink">
                    <h5> Escola de Música </h5>
                </footer>

            </div>
        </body>
    </html>
    `
    return pagHTML
}


export function genAlunoPage(aluno) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset = "UTF-8"/>
            <title>Informações do Aluno</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
            <link rel="icon" type="image/x-icon" href="/favicon.ico">
        </head>
        <body>
            <div class = "w3-card-4">
                <div class="w3-bar w3-pale-red">
                    <a href="/" class="w3-bar-item w3-button"> > Página Principal</a>
                    <a href="/alunos" class="w3-bar-item w3-button"> > Listar os Alunos</a>
                    <a href="/alunos/${aluno.id}" class="w3-bar-item w3-button"> > Informações do Aluno ${aluno.id}</a>
                </div>

                <header class="w3-container w3-pink">
                    <h1>Informações do Aluno ${aluno.id}</h1>
                </header>

                <div class ="w3-container">
                    <p><b>Id:</b> ${aluno.id}</p>
                    <p><b>Nome:</b> ${aluno.nome}</p>
                    <p><b>Data de Nascimento:</b> ${aluno.dataNasc}</p>
                    <p><b>Curso:</b> ${aluno.curso}</p>
                    <p><b>Ano do Curso:</b> ${aluno.anoCurso}</p>
                    <p><b>Instrumento:</b> ${aluno.instrumento}</p>
                </div>

                <footer class="w3-container w3-pink">
                    <h5> Escola de Música </h5>
                </footer>

            </div>
        </body>
    </html>
    `
    return pagHTML
}