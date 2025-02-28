# TPC3 : App de Gestão de Alunos
## Data
- 28/02/2025
## Autor
- **Nome:** Ana Sá Oliveira
- **Número:** A104437
- **Fotografia:**
  
![Fotografia](../Fotografia.jpg)

## Resumo
### Objetivos
Neste trabalho pretende-se criar um serviço sobre o dataset de alunos servido pelo json-server. Devemos utilizar o módulo axios para fazer pedidos GET, POST, PUT e DELETE. A Aplicação de Gestão de Alunos deve ter:

- Página de Listagem de Alunos;
- Página de Consulta de Aluno;
- Formulário de Criação de um Aluno;
- Formulário de Alteração de um Aluno;
- Botão para Apagar um Aluno.

### Resolução
Em primeiro lugar, descarreguei o material dado pelo professor para fazermos este projeto.

Em segundo lugar, alterei o ficheiro **alunos.csv** conforme o necessário (adicionei um cabeçalho adequado) e criei um JSON a partir dele para o utilizar com o json-server. Para isso, desenvolvi o programa **csv_to_json.py** em Python. Após executá-lo, obtive o ficheiro **alunos.json**.
```
python3 csv_to_json.py
```
Em terceiro lugar, inicializei um novo projeto Node.js e criei o ficheiro **package.json** com o comando:
```
npm init
```
Em quarto lugar, instalei a biblioteca **axios** para fazer requisições HTTP e adicionei a dependência ao projeto com o comando:
```
npm install axios --save
```
Em quinto lugar, finalizei os ficheiros **alunos_server_skeleton.js** e **templates.js**. O ficheiro **alunos_server_skeleton.js** é responsável por iniciar o servidor na porta 7777 e lidar com as requisições e respostas HTTP, servindo as páginas web solicitadas pelos clientes. Já o ficheiro **templates.js** é encarregado de gerar as páginas web, incluindo o HTML e o CSS necessários.

### Testes
Para testar este trabalho, podemos começar por inicializar um servidor API RESTful
usando o **json-server**, que irá ler e fornecer dados a partir do ficheiro
**alunos.json**, permitindo realizar operações de CRUD sobre esses dados.
O comando a ser utilizado é:
```
json-server --watch alunos.json
```
Por padrão, o json-server inicia o servidor na porta 3000 e tive isso em conta ao fazer o programa **alunos_server_skeleton.js**.

Depois, noutro terminal, vamos executar o programa em JavaScript **alunos_server_skeleton.js** com o Node.js,
para executar o outro servidor na porta 7777:
```
node alunos_server_skeleton.js
```
Depois é so abrir um navegador web e inserir o URL: http://localhost:7777

Depois, podemos pressionar `Ctrl + F5` para forçar o navegador a recarregar a página e a baixar a versão mais recente de todos os arquivos do site, ignorando o cache. Fazemos isto, para garantir que vai aparecer o ícone, o **favicon.png**.

Depois podemos explorar o website e rapidamente percebemos que eu cumpri todos os requisitos deste trabalho de casa:
- Página de Listagem de Alunos: http://localhost:7777/ ou http://localhost:7777/alunos
- Página de Consulta de Aluno, por exemplo, http://localhost:7777/alunos/A97455
- Formulário de Criação de um Aluno: http://localhost:7777/alunos/registo
- Formulário de Alteração de um Aluno, por exemplo, http://localhost:7777/alunos/edit/A94015
- Poder Apagar um Aluno, por exemplo, http://localhost:7777/alunos/delete/A96208

## Resultados
### Ficheiros resultantes deste trabalho
- Ficheiros dados pelo professor e alterados por mim quando necessário:
  - A pasta [public](public) com os ficheiros que podem ser acedidos diretamente pelo navegador (ícones e ficheiros de estilo) e outros
  - O dataset dos alunos em CSV: [alunos.csv](alunos.csv)
  - O programa em JavaScript que lida com ficheiros públicos: [static.js](static.js)
  - O programa em JavaScript que gera páginas web: [templates.js](templates.js)
  - O programa em JavaScript que inicializa o servidor: [alunos_server_skeleton.js](alunos_server_skeleton.js)
- O dataset dos alunos em JSON: [alunos.json](alunos.json)
- O programa em Python que criou o JSON apartir do CSV: [csv_to_json.py](csv_to_json.py)
- O manifesto que está a ler neste momento: [README.md](README.md)
- Os ficheiros resultantes de criar um projeto em Node.js:
  - [package.json](package.json)
- Os ficheiros e pasta resultantes de instalar a biblioteca axios:
  - O ficheiro [package-lock.json](package-lock.json)
  - A pasta [node_modules](node_modules) que contém mais ficheiros necessários