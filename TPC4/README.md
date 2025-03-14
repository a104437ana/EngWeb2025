# TPC4 : App de Filmes do Cinema
## Data
- 14/03/2025
## Autor
- **Nome:** Ana Sá Oliveira
- **Número:** A104437
- **Fotografia:**
  
![Fotografia](../Fotografia.jpg)

## Resumo
### Objetivos
Neste trabalho pretende-se criar um serviço sobre o dataset de filmes servido pelo json-server. Devemos utilizar a framework Express. A Aplicação de Filmes do Cinema deve ter:

- **Página Inicial**;
- **Página de Listagem de Filmes**, que contém uma tabela com as seguintes colunas: ano, título, elenco (lista de atores), género (lista de géneros) e operações (botão para editar e outro para apagar um filme) e também contém um botão para adicionar um novo filme;
- **Formulário de Criação de um Filme**;
- **Formulário de Alteração de um Filme**, apresentando inicialmente os valores atuais do filme;
- **Página de Consulta de Ator**, com a lista dos filmes em que participou.
- **Página depois de Apagar Filme** com as informações do filme apagado.
- **Página de Filme** onde podemos ver as informações daquele filme.

### Resolução
Em primeiro lugar, descarreguei o ficheiro ``cinema.json``, que tinha uma lista de filmes. No entanto, o json-server está à espera de um objeto principal e não de uma lista.
Assim, com o programa ``dataset.py``, criei um objeto que iria conter a tal lista de filmes, para assim podermos usar o json-server. Também percebi que os filmes não tinham campo ``ìd``. O que parecia identificar os filmes era o seu título (campo ``title``). No entanto,
com o programa ``dataset.py`` logo percebi que vários filmes tinham o mesmo título. Os restantos campos era óbvio que também não podiam ser usados como identificador (vários filmes podem partilhar o mesmo ano, elenco ou género). Assim, ainda com o programa ``dataset.py``, criei eu um campo ``id`` para identificar cada filme.
```
python3 dataset.py
```
Em segundo lugar, gerei o projeto Express com Pug usando o comando:
```
npx express-generator --view=pug appCinema
```
Isso criou automaticamente a estrutura do projeto dentro da pasta ``appCinema``, incluindo os arquivos e diretórios necessários, como:

- bin/ - Contém o arquivo www, responsável por iniciar o servidor.
- public/ - Pasta para arquivos estáticos como CSS, imagens e scripts JS.
- routes/ - Define as rotas da aplicação (index.js, users.js).
- views/ - Armazena os templates Pug.
- app.js - Arquivo principal da aplicação, onde o Express é configurado.

Após isso, entrei no diretório do projeto:
```
cd appCinema
```
Em terceiro lugar, instalei todas as dependências necessárias usando:
```
npm install
```
Esse comando baixou e configurou automaticamente os pacotes listados no package.json, garantindo que tudo funcionasse corretamente.

Em quarto lugar, comecei a alterar o projeto base, conforme necessário.

Primeiro, no ficheiro www da pasta bin, alterei a porta do serviço de 3000 para
2510 (3000 já será usado pelo json-server). Ainda alterei também a função onListening consoante o meu gosto.

Depois alterei o ficheiro app.js conforme necessário. Retirei tudo relacionado a "cookie parser" e "users" que ainda não vamos usar. Consequentemente eliminei na pasta routes, o ficheiro users.js.

Para finalizar, coloquei na pasta public, na pasta stylesheets, o ficheiro w3.css e retirei o outro ficheiro que estava lá antes.

Depois, adicionei ao index.js o modulo axios e tentei compilar. Não resultou, logo tive que instalar a biblioteca **axios** para fazer requisições HTTP e adicionei a dependência ao projeto com o comando:
```
npm install axios --save
```
Por fim, construi o que foi necessário para ter a Aplicação de Filmes do Cinema a funcionar.

### Testes
Para testar este trabalho, primeiro corremos o seguinte comando, para obtermos o ficheiro JSON
corrigido:
```
python3 dataset.py
```
Depois, podemos começar por inicializar um servidor API RESTful
usando o **json-server**, que irá ler e fornecer dados a partir do ficheiro
**db.json**, permitindo realizar operações de CRUD sobre esses dados.
O comando a ser utilizado é:
```
json-server --watch db.json
```
Por padrão, o json-server inicia o servidor na porta 3000 e tive isso em conta ao fazer o programa.

Depois, noutro terminal, entramos nesta pasta:
```
cd appCinema
```
E por fim, vamos executar o seguinte comando para executar o outro servidor na porta 2510:
```
npm start
```
Depois é so abrir um navegador web e inserir o URL: http://localhost:2510

Depois, podemos pressionar `Ctrl + F5` para forçar o navegador a recarregar a página e a baixar a versão mais recente de todos os arquivos do site, ignorando o cache. Fazemos isto, para garantir que vai aparecer o ícone, o **icon.png**.

Depois podemos explorar o website e rapidamente percebemos que eu cumpri todos os requisitos deste trabalho de casa:
- **Página Inicial**: http://localhost:2510/
- **Página de Listagem de Filmes**: http://localhost:2510/filmes
- **Formulário de Criação de um Filme**: http://localhost:2510/filmes/adicionar
- **Formulário de Alteração de um Filme**, por exemplo: http://localhost:2510/filmes/editar/4331
- **Página de Consulta de Ator**, por exemplo: http://localhost:2510/filmes/ator/Lin%20Shaye
- **Página de Filme**, por exemplo: http://localhost:2510/filmes/4331
- **Página depois de Apagar Filme**, por exemplo: http://localhost:2510/filmes/apagar/4331

## Resultados
### Ficheiros resultantes deste trabalho

- O dataset dado pelo professor com os filmes: [cinema.json](cinema.json)
- O programa em Python que trata o dataset anterior: [dataset.py](dataset.py)
- O dataset resultante do programa anterior: [db.json](db.json)
- O ficheiro [appCinema/bin/www](appCinema/bin/www)
- O ficheiro [appCinema/public/images/icon.png](appCinema/public/images/icon.png)
- O ficheiro [appCinema/public/stylesheets/w3.css](appCinema/public/stylesheets/w3.css)
- O ficheiro [appCinema/routes/index.js](appCinema/routes/index.js)
- O ficheiro [appCinema/views/adiconar.pug](appCinema/views/adicionar.pug)
- O ficheiro [appCinema/views/apagar.pug](appCinema/views/adicionar.pug)
- O ficheiro [appCinema/views/ator.pug](appCinema/views/adicionar.pug)
- O ficheiro [appCinema/views/editar.pug](appCinema/views/adicionar.pug)
- O ficheiro [appCinema/views/error.pug](appCinema/views/adicionar.pug)
- O ficheiro [appCinema/views/filme.pug](appCinema/views/adicionar.pug)
- O ficheiro [appCinema/views/filmes.pug](appCinema/views/adicionar.pug)
- O ficheiro [appCinema/views/index.pug](appCinema/views/adicionar.pug)
- O ficheiro [appCinema/views/layout.pug](appCinema/views/adicionar.pug)
- O ficheiro [appCinema/app.js](appCinema/app.js)
- O ficheiro [appCinema/package-lock.json](appCinema/package-lock.json)
- O ficheiro [appCinema/package.json](appCinema/package.json)
- O manifesto que está a ler neste momento: [README.md](README.md)

A pasta **node_modules** não está incluida neste repositório, tal como o professor pediu.