# TPC5 : Criação de uma App para gerir alunos com dois serviços: api de dados e front-end
## Data
- 23/03/2025
## Autor
- **Nome:** Ana Sá Oliveira
- **Número:** A104437
- **Fotografia:**
  
![Fotografia](../Fotografia.jpg)

## Resumo
### Objetivos
Neste trabalho pretende-se criar uma App para gerir alunos com dois serviços: api de dados e front-end;
1. API de dados: aplicação em nodejs que recebe pedidos REST, interage com o MongoDB para obter os dados e responde em JSON;
2. Front-end: aplicação em nodejs que responde com uma interface web (templates PUG) a pedidos do utilizador (sempre que precisar de dados pede-os à API de dados).

Nota: ambos os serviços podem ser prototipados com o express e desenvolvidos a partir daí. No caso da API de dados não serão desenvolvidas views.

### Resolução

#### Tratamento do dataset e MongoDB
Em primeiro lugar, fui buscar o ficheiro **alunos.json** do TPC3, que contém alunos e suas informações. Como agora vamos usar MongoDB então alterei o campo "id" para "_id" e fiz um array de objetos, neste caso de alunos, usando o que tinhamos no ficheiro **alunos.json**, porque o MongoDB aceita arrays de objetos.
Assim, fiz o programa em Python **dataset.py** que faz isto. Depois executei o programa e obtive o ficheiro **db_alunos.json**:
```
python3 dataset.py
```
Depois executei os seguintes comandos para colocar tudo isto no MongoDB:

Iniciar o meu container Docker:
```
sudo docker start a828ec4bc4de
```
Copiar o **db_alunos.json** para o container:
```
sudo docker cp db_alunos.json mongoEW:/tmp
```
Acessar o terminal do container:
```
sudo docker exec -it mongoEW sh
```
Importar o **db_alunos.json** para o MongoDB:
```
mongoimport -d alunosdb -c alunos /tmp/db_alunos.json --jsonArray
```
Depois sai:
```
exit
```
#### API de dados

Depois de tratar do MongoDB, fui gerar o projeto Express com Pug do serviço da API de dados, usando o comando:
```
npx express-generator --view=pug API_de_dados
```
Isso criou automaticamente a estrutura do projeto dentro da pasta ``API_de_dados``.

Após isso, entrei no diretório do projeto:
```
cd API_de_dados
```
Depois instalei dependências:
```
npm i
```
Depois instalei o Mongoose para começar a usar com o MongoDB:
```
npm install mongoose
```
Por fim, comecei a alterar o projeto base. Em resumo, implementei a ligação ao MongoDB, defini data models do MongoDB, defini controllers e defini routes.

Assim, consegui desenvolver uma API de dados, uma aplicação em nodejs que recebe pedidos REST, interage com o MongoDB para obter os dados e responde em JSON.

Esta API de dados responde na porta **3000**.

#### Front-end
Primeiro, saí da pasta do projeto da API de dados:
```
cd ..
```
Tal como na API de dados, gerei um projeto Express mas agora para o Front-end:
```
npx express-generator --view=pug Front-end
```
Isso criou automaticamente a estrutura do projeto dentro da pasta ``Front-end``.

Após isso, entrei no diretório do projeto:
```
cd Front-end
```
Depois instalei dependências:
```
npm i
```
Depois instalei o axious:
```
npm install axios --save
```
Por fim, comecei a alterar o projeto base. Em resumo, defini routes e as views (fiz a forma e o estilo das páginas da aplicação com Pug).

Assim, consegui desenvolver o front-end, uma aplicação em nodejs que responde com uma interface web (templates PUG) a pedidos do utilizador (sempre que precisar de dados pede-os à API de dados).

Este serviço responde na porta **3001**.

Este serviço pode responder com as seguintes páginas, dependendo dos pedidos do utilizador:
- **Página de Listagem de Alunos**:
  - Tem uma tabela de alunos com as colunas Número, Nome, GitLink, TPCs feitos, Rácio de TPCs, Teste e Trabalho e ainda uma coluna de Operações com os botões de editar e apagar.
  - Tem um botão para registar alunos novos.
- **Página de Consulta de Aluno**:
  - Tem uma lista de informações do aluno (número, nome, gitlink, TPCs feitos e rácio dos TPCs, nota do teste e do trabalho).
  - Tem botões de editar e apagar esse aluno.
- **Formulário de Criação de um Aluno**:
  - Tem caixas de texto para colocar o número, nome, gitlink, nota do teste e do trabalho do aluno.
  - Tem também checkboxes para os TPCs.
  - Este formulário está inicialmente vazio.
- **Formulário de Alteração de um Aluno**:
   - Tem caixas de texto para editar o nome, gitlink, nota do teste e do trabalho do aluno.
  - Tem também checkboxes para os TPCs.
  - Este formulário inicialmente está preenchido com a informação atual deste aluno.
