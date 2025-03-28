# TPC6 : Resolução do Teste do Ano Passado
## Data
- 28/03/2025
## Autor
- **Nome:** Ana Sá Oliveira
- **Número:** A104437
- **Fotografia:**
  
![Fotografia](../Fotografia.jpg)

## Resumo
### Objetivos
#### Resumo
O objectivo principal desta aula é consolidar a implementação de uma API de dados usando o MongoDB
para persistir os dados.
#### Recursos
Recursos para a realização da prova:
- Lista de contratos registados no Portal dos Contratos Públicos para o projeto Portal da Transparência
(até 9 de Maio de 2024) (dataset em CSV obtido de dados.gov.pt), este ficheiro tem a seguinte
estrutura:
```
idcontrato;nAnuncio;tipoprocedimento;objectoContrato;dataPublicacao;dataCe
lebracaoContrato;precoContratual;prazoExecucao;NIPC_entidade_comunicante;e
ntidade_comunicante;fundamentacao
10424261;;Consulta Prévia;Seguro de Acidentes de Trabalho para os
Funcionários/as da Urbe - Consultores Associados,
Lda.;01/01/2024;01/01/2024;3918,75;366;505111667;Urbe - Consultores
Associados, L.da;Artigo 20.º, n.º 1, alínea c) do Código dos Contratos
Públicos
10424331;;Ajuste Direto Regime Geral;Serviços no âmbito administrativo e
apoio nas atividades da
Freguesia;02/01/2024;02/01/2024;8100;272;507853024;Freguesia de Candoso
(São Martinho);Artigo 20.º, n.º 1, alínea d) do Código dos Contratos
Públicos
10424469;;Consulta Prévia;"Serviços de limpeza de bermas, valetas, podas
de árvores e manutenção de espaços públicos: manter sem vegetação selvagem
as valetas de todas as ruas e caminhos da Freguesia de Carvalhosa, no
concelho de Paços de Ferreira. Por vegetação selvagem deve-se compreender
toda a vegetação rasteira que cresce nos caminhos, ruas e bermas, bem como
arbustos até 1,5 metros de altura que sejam indicados pela entidade
adjudicante. A entidade adjudicatária está autorizada a utilizar
herbicidas não tóxicos autorizados pelas normas comunitárias e ainda os
mecanismos de corte que considere necessário. Proceder à remoção dos
detritos que resultem do exercício dos serviços que presta. Manter limpas
e desimpedidas as valetas e caixas exteriores de águas pluviais. Manter
limpas e desimpedidas as sarjetas e condutas de águas pluviais que sejam
de fácil acesso e cuja obstrução ocorra após cada limpeza. Proceder à poda
de árvores da Freguesia
...
```
#### Exercício 1: Contratos (API de dados)
Neste exercício, irás implementar uma API de dados sobre o dataset fornecido. Encontra-se dividido em 3
partes.

**1.1 Setup**

Realiza as seguintes tarefas sem alterares os nomes da base de dados e coleção fornecidos:
- Analisa o dataset fornecido;
- Introduz as alterações que achares necessárias no dataset;
- Importa-o numa base de dados em MongoDB com os seguintes parâmetros:
    - database: -d contratos
    - collection: -c contratos
- Testa se a importação correu bem.

**1.2 Queries (warm-up)**

Especifica queries em MongoDB para responder às seguintes questões:
1. Quantos registos estão na base de dados;
2. Quantos registos de contratos têm o tipo de procedimento com valor "Ajuste Direto Regime Geral"?
3. Qual a lista de entidades comunicantes (ordenada alfabeticamente e sem repetições)?
4. Qual a distribuição de contratos por tipo de procedimento (quantos contratos tem cada tipo de
procedimento)?
5. Qual o montante global por entidade comunicante (somatório dos contratos associados a uma
entidade)?

**1.3 API de dados**

