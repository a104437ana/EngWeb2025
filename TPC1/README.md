# TPC1 : A Oficina de Reparações
## Data
- 16/02/2025
## Autor
- **Nome:** Ana Sá Oliveira
- **Número:** A104437
- **Fotografia:**
  
![Fotografia](../Fotografia.jpg)

## Resumo
### Objetivos
1. Neste trabalho pretende-se construir um serviço em nodejs, que consuma a API de dados servida pelo json-server da oficina de reparações e responda com as páginas web do site.
#### O serviço deve incluir:
1. Página principal: lista de dados consultáveis;

2. Listagem das reparações: tabela de reparações com os campos data, nif, nome, marca, modelo e número de intervenções realizadas, e ordenada decrescentemente pela data;

3. Listagem dos tipos de intervenção: tabela dos tipos de intervenção com os campos código, nome e descrição, e ordenada alfabéticamente pelo código das intervenções;

4. Listagem dos veículos: tabela de veículos com os campos matricula, marca e modelo, e ordenada alfabéticamente pela marca e pelo modelo do veículo;

5. Listagem das marcas e modelos dos veículos intervencionados: tabela das marcas e modelos com os campos marca, modelo e número de veículos, e ordenada alfabéticamente pela marca e pelo modelo;

6. Página da Reparação: página com toda a informação de uma reparação;

7. Página do tipo de intervenção: dados da intervenção (código, nome e descrição) e lista de reparações onde foi realizada;

8. Página do véiculo com matricula, marca e modelo;

9. Página da marca/modelo com o número de veículos e as matriculas dos veículos.

### Resolução
Em primeiro lugar, inicializei um novo projeto Node.js e criei o ficheiro **package.json** com o comando:
```
npm init
```
Em segundo lugar, instalei a biblioteca **axios** para fazer requisições HTTP e adicionei a dependência ao projeto com o comando:
```
npm install axios --save
```
Em terceiro lugar, coloquei o **dataset_reparacoes.json** nesta pasta e comecei a analisá-lo:
- Percebi que o campo identificador das reparações, tal como o das intervenções e dos veículos não se chamava **id**. As reparações eram identificadas pelo campo **nif**, as intervenções eram identificadas pelo campo **codigo** e os veículos eram identificados pelo campo **matricula**.
- Também percebi que este ficheiro JSON apenas tinha uma lista de reparações e nós queriamos também lidar com intervenções e veículos.

Em quarto lugar, decidi fazer um novo ficheiro JSON, apartir do antigo, que tivesse:
- O campo **id** como identificador tanto de reparações como intervenções e veículos. Afinal, no json-server, o identificador padrão de cada recurso é o campo **id**, e achei melhor seguir esta convenção para não ter complicações no futuro. Assim, resolvi logo o problema.
- Uma lista de reparações, como o antigo JSON, mas também uma lista de intervenções e veículos. Afinal, no json-server todos os recursos que queremos tratar independente de outros recursos devem estar organizados dentro da sua própria lista. Cada recurso deve ter a sua lista e assim fiz também uma lista de intervenções e uma lista de veículos e deixei a lista de reparações como estava.
  
Para fazer isto, fiz o programa em Python **generate.py**, que após ser executado criou o novo dataset **new_dataset.json**, que, no fundo, tem a mesma informação do JSON anterior, mas está estruturado da maneira adequada para ser usado pelo json-server.

Depois criei o programa em JavaScript **index.js**, que inicializa um servidor na porta 1234. Este servidor lida com requisições e respostas HTTP, servindo as páginas web solicitadas pelos clientes.

Eu fiz todas as páginas web que foram pedidas neste trabalho para casa.

### Testes
Para testar este trabalho, podemos começar por obter o dataset apropriado, executando o programa **generate.py**:
```
python3 generate.py
```
Depois vamos inicializar um servidor API RESTful
usando o **json-server**, que irá ler e fornecer dados a partir do ficheiro
**new_dataset.json**, permitindo realizar operações de CRUD sobre esses dados.
O comando a ser utilizado é:
```
json-server --watch new_dataset.json
```
Por padrão, o json-server inicia o servidor na porta 3000 e tive isso em conta ao fazer o programa **index.js**.

Depois, noutro terminal, vamos executar o programa em JavaScript **index.js** com o Node.js,
para executar o outro servidor na porta 1234:
```
node index.js
```
Depois é so abrir um navegador web e inserir o URL:
```
http://localhost:1234/
```
Depois podemos explorar o website e rapidamente percebemos que eu cumpri todos os requisitos deste trabalho de casa.
## Resultados
### Ficheiros resultantes deste trabalho
- O dataset de reparações dado inicialmente pelo professor: [dataset_reparacoes.json](dataset_reparacoes.json)
- O programa em Python que transforma o dataset anterior num dataset apropriado: [generate.py](generate.py)
- O dataset resultante da execução do programa anterior: [new_dataset.json](new_dataset.json)
- O programa em JavaScript que inicializa o servidor: [index.js](index.js)
- O manifesto que está a ler neste momento: [README.md](README.md)
- Os ficheiros resultantes de criar um projeto em Node.js:
  - [package.json](package.json)
- Os ficheiros e pasta resultantes de instalar a biblioteca axios:
  - O ficheiro [package-lock.json](package-lock.json)
  - A pasta [node_modules](node_modules) que contém mais ficheiros necessários