- **Página que aparece após Apagar um Aluno**:
  - Após apagarmos um aluno, vamos para esta página que lista as informações do aluno apagado (número, nome, gitlink, TPCs feitos e rácio dos TPCs, nota do teste e do trabalho).

Concluindo, construi o que foi necessário para ter a Aplicação de Alunos a funcionar.

### Testes
Para testar este trabalho, primeiro corremos o seguinte comando, para obtermos o ficheiro JSON corrigido, o **db_alunos.json**:
```
python3 dataset.py
```
Depois executamos os seguintes comandos para colocar tudo isto no MongoDB:

Iniciar o meu container Docker:
```
sudo docker start a828ec4bc4de
```
Copiar o **db_alunos.json** para o container:
```
sudo docker cp db_alunos.json mongoEW:/tmp
```
Acessar o terminal do container:
```
sudo docker exec -it mongoEW sh
```
Importar o **db_alunos.json** para o MongoDB:
```
mongoimport -d alunosdb -c alunos /tmp/db_alunos.json --jsonArray
```
Depois sair:
```
exit
```
Depois entramos nesta pasta:
```
cd API_de_dados
```
Depois vamos executar o seguinte comando para executar o serviço que responde na porta 3000, a API de dados:
```
npm start
```
Depois, noutro terminal, entramos nesta pasta:
```
cd Front-end
```
Depois vamos executar o seguinte comando para executar o serviço que responde na porta 3001, o Front-end:
```
npm start
```
Depois é so abrir um navegador web e inserir o URL: http://localhost:3001/alunos

Depois, podemos pressionar `Ctrl + F5` para forçar o navegador a recarregar a página e a baixar a versão mais recente de todos os arquivos do site, ignorando o cache. Fazemos isto, para garantir que vai aparecer o ícone, o **aluno.png**.

Depois podemos explorar o website e rapidamente percebemos que eu cumpri todos os requisitos deste trabalho de casa:
- **Página de Listagem de Alunos**: http://localhost:3001/alunos
- **Página de Consulta de um Aluno**, por exemplo: http://localhost:3001/alunos/A100615
- **Formulário de Criação de um Aluno**: http://localhost:3001/alunos/registar
- **Formulário de Alteração de um Aluno**, por exemplo: http://localhost:3001/alunos/editar/A100615
- **Página depois de Apagar Filme**, por exemplo: http://localhost:3001/alunos/apagar/A100758
## Resultados
### Ficheiros resultantes deste trabalho

- O dataset com os alunos usado no TPC3: [alunos.json](alunos.json)
- O programa em Python que trata o dataset anterior: [dataset.py](dataset.py)
- O dataset resultante do programa anterior: [db_alunos.json](db_alunos.json)
- O projeto Express com a API de dados: [API_de_dados](API_de_dados)
- O ficheiro [API_de_dados/bin/www](API_de_dados/bin/www)
  - O ficheiro [API_de_dados/controllers/alunos.json](API_de_dados/controllers/alunos.js)
  - O ficheiro [API_de_dados/models/alunos.json](API_de_dados/models/aluno.js)
  - O ficheiro [API_de_dados/routes/alunos.js](API_de_dados/routes/alunos.js)
  - O ficheiro [API_de_dados/views/error.pug](API_de_dados/views/error.pug)
  - O ficheiro [API_de_dados/views/index.pug](API_de_dados/views/index.pug)
  - O ficheiro [API_de_dados/views/layout.pug](API_de_dados/views/layout.pug)
  - O ficheiro [API_de_dados/app.js](API_de_dados/app.js)
  - O ficheiro [API_de_dados/package-lock.json](API_de_dados/package-lock.json)
  - O ficheiro [API_de_dados/package.json](API_de_dados/package.json)
- O projeto Express com o Front-end: [Front-end](Front-end)
  - O ficheiro [Front-end/bin/www](Front-end/bin/www)
  - O ficheiro [Front-end/public/images/aluno.png](Front-end/public/images/aluno.png)
  - O ficheiro [Front-end/public/stylesheets/style.css](Front-end/public/stylesheets/style.css)
  - O ficheiro [Front-end/routes/alunos.js](Front-end/routes/alunos.js)
  - O ficheiro [Front-end/views/aluno.pug](Front-end/views/aluno.pug)
  - O ficheiro [Front-end/views/alunos.pug](Front-end/views/alunos.pug)
  - O ficheiro [Front-end/views/editar.pug](Front-end/views/editar.pug)
  - O ficheiro [Front-end/views/error.pug](Front-end/views/error.pug)
  - O ficheiro [Front-end/views/layout.pug](Front-end/views/layout.pug)
  - O ficheiro [Front-end/views/registar.pug](Front-end/views/registar.pug)
  - O ficheiro [Front-end/app.js](Front-end/app.js)
  - O ficheiro [Front-end/package-lock.json](Front-end/package-lock.json)
  - O ficheiro [Front-end/package.json](Front-end/package.json)
- O manifesto que está a ler neste momento: [README.md](README.md)

As pastas **node_modules** de cada projeto Express não estão incluidas neste repositório, tal como o professor pediu.