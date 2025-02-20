# TPC2 : Escola de Música
## Data
- 20/02/2025
## Autor
- **Nome:** Ana Sá Oliveira
- **Número:** A104437
- **Fotografia:**
  
![Fotografia](../Fotografia.jpg)

## Resumo
### Objetivos
Neste trabalho pretende-se construir um serviço em nodejs, que consuma a API de dados servida pelo json-server da escola de música (implementada na segunda aula teórica) e sirva um website com as seguintes caraterísticas:

- Página principal: Listar alunos, Listar Cursos, Listar Instrumentos;

- Página de alunos: Tabela com a informação dos alunos (clicando numa linha deve saltar-se para a página de aluno);

- Página de cursos: Tabela com a informação dos cursos (clicando numa linha deve saltar-se para a página do curso onde deverá aparecer a lista de alunos a frequentá-lo);

- Página de instrumentos: Tabela com a informação dos instrumentos (clicando numa linha deve saltar-se para a página do instrumento onde deverá aparecer a lista de alunos que o tocam).

### Resolução
Em primeiro lugar, coloquei o **db.json** nesta pasta e criei os ficheiros **server.js** e **pages.js**.

Em segundo lugar, inicializei um novo projeto Node.js e criei o ficheiro **package.json** com o comando:
```
npm init
```
Em terceiro lugar, instalei a biblioteca **axios** para fazer requisições HTTP e adicionei a dependência ao projeto com o comando:
```
npm install axios --save
```
Em quarto lugar, finalizei os ficheiros **server.js** e **pages.js**. O ficheiro **server.js** é responsável por iniciar o servidor na porta 1234 e lidar com as requisições e respostas HTTP, servindo as páginas web solicitadas pelos clientes. Já o ficheiro **pages.js** é encarregado de gerar as páginas web, incluindo o HTML e o CSS necessários.

Adicionalmente, inclui o ficheiro **w3.css** na pasta, o que permite aprimorar o estilo visual das páginas. Também adicionei o ficheiro **favicon.ico** para garantir que o ícone desejado apareça nas abas do navegador.

Por fim, desenvolvi todas as páginas web solicitadas no trabalho de casa, cumprindo todos os requisitos propostos.

### Testes
Para testar este trabalho, podemos começar por inicializar um servidor API RESTful
usando o **json-server**, que irá ler e fornecer dados a partir do ficheiro
**db.json**, permitindo realizar operações de CRUD sobre esses dados.
O comando a ser utilizado é:
```
json-server --watch db.json
```
Por padrão, o json-server inicia o servidor na porta 3000 e tive isso em conta ao fazer o programa **server.js**.

Depois, noutro terminal, vamos executar o programa em JavaScript **server.js** com o Node.js,
para executar o outro servidor na porta 1234:
```
node server.js
```
Depois é so abrir um navegador web e inserir o URL: http://localhost:1234

Depois, podemos pressionar `Ctrl + F5` para forçar o navegador a recarregar a página e a baixar a versão mais recente de todos os arquivos do site, ignorando o cache. Fazemos isto, para garantir que vai aparecer o ícone, o **favicon.ico**.

Depois podemos explorar o website e rapidamente percebemos que eu cumpri todos os requisitos deste trabalho de casa:
- Página principal: http://localhost:1234
- Página de alunos: http://localhost:1234/alunos
- Página de cursos: http://localhost:1234/cursos
- Página de instrumentos: http://localhost:1234/instrumentos
- E ainda as páginas apenas de um aluno, de um curso (com a lista dos seus alunos) e de um instrumento (com a lista dos seus alunos)
## Resultados
### Ficheiros resultantes deste trabalho
- O dataset da escola de música dado inicialmente pelo professor: [db.json](db.json)
- O programa em JavaScript que inicializa o servidor: [server.js](server.js)
- O programa em JavaScript que gera páginas web: [pages.js](pages.js)
- A imagem do ícone que aparece nas abas do navegador: [favicon.ico](favicon.ico)
- O ficheiro que permitiu melhorar o estilo das páginas: [w3.css](w3.css)
- O manifesto que está a ler neste momento: [README.md](README.md)
- Os ficheiros resultantes de criar um projeto em Node.js:
  - [package.json](package.json)
- Os ficheiros e pasta resultantes de instalar a biblioteca axios:
  - O ficheiro [package-lock.json](package-lock.json)
  - A pasta [node_modules](node_modules) que contém mais ficheiros necessários