Desenvolve agora uma API de dados, que responde na **porta 16000** e que responda às seguintes
rotas/pedidos:
- GET /contratos: devolve uma lista com todos os registos;
- GET /contratos/:id: devolve o registo com identificador id (corresponde ao idcontrato);
- GET /contratos?entidade=EEEE: devolve a lista dos contratos correspondentes à entidade
EEEE;
- GET /contratos?tipo=AAA: devolve a lista dos contratos com tipo de procedimento igual a AAA;
- GET /contratos/entidades: devolve a lista de entidades comunicantes ordenada
alfabeticamente e sem repetições;
- GET /contratos/tipos: devolve a lista dos tipos de procedimento ordenada alfabeticamente e sem repetições;
- POST /contratos: acrescenta um registo novo à BD;
- DELETE /contratos/:id: elimina da BD o registo com o identificador id;
- PUT /contratos/:id: altera o registo com o identificador id.

Antes de prosseguires, testa as rotas realizadas com o Postman ou similar.

**Exercício 2: Contratos (Interface)**

Tendo a API desenvolvida, desenvolve agora um novo serviço, que responde na **porta 16001** da seguinte
forma:
1. Se colocares no browser o endereço http://localhost:16001 deverás obter a página principal
constituída por:
    - Um cabeçalho com metainformação à tua escolha;
    - Uma tabela contendo a lista de registos, um por linha, com os campos: idcontrato, objectoContrato, dataCelebracaoContrato, precoContratual,NIPC_entidade_comunicante, entidade_comunicante;
    - O campo idcontrato deverá ser um link para a página do contrato com esse identificador;
    - O campo NIPC_entidade_comunicante deverá ser um link para a página dessa entidade.
2. Se colocares no browser o endereço http://localhost:16001/:id deverás obter a página do
contrato cujo identificador foi passado na rota:
    - Esta página deverá conter todos os campos do contrato e um link para voltar à página principal.
3. Se colocares no browser o endereço http://localhost:16001/entidades/:nipc deverás
obter a página da entidade cujo NIPC_entidade_comunicante corresponde ao parâmetro
passado na rota :
    - Na página de cada entidade deverá constar este identificador e o respetivo nome da entidade;
    - Uma tabela com a lista de contratos dessa entidade (tabela com estrutura semelhante à da página principal);
    - O somatório do valor dos contratos;
    - E um link para voltar à página principal.

### Resolução

#### 1.1 Setup

Em primeiro lugar, descarreguei o dataset **contratos2024.csv**. Depois fiz um programa em Python, **dataset.py**, que gera um novo dataset, **contratos2024.json**, adaptando o dataset original para poder ser usado pelo MongoDB:
- O dataset original era `CSV` e precisamos de um `JSON` para usar em MongoDB;
- O campo `idcontrato` para ser o real ID no MongoDB tem de se chamar `_id`;
- O campo `precoContratual` tem números com `vírgula` a separar parte inteira da não inteira e para o MongoDB seria um `ponto` a separar, para não dar erro.
- O campo `precoContratual` e o campo `prazoExecucao` são floats e inteiros respetivamente, então já coloquei assim no JSON, em vez de serem strings.

Assim, executei este programa:
```
python3 dataset.py
```
E depois obtive o dataset corrigido: **contratos2024.json**.

Depois vamos importar o dataset numa base de dados em MongoDB.

Para isso, iniciei o meu container Docker:
```
sudo docker start a828ec4bc4de
```
Depois copiei o dataset **contratos2024.json** para o container:
```
sudo docker cp contratos2024.json mongoEW:/tmp
```
Depois acessei o terminal do container:
```
sudo docker exec -it mongoEW sh
```
Por fim, importei o dataset **contratos2024.json** numa base de dados em MongoDB com os seguintes parâmetros:
- database: -d contratos
- collection: -c contratos
  
```
mongoimport -d contratos -c contratos /tmp/contratos2024.json --jsonArray
```
Aparentemente tivemos sucesso na importação, uma vez que apareceu na tela:
```
2025-03-26T23:24:34.230+0000	connected to: mongodb://localhost/
2025-03-26T23:24:35.478+0000	36377 document(s) imported successfully. 0 document(s) failed to import.
```
#### 1.2 Queries (warm-up)

O próximo passo é resolver as queries dadas.

Mas primeiro iniciei o MongoDB Shell:
```
mongosh
```
E depois selecionei a nossa base de dados **contratos**:
```
use contratos
```
Agora sim, fui resolver as queries:

**Quantos registos estão na base de dados?**
```
db.contratos.countDocuments()
```
Resposta dada: `36377`

**Quantos registos de contratos têm o tipo de procedimento com valor "Ajuste Direto Regime Geral"?**
```
db.contratos.find({tipoprocedimento:"Ajuste Direto Regime Geral"}).count()
```
Resposta dada: `17067`

**Qual a lista de entidades comunicantes (ordenada alfabeticamente e sem repetições)?**
```
db.contratos.distinct("entidade_comunicante")
```
Resposta dada:
```
[
  'A ARCIAL - Associação para Recuperação de Cidadãos Inadaptados de Oliveira do Hospital',
  'A Oficina Centro de Artes e Mesteres Tradicionais de Guimarães, CIPRL',
  'A. D. A. M. - Águas do Alto Minho, S. A.',
  'ABIMOTA - Associação Nacional das Indústrias de Duas Rodas, Ferragens, Mobiliário e Afins',
  'ABMG - Águas do Baixo Mondego e Gândara, E. I. M., S. A.',
  'AC, Águas de Coimbra, E. M.',
  'ACA - Associação Casa da Arquitectura',
  'ACAPORAMA - Associação de Casas do Povo da Região Autonoma da Madeira',
  'ACISO - Associação Empresarial Ourém - Fátima',
  'ACLEM - Arte, Cultura e Lazer, Empresa Municipal, E. M.',
  'ACPMR - Associação Cluster Portugal Mineral Resources',
  'AD ELO Associação de Desenvolvimento Local da Bairrada e Mondego',
  'ADAE - Associação de Desenvolvimento da Alta Estremadura',
  'ADC - Águas da Covilhã, E. M.',
  'ADD - Associação de Desenvolvimento do Dão',
  'ADEMINHO - Associação para o Desenvolvimento do Ensino Profissional do Alto Minho Interior',
  'ADENE - Agência para a Energia',
  'ADEPTOLIVA - Associação para o Desenvolvimento do Ensino Profissional dos Concelhos de Tábua, Oliveira do Hospital e Arganil',
  'ADER-AL - Associação para o Desenvolvimento do Espaço Rural do Norte do Alentejo',
  'ADICE - Associação para o Desenvolvimento Integrado da Cidade de Ermesinde',
  'ADIRN - Associação para o Desenvolvimento Integrado do Ribatejo Norte',
  'ADIST - Associação para o Desenvolvimento do Instituto Superior Técnico',
  'ADL - Associação de Desenvolvimento do Litoral Alentejano',
  'ADP - Águas de Portugal Internacional - Serviços Ambientais, S. A.',
  'ADRAT - Associação de Desenvolvimento da Região do Alto Tâmega',
  'ADREPES - Associação de Desenvolvimento Regional da Península de Setúbal',
  'ADRIMAG - Associação de Desenvolvimento Rural Integrado das Serras de Montemuro, Arada e Gralheira',
  'ADVID - Associação para o Desenvolvimento da Viticultura Duriense',
  'ADXTUR - Agência para o Desenvolvimento Turístico das Aldeias do Xisto',
  'AEBB - Associação Empresarial da Beira Baixa',
  'AECRM-Associação Empresarial Concelho Rio Maior',
  'AEPM - Associação Equiterapêutica do Porto e Matosinhos',
  'AER - Associação Empresarial de Resende',
  'AEVA - Associação para a Educação e Valorização da Região de Aveiro',
  'AGERE- Empresa de Águas Efluentes e Resíduos de Braga, E. M.',
  'AIDA Assoc Industrial Distrito de Aveiro',
  'AMARSUL - Valorização e Tratamento de Resíduos Sólidos, S. A.',
  'AMBILITAL - Investimentos Ambientais no Alentejo, E. I. M.',
  'AMBISOUSA - Empresa Intermunicipal de Tratamento e Gestão de Residuos Sólidos, E.I.M.',
  'AMC - Vouga Associação de Municípios do Carvoeiro - Vouga',
  'AMCAL - Associação de Municípios do Alentejo Central',
  'ANI - Agência Nacional de Inovação, S. A.',
  'APA - Administração do Porto de Aveiro, S. A.',
  'APCB - Associação de Paralisia Cerebral de Braga',
  'APCTP - Associação do Parque de Ciência e Tecnologia do Porto',
  'APCV - Associação de Paralisia Cerebral de Viseu',
  'APEPO-Associação Para o Ensino Profissional do Oeste',
  'APFF - Administração do Porto da Figueira da Foz, S. A.',
  'APIN EIM, SA',
  'APL / Administração do Porto de Lisboa, SA',
  'APPACDM DE LISBOA - Associação Portuguesa de Pais e Amigos do Cidadão Deficiente Mental',
  'APPACDM de Coimbra - Associação Portuguesa de Pais e Amigos do Cidadão Deficiente Mental',
  'APPACDM de Mirandela - Associação Portuguesa de Pais e Amigos do Cidadão Deficiente Mental',
  'APPACDM de Portalegre - Associação Portuguesa de Pais e Amigos do Cidadão Deficiente Mental',
  'APPACDM de Setúbal - Associação Portuguesa de Pais e Amigos do Cidadão Deficiente Mental',
  'APPACDM de Soure',
  'APPACDM de Viana do Castelo - Associação Portuguesa de Pais e Amigos do Cidadão Deficiente Mental',
  'APPACDM do Porto -Associação Portuguesa de Pais e Amigos do Cidadão Deficiente Mental',
  'APPC - Associação do Porto de Paralisia Cerebral',
  'APPDA-Coimbra, Associação Portuguesa para as Perurbações do Desenvolvimento e Autismo de Coimbra',
  'APRAM - Administração dos Portos da Região Autónoma da Madeira, S. A.',
  'APS - Administração dos Portos de Sines e do Algarve, S. A.',
  'APSS ADMINISTRAÇÃO DOS PORTOS DE SETÚBAL E SESIMBRA S. A',
  'AQUANENA - Empresa Municipal de Águas e Saneamento de Alcanena, E. M., S. A.',
  'AR - Águas do Ribatejo, EIM, SA',
  'ARM - Águas e Resíduos da Madeira, S.A.',
  'AS - Empresa das Águas de Santarém, E. M, S. A.',
  'ASCUDT- Associação Sócio-Cultural dos Deficientes de Trás-os-Montes',
  'ASDOURO - Associação de Desenvolvimento do Ensino e Formação Profissional do Alto Douro',
  'ASSOL - Associação de Solidariedade Social de Lafões',
  'ATAHCA - Associação de Desenvolvimento das Terras Altas do Homem Cávado e Ave',
  'ATEC - Associação de Formação para a Indústria',
  'Activar - Associação de Cooperação da Lousã',
  'Actual Gest - Formação Profissional, L.da',
  'AdP - Águas de Portugal, SGPS, S.A',
  'AdP Energias - Energias Renováveis e Serviços Ambientais , S. A.',
  'AdP Valor - Serviços Ambientais, S. A.',
  'AdRA - Águas da Região de Aveiro, S. A.',
  'Administração Central do Sistema de Saúde, I. P.',
  'Administração Regional de Saúde de Lisboa e Vale do Tejo, I. P.',
  'Administração Regional de Saúde do Alentejo (ARSA)',
  'Administração Regional de Saúde do Alentejo, I. P.',
  'Administração Regional de Saúde do Algarve, I. P.',
  'Administração Regional de Saúde do Algarve, I.P.',
  'Administração Regional de Saúde do Centro, I. P.',
  'Administração Regional de Saúde do Centro,IP(ARSC)',
  'Administração Regional de Saúde do Norte, I. P.',
  'Administração Regional de Saúde do Norte,IP (ARSN)',
  'AgdA - Águas Públicas do Alentejo, S. A.',
  'Agrupamento Escolas de Colmeias',
  'Agrupamento Vertical de Canelas',
  'Agrupamento Vertical de Cristelo',
  'Agrupamento Vertical de Escolas de Almodôvar',
  'Agrupamento Vertical de Escolas de Arga e Lima',
  'Agrupamento Vertical de Escolas de Briteiros',
  'Agrupamento Vertical de Escolas de Freixo, Ponte de Lima',
  'Agrupamento Vertical de Escolas de Marco de Canaveses',
  'Agrupamento Vertical de Escolas de Paços de Ferreira',
  'Agrupamento Vertical de Escolas Álvaro Coutinho, O Magriço - Penedono',
  'Agrupamento Vertical de Perafita',
  ... 2121 more items
]
```
**Qual a distribuição de contratos por tipo de procedimento (quantos contratos tem cada tipo de procedimento)?**
```
db.contratos.aggregate([
    { "$group": { "_id": "$tipoprocedimento", "count": { "$sum": 1 }}},
    { "$sort": { "count": -1 } } 
])
```
Resposta dada:
```
[
  { _id: 'Ajuste Direto Regime Geral', count: 17067 },
  { _id: 'Consulta Prévia', count: 8000 },
  { _id: 'Concurso público', count: 5300 },
  { _id: 'Ao abrigo de acordo-quadro (art.º 259.º)', count: 4678 },
  { _id: 'Ao abrigo de acordo-quadro (art.º 258.º)', count: 995 },
  { _id: 'Contratação excluída II', count: 144 },
  { _id: 'Consulta Prévia Simplificada', count: 96 },
  { _id: 'Concurso limitado por prévia qualificação', count: 53 },
  { _id: 'Setores especiais – isenção parte II', count: 39 },
  { _id: 'Concurso público simplificado', count: 3 },
  {
    _id: 'Consulta prévia ao abrigo do artigo 7º da Lei n.º 30/2021, de 21.05',
    count: 1
  },
  { _id: 'Procedimento de negociação', count: 1 }
]
```

**Qual o montante global por entidade comunicante (somatório dos contratos associados a uma entidade)?**
```
db.contratos.aggregate([
    { "$group": { "_id": "$entidade_comunicante", "count": { "$sum": "$precoContratual" }}},
    { "$sort": { "count": -1 } } 
])
```
Resposta dada:
```
[
  { _id: 'Infraestruturas de Portugal', count: 337631897.6 },
  {
    _id: 'Unidade Local de Saúde de Santa Maria, E. P. E.',
    count: 159967578.705
  },
  {
    _id: 'Unidade Local de Saúde de Gaia/Espinho, E. P. E.',
    count: 45613137.36013
  },
  { _id: 'Autoridade Tributária e Aduaneira', count: 38382836.68 },
  { _id: 'Estado Maior da Força Aérea', count: 34686391.11 },
  {
    _id: 'Centro Hospitalar Universitário Lisboa Central, E. P. E.',
    count: 33505837.87
  },
  {
    _id: 'Hospital do Espírito Santo de Évora, EPE',
    count: 30074229.55
  },
  { _id: 'Metro do Porto, S. A.', count: 29523182.59 },
  {
    _id: 'Instituto Português de Oncologia de Lisboa Francisco Gentil, E. P. E.',
    count: 29289694.92
  },
  {
    _id: 'Unidade Local de Saúde do Algarve, E. P. E.',
    count: 28874275.14
  },
  { _id: 'Município de Sintra', count: 28288149.45 },
  {
    _id: 'Unidade Local de Saúde de São João, E. P. E.',
    count: 28127191.868
  },
  {
    _id: 'Serviço de Saúde da Região Autónoma da Madeira,EPE',
    count: 26361134.43
  },
  {
    _id: 'Ministério da Defesa Nacional - Marinha',
    count: 23974181.49
  },
  { _id: 'Município de Santo Tirso', count: 23654597.09 },
  { _id: 'Município de Cascais', count: 23020859.63 },
  {
    _id: 'Secretaria-Geral do Ministério da Administração Interna',
    count: 22156428.56
  },
  {
    _id: 'Hospital Professor Doutor Fernando Fonseca, E. P. E.',
    count: 22120613.86
  },
  { _id: 'Águas do Algarve, S.A.', count: 18834483.76 },
  {
    _id: 'Centro Hospitalar e Universitário de Coimbra, E. P. E.',
    count: 18550890.39005
  }
]
Type "it" for more
```
#### 1.3 API de dados

Para desenvolver a API de dados, começamos por gerar um projeto Express:
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

Esta API de dados responde na porta **16000** e responde aos pedidos descritos nos objetivos deste trabalho para casa.

#### Exercício 2: Contratos (Interface)

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

Este serviço responde na porta **16001** e responde aos utilizadores com as páginas descritas nos objetivos deste trabalho para casa.

Por fim, construi o que foi necessário para ter a Aplicação de Alunos a funcionar.

### Testes

Para testar este trabalho, primeiro corremos o seguinte comando, para obtermos o ficheiro JSON correto, o **contratos2024.json**:
```
python3 dataset.py
```
Depois executamos os seguintes comandos para colocar tudo isto no MongoDB:

Iniciar o meu container Docker:
```
sudo docker start a828ec4bc4de
```
Copiar o **contratos2024.json** para o container:
```
sudo docker cp contratos2024.json mongoEW:/tmp
```
Acessar o terminal do container:
```
sudo docker exec -it mongoEW sh
```
Importar o **contratos2024.json** para o MongoDB:
```
mongoimport -d contratos -c contratos /tmp/contratos2024.json --jsonArray
```
Depois sair:
```
exit
```
Depois entramos nesta pasta:
```
cd API_de_dados
```
Depois vamos executar o seguinte comando para executar o serviço que responde na porta 16000, a API de dados:
```
npm start
```
Depois, noutro terminal, entramos nesta pasta:
```
cd Front-end
```
Depois vamos executar o seguinte comando para executar o serviço que responde na porta 16001, o Front-end:
```
npm start
```
Depois é so abrir um navegador web e inserir o URL: http://localhost:16001/

Depois, podemos pressionar `Ctrl + F5` para forçar o navegador a recarregar a página e a baixar a versão mais recente de todos os arquivos do site, ignorando o cache. Fazemos isto, para garantir que vai aparecer o ícone, o **contrato.png**.

Depois podemos explorar o website e rapidamente percebemos que eu cumpri todos os requisitos:
- **Página de Listagem de Contratos**: http://localhost:16001/
- **Página de Consulta de um Contrato**, por exemplo: http://localhost:16001/10424261
- **Página de Consulta de uma Entidade**, por exemplo: http://localhost:16001/entidades/500051054

## Resultados
### Ficheiros resultantes deste trabalho

- O dataset com os contratos dado pelo professor: [contratos2024.csv](contratos2024.csv)
- O programa em Python que trata o dataset anterior: [dataset.py](dataset.py)
- O dataset resultante do programa anterior: [contratos2024.json](contratos2024.json)
- O ficheiro de texto com as queries em MongoDB: [queries.txt](queries.txt)
- O projeto Express com a API de dados: [API_de_dados](API_de_dados)
  - O ficheiro [API_de_dados/bin/www](API_de_dados/bin/www)
  - O ficheiro [API_de_dados/controllers/contratos.json](API_de_dados/controllers/contratos.js)
  - O ficheiro [API_de_dados/models/contrato.json](API_de_dados/models/contrato.js)
  - O ficheiro [API_de_dados/routes/contratos.js](API_de_dados/routes/contratos.js)
  - O ficheiro [API_de_dados/views/error.pug](API_de_dados/views/error.pug)
  - O ficheiro [API_de_dados/views/index.pug](API_de_dados/views/index.pug)
  - O ficheiro [API_de_dados/views/layout.pug](API_de_dados/views/layout.pug)
  - O ficheiro [API_de_dados/app.js](API_de_dados/app.js)
  - O ficheiro [API_de_dados/package-lock.json](API_de_dados/package-lock.json)
  - O ficheiro [API_de_dados/package.json](API_de_dados/package.json)
- O projeto Express com o Front-end: [Front-end](Front-end)
  - O ficheiro [Front-end/bin/www](Front-end/bin/www)
  - O ficheiro [Front-end/public/images/contrato.png](Front-end/public/images/contrato.png)
  - O ficheiro [Front-end/public/stylesheets/style.css](Front-end/public/stylesheets/style.css)
  - O ficheiro [Front-end/routes/contratos.js](Front-end/routes/contratos.js)
  - O ficheiro [Front-end/views/contrato.pug](Front-end/views/contrato.pug)
  - O ficheiro [Front-end/views/contratos.pug](Front-end/views/contratos.pug)
  - O ficheiro [Front-end/views/entidade.pug](Front-end/views/entidade.pug)
  - O ficheiro [Front-end/views/error.pug](Front-end/views/error.pug)
  - O ficheiro [Front-end/views/layout.pug](Front-end/views/layout.pug)
  - O ficheiro [Front-end/app.js](Front-end/app.js)
  - O ficheiro [Front-end/package-lock.json](Front-end/package-lock.json)
  - O ficheiro [Front-end/package.json](Front-end/package.json)
- O manifesto que está a ler neste momento: [README.md](README.md)

As pastas **node_modules** de cada projeto Express não estão incluidas neste repositório, tal como o professor pediu.