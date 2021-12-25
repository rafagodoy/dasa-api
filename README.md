# LAB-API

LAB-API fornece a API responsável pelo gerenciamento de todos os laboratórios e exames da rede nacional brasileira.

# Conteúdo
- [Architeture e Stack](#architeture-e-stack)
- [Skeleton application](#skeleton-application)
- [Commits](#commits)
- [Branches e pull requests](#branches-e-pull-requests)
- [Versioning](#versioning)
- [Lint](#lint)
- [Tests](#tests)
- [Environment variables](#environment-variables)
- [Running](#running)
  - [Local/Development environment](#localdevelopment-environment)
  - [Production environment](#production-environment)
    - [CI/Deploy](#cideploy)
    - [Packages](#packages)
- [API](#api)
	- [Usuários](#usuários)
      - [POST {URL_API}/users](#post-url_apiusers)
      - [POST {URL_API}/users/sessions](#post-url_apiuserssessions)
      - [PUT {URL_API}/users/:idUser](#put-url_apiusersiduser)
      - [GET {URL_API}/users/:idUser](#get-url_apiusersiduser)
      - [PATCH {URL_API}/users/:idUser/password-change](#patch-url_apiusersiduserpassword-change)
	- [Laboratórios](#laboratórios)
      - [POST {URL_API}/laboratories](#post-url_apilaboratories)
      - [PUT {URL_API}/laboratories/:idLaboratory](#put-url_apilaboratoriesidlaboratory)
      - [GET {URL_API}/laboratories/:idLaboratory](#get-url_apilaboratoriesidlaboratory)
      - [GET {URL_API}/laboratories](#get-url_apilaboratories)
      - [DEL {URL_API}/laboratories/:idLaboratory](#del-url_apilaboratoriesidlaboratory)
  - [Exames](#exames)
    - [POST {URL_API}/exams](#post-url_apiexams)
    - [PUT {URL_API}/exams/:idExam](#put-url_apiexamsidexam)
    - [GET {URL_API}/exams/:idExam](#del-url_apiexams-laboratoriesidexamlaboratory)
    - [GET {URL_API}/exams](#get-url_apiexamsidexam)
    - [DEL {URL_API}/exams/:idExam](#get-url_apiexams)
  - [Associar exames aos laboratórios](#associar-exames-aos-laboratórios)
    - [POST {URL_API}/laboratories/:idLaboratory/exams/:idExam/associate](#post-url_apilaboratoriesidlaboratoryexamsidexamassociate)
    - [DEL {URL_API}/exams-laboratories/:idExamLaboratory](#del-url_apiexams-laboratoriesidexamlaboratory)

# Architeture e Stack

## Stack

- ES6
- Express Framework
- Sequelize ORM  
- Mocha e Chai        
- CriptoJs            - Aplicado para criptografia de senhas no banco de dados
- JWT                 - Utilizado para gerar os tokens de usuários autenticados

## Architeture

- NodeJs
- PostgreSQL
- Heroku              - Para o deploy da aplicação em ambiente de produção


# Skeleton application

    .
    ├── .github
        └── workflows             # Contém o arquivo de configuração de CI para o GitHub Actions
    ├── node_modules              # Contém a instalação de todos os pacotes adicionados em package.json
    ├── src
    |   ├── config                # Contém os arquivos de configuração da instância do sequelize, token JWT e dos arquivos de migrations
    |   ├── controllers           
    |   ├── helpers               # Auxiliadores responsáveis por fazer o controle de erros e exceptions da aplicação
    |   ├── middlewares           # Contém o middleware responsável por autenticar as rotas e controlar os erros lançados em resposta a uma requisição
    |   ├── migrations            # Contém os arquivos que criam as tabelas no banco de dados
    |   ├── models
    |   ├── routes
    |   ├── seeders               # Arquivos que realizam inserções de registros no banco de dados
    |   ├── services              # Auxiliam os controles manipulando as regras de negócio em conjunto com os models
    |   ├── utils                 # Contém arquivos de classes úteis que podem ser utilizados por toda a aplicação
    |   └── validations           # Contém os schemas responsáveis por verificar e validar o corpo das requisições HTTP do tipo POST e PUT
    └── test                      # Contém todos os arquivos de testes
        └── integrations          # Contém todos os testes de integração


# Commits

A estrutura dos commits foi orientada conforme a **AngularJS commit conventions**. A convenção de escrita das mensagens, pode ser vista com mais detalhes através do link:
https://blog.geekhunter.com.br/o-que-e-commit-e-como-usar-commits-semanticos/#Commits_Atomicos


# Branches e pull requests

O sistema de branches, baseia-se em dois principais troncos: `develop` e `master`. Durante o desenvolvimento, as novas branches deverão ser criadas a partir de `develop`, obedecendo
o padrão a seguir:

- **Features:** Ao desenvolver novas funcionalidades ao projeto, definir a nomeclatura da branch como `feature/<nome da feature em inglês>`.
- **Bugs:** Ao corrigir o bug de alguma feature anteriormente desenvolvida, definir nomenclatura da branch como `bug-fix/<nome da feature em inglês>`.

Seguindo o fluxo, ao concluir o desenvolvimento da tarefa, realizar um pull request para a branch `develop`. Finalmente, todas as alterações aplicadas em `develop`, serão replicadas
para `master` através de outro pull request, concretizando os resultados em um deploy no servidor de produção.


# Versioning

Utilizou-se o versionamento semântico para que equipes paralelas, possam consumir a API, conhecendo com detalhes, todas as modificações que foram realizadas no projeto.
O versionamento semântico, foi aplicado no projeto, através do pacote `semantic-release` e configurado no arquivo de base `.realeaserc`. Foi definido que na branch nomeada
como `develop` , serão publicadas automaticamente as versões de **pre-release**, e na `master` , efetivamente a versão de **release**. Para mais detalhes sobre a convenção:
https://semver.org/


# Lint

Pensando na boa leitura e organização do código, foi adicionado o pacote do `Eslint` e o `Prettier`. Os arquivos de configuração são `.eslintrc` e `.prettierrc`. 
Ambos encontram-se na raiz do projeto.


# Tests

Na aplicação, foram realizados os testes de integração com Chai e Mocha. Em princípio, todos os testes foram executados em ambiente local através do comando `npm test`, além disso,
durante o deploy da aplicação, a bateria dos testes é executada através do Github Actions antes de ser enviada ao servidor do Heroku.


# Environment variables

As configurações do banco de dados e servidor, tais como, senhas e dados sensíveis, estão protegidos por variáveis de ambiente no servidor de produção (Heroku). Porém, para executar a aplicação
em ambiente local, você precisará definí-las através dos "arquivos de configuração", localizados na pasta `/src/config`. Veja os detalhes na sequência para entender exatamente como
realizar o procedimento:

# Running

Descrição detalhada das configurações e funcionamento do workflow aplicação + banco de dados, tanto em ambiente local, quanto em produção.

## Local/Development environment

Para executar a aplicação no seu ambiente local, siga as etapas descritas nos passos a seguir:

### 1 Clonar repositório do projeto

- Faça um clone do repositório https://github.com/rafagodoy/dasa-api.git em seu ambiente local.

### 2 Migrations

As migrations, localizadas na pasta `/src/migrations` contém os arquivos responsáveis por criar as tabelas no banco de dados. Inicialmente, **crie uma base de dados PostgreSQL no seu ambiente local**.

- Após a criação da base de dados, edite o arquivo `/src/config/migrations.js`, inserindo as informações de conexão com o banco de dados:

```
  module.exports = {
      development: {
          username: process.env.POSTGRES_USER || "postgres",
          password: process.env.POSTGRES_PASSWORD || "1234",
          database: process.env.POSTGRES_DATABASE || "dasa",
          host: process.env.POSTGRES_SERVER || "192.168.99.100",
          dialect: "postgres",
      },
      test: {
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DATABASE,
          host: process.env.POSTGRES_SERVER,
          dialect: "postgres",
      },
      production: {
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DATABASE,
          host: process.env.POSTGRES_SERVER,
          dialect: "postgres",
          protocol: "postgres",
          port: 5432,
          dialectOptions: {
              ssl: {
                  rejectUnauthorized: false,
              },
          },
      },
  };
```

- Altere a chave `development`, inserindo os valores do banco de dados local, tais como, usuário (username), senha (password), nome da base de dados (database) e endereço do banco (host).

- No terminal, dentro da pasta do projeto, execute o comando do `sequelize-cli` para instalar as tabelas dentro do banco de dados criado.

- ```yarn sequelize db:migrate```

### 3 Arquivos de configuração

- Crie um arquivo `.env` na raiz do projeto, informando as variavéis de ambiente necessárias para o funcionamento da aplicação.

```
  JWT_SECRET="8e3bc213859ebe4cd2a8c258b8fd1f8e"
  CRYPTO_SECRET="a0e2a2c563d57df27213ede1ac4ac780"

  NODE_SERVER = "http://localhost:3003"

  NODE_ENV="development"
  PORT=3003
  POSTGRES_SERVER="192.168.99.100"
  POSTGRES_DATABASE="dasa"
  POSTGRES_USER="postgres"
  POSTGRES_PASSWORD="1234"
  POSTGRES_DIALECT="postgres"
```

O exemplo acima, mostra a chave e o valor das variáveis necessárias para o execução do projeto (informe os valores da sua conexão local do banco de dados postgreSQL).

### 4 Run

- Após as configurações iniciais definidas, execute o projeto através do comando:

- `yarn start:dev`

- Após o servidor ser iniciado, você já estará pronto para executar os endpoints da API no seu ambiente local.


## Production environment

A API encontra-se hospedada e disponível para consulta, em um servidor de produção, através do **Heroku**. Todos os endpoints poderão ser executados por meio do endereço `https://dasa-api-personal.herokuapp.com`.

## CI/Deploy

A aplicação possui o GitHub Actions como ferramenta de integração contínua, finalizando o deploy da aplicação em um servidor de produção do Heroku. O processo de CI está esquematizado da seguinte maneira:

---

<img src="http://yuml.me/diagram/plain/activity/(start)->(Build Application)->(Test Application)->(Release Application)->(Deploy application on HEROKU)->(Run Application)->(end)" >

---


## Packages

Os pacotes encontram-se instalados na pasta `node_modules`, encontrando-se divididos entre dependências para o ambiente de desenvolvimento e produção:

```
  "dependencies": {
    "@types/chai": "^4.2.14",
    "babel-core": "^6.26.3",
    "babel-polyfill": "^6.26.0",
    "babel-preset-env": "^1.7.0",
    "babel-preset-stage-0": "^6.24.1",
    "babel-register": "^6.26.0",
    "body-parser": "^1.19.0",
    "chai": "^4.2.0",
    "chai-http": "^4.3.0",
    "chai-subset": "^1.6.0",
    "cors": "^2.8.5",
    "crypto-js": "^4.0.0",
    "dotenv": "^8.2.0",
    "eslint-config-prettier": "^6.11.0",
    "eslint-plugin-prettier": "^3.1.3",
    "express": "^4.17.1",
    "faker": "^5.1.0",
    "jsonwebtoken": "^8.5.1",
    "mocha": "^8.2.1",
    "pg": "^8.2.0",
    "pg-hstore": "^2.3.3",
    "prettier": "^2.0.5",
    "semantic-release": "^17.3.3",
    "sequelize": "^5.21.9",
    "sequelize-cli": "^5.5.1",
    "sqlite3": "^4.2.0",
    "yup": "^0.29.0"
  },
  "devDependencies": {
    "eslint": "^6.8.0",
    "eslint-config-airbnb-base": "^14.1.0",
    "eslint-plugin-import": "^2.20.2",
    "nodemon": "^2.0.3",
    "prettier": "^2.0.5",
    "sucrase": "^3.13.0"
  },
```

# API

Responsável pelo gerenciamento de todos os laboratórios e exames da rede nacional brasileira, a API foi dividida em módulos orientados por responsabilidades isoladas, definidos a seguir.

# Usuários

Módulo responsável por fazer o gerenciamento de usuários, tais como, cadastros, autenticação e alteração de dados. Possui os seguintes end-points:

### POST {URL_API}/users

Cria um novo usuário.

* **Resquest body:**

  ```javascript
    {
      name: "Rafael Godoy",
      email: "rafael145.godoy@dasa.com",
      password: "teste1234",
      password_confirm: "teste1234"
    }
  ```
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
  ```javascript
    {
        status: "true",
        user: {
          id_users: 1,
          name: "Rafael Godoy",
          email: "rafael145.godoy@dasa.com",
          password: "U2FsdGVkX19qaqh4sxXX32e36P49B5Tx9y07bU8kA8U=",
          status: "active"
        }
    }
  ```

* **Error Response:**

  * **Code:** 403: Forbidden <br />
    **Content:** 
  ```javascript
    {
      status: "error",
      statusCode: 403,
      message: "Email exists in database"
    }
  ```

  OU

  * **Code:** 400: Bad Request <br />
    **Content:** 
  ```javascript
    {
      status: "error",
      statusCode: 400,
      message: [
        "password doesn't match"
      ]
    }
  ```

### POST {URL_API}/users/sessions

Autentica um usuário na API.

* **Resquest body:**

  ```javascript
    {
      email: "rafael145.godoy@dasa.com",
      password: "teste1234"
    }
  ```
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
  ```javascript
    {
          status: "true",
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxLCJuYW1lIjoiUmFmYWVsIEdvZG95IiwiZW1haWwiOiJyYWZhZWwxNDUuZ29kb3lAZGFzYS5jb20iLCJpYXQiOjE2MTE5MzYxODYsImV4cCI6MTYxMTkzODU4Nn0.N6MfEdwtdkCq4XNCOeiB60_ps5ZpDBg7FSnZRuCnSRs",
          user: {
            id_users: 1,
            name: "Rafael Godoy",
            email: "rafael145.godoy@dasa.com",
            password: "U2FsdGVkX19qaqh4sxXX32e36P49B5Tx9y07bU8kA8U=",
            status: "active"
          }
    }
  ```

* **Error Response:**

  * **Code:** 401: Unauthorized <br />
    **Content:** 
  ```javascript
    {
      status: "error",
      statusCode: 401,
      message: "Email or password is wrong"
    }
  ```

### PUT {URL_API}/users/:idUser

Atualizar os dados de um usuário.

* **Resquest body:**

  ```javascript
    {
      name: "Rafael Godoy",
      email: "rafael145.godoy@dasa.com"
    }
  ```
*  **URL Params**

   **Required:**
 
   `idUser=[integer]`

*  **Bearer Token**

   **Required:**
 
   `token=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
  ```javascript
    {
      status: "true",
      message: "User update successfully"          
    }
  ```

* **Error Response:**

  * **Code:** 401: Unauthorized <br />
    **Content:** 
  ```javascript
    {
      status: "error",
      statusCode: 401,
      message: "Invalid token"
    }
  ```

  OU

  * **Code:** 400: Bad Request <br />
    **Content:** 
  ```javascript
    {
      status: "error",
      statusCode: 400,
      message: [
        "password doesn't match"
      ]
    }
  ```

  OU

  * **Code:** 403: Forbidden <br />
    **Content:** 
  ```javascript
    {
      status: "error",
      statusCode: 403,
      message: [
        "The user does't matched with searched id"
      ]
    }
  ```


### GET {URL_API}/users/:idUser

Mostrar os dados de um usuário.

*  **URL Params**

   **Required:**
 
   `idUser=[integer]`

*  **Bearer Token**

   **Required:**
 
   `token=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
  ```javascript
    {
      status: "true",
      user: {
        id_users: 1,
        name: "Rafael D G Godoy",
        email: "rafael.godoy1@dasa.com",
        password: "teste1234",
        status: "active"
      }
    }
  ```

* **Error Response:**

  * **Code:** 401: Unauthorized <br />
    **Content:** 
  ```javascript
    {
      status: "error",
      statusCode: 401,
      message: "Invalid token"
    }
  ```

  OU

  * **Code:** 403: Forbidden <br />
    **Content:** 
  ```javascript
    {
      status: "error",
      statusCode: 403,
      message: [
        "The user does't matched with searched id"
      ]
    }
  ```

### PATCH {URL_API}/users/:idUser/password-change

Atualizar a senha de um usuário.

*  **URL Params**

   **Required:**
 
   `idUser=[integer]`

*  **Bearer Token**

   **Required:**
 
   `token=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
  ```javascript
    {
      status: "true",
      message: "User password updated successfully"
    }
  ```

* **Error Response:**

  * **Code:** 401: Unauthorized <br />
    **Content:** 
  ```javascript
    {
      status: "error",
      statusCode: 401,
      message: "Invalid token"
    }
  ```

  OU

  * **Code:** 403: Forbidden <br />
    **Content:** 
  ```javascript
    {
      status: "error",
      statusCode: 403,
      message: "You dont't have permission for change this password"
    }
  ```

# Laboratórios

Módulo responsável por gerenciar todos os laboratórios da rede brasileira, permitindo cadastrar, editar, excluir e listar.

### POST {URL_API}/laboratories

Cadastra um novo laboratório na API.

* **Resquest body:**

  ```javascript
    {
      name: "lab2",
      address: "address test 2"
    }
  ```

*  **Bearer Token**

   **Required:**
 
   `token=[string]`
   
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
  ```javascript
    {
      status: "true",
      laboratory: {
        id_laboratories: 2,
        name: "lab2",
        address: "address test 2",
        status: "active"
      }
    }
  ```
  
* **Error Response:**

  * **Code:** 401: Unauthorized <br />
    **Content:** 
  ```javascript
    {
      status: "error",
      statusCode: 401,
      message: "Invalid token"
    }
  ```

  OU

  * **Code:** 400: Unauthorized <br />
    **Content:** 
  ```javascript
    {
      status: "error",
      statusCode: 400,
      message: [
        "address is a required field"
      ]
    }
  ```

### PUT {URL_API}/laboratories/:idLaboratory

Atualiza um novo laboratório na API.

* **Resquest body:**

  ```javascript
    {
      name: "lab2",
      address: "address test 2"
    }
  ```

*  **URL Params**

   **Required:**
 
   `idLaboratory=[integer]`

*  **Bearer Token**

   **Required:**
 
   `token=[string]`
   
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
  ```javascript
    {
      status: "true",
      message: "Laboratory update successfully"
    }
  ```
  
* **Error Response:**

  * **Code:** 401: Unauthorized <br />
    **Content:** 
  ```javascript
    {
      status: "error",
      statusCode: 401,
      message: "Invalid token"
    }
  ```

  OU

  * **Code:** 400: Unauthorized <br />
    **Content:** 
  ```javascript
    {
      status: "error",
      statusCode: 400,
      message: [
        "address is a required field"
      ]
    }
  ```

### GET {URL_API}/laboratories/:idLaboratory

Mostra as informações de um laboratório.

*  **URL Params**

   **Required:**
 
   `idLaboratory=[integer]`

*  **Bearer Token**

   **Required:**
 
   `token=[string]`
   
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
  ```javascript
    {
      status: "true",
      laboratory: {
        id_laboratories: 2,
        name: "Hettinger - Kassulke",
        address: "76898 Easter Street",
        status: "disabled"
      }
    }
  ```
  
* **Error Response:**

  * **Code:** 401: Unauthorized <br />
    **Content:** 
  ```javascript
    {
      status: "error",
      statusCode: 401,
      message: "Invalid token"
    }
  ```

  OU

  * **Code:** 500: Server Error <br />
    **Content:** 
  ```javascript
    {
      status: "error",
      statusCode: 500,
      message: {}
    }
  ```

### GET {URL_API}/laboratories

Mostra as informações de todos os laboratórios.

*  **Bearer Token**

   **Required:**
 
   `token=[string]`
   
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
  ```javascript
    {
      status: "true",
      laboratories: [
        {
          id_laboratories: 20,
          name: "Waelchi, Runolfsdottir and Crooks",
          address: "3430 Waters Roads",
          status: "active",
          exams: [
            {
              id_exams: 8,
              name: "Chad",
              type: "clinical_analysis",
              status: "active"
            },
            {
              id_exams: 25,
              name: "application",
              type: "clinical_analysis",
              status: "active"
            },
            {
              id_exams: 6,
              name: "deposit",
              type: "clinical_analysis",
              status: "active"
            }
          ]
        },
        {
          id_laboratories: 5,
          name: "O'Hara, Gorczany and Funk",
          address: "55315 Flatley Locks",
          status: "active",
          exams: []
        },
        {
          id_laboratories: 6,
          name: "Bosco, Kling and Turner",
          address: "636 Goyette Brooks",
          status: "active",
          exams: []
        }
      ]
    }
  ```
  
* **Error Response:**

  * **Code:** 401: Unauthorized <br />
    **Content:** 
  ```javascript
    {
      status: "error",
      statusCode: 401,
      message: "Invalid token"
    }
  ```

  OU

  * **Code:** 500: Server Error <br />
    **Content:** 
  ```javascript
    {
      status: "error",
      statusCode: 500,
      message: {}
    }
  ```

### DEL {URL_API}/laboratories/:idLaboratory

Deleta um laboratório.

*  **URL Params**

   **Required:**
 
   `idLaboratory=[integer]`

*  **Bearer Token**

   **Required:**
 
   `token=[string]`
   
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
  ```javascript
    {
      status: "true",
      message: "The laboratory was deleted successfully"
    }
  ```
  
* **Error Response:**

  * **Code:** 401: Unauthorized <br />
    **Content:** 
  ```javascript
    {
      status: "error",
      statusCode: 401,
      message: "Invalid token"
    }
  ```

  OU

  * **Code:** 500: Server Error <br />
    **Content:** 
  ```javascript
    {
      status: "error",
      statusCode: 500,
      message: {}
    }
  ```

# Exames

Módulo responsável por gerenciar todos os exames da rede brasileira, permitindo cadastrar, editar, excluir e listar.

### POST {URL_API}/exams

Cadastra um novo exame na API.

* **Resquest body:**

  ```javascript
    {
      name: "exam 2",
	    type: "clinical_analysis"
    }
  ```

*  **Bearer Token**

   **Required:**
 
   `token=[string]`
   
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
  ```javascript
    {
      status: "true",
      exam: {
        id_exams: 38,
        name: "exam 2",
        type: "clinical_analysis",
        status: "active"
      }
    }
  ```
  
* **Error Response:**

  * **Code:** 401: Unauthorized <br />
    **Content:** 
  ```javascript
    {
      status: "error",
      statusCode: 401,
      message: "Invalid token"
    }
  ```

  OU

  * **Code:** 400: Unauthorized <br />
    **Content:** 
  ```javascript
    {
      status: "error",
      statusCode: 400,
      message: [
        "type is a required field"
      ]
    }
  ```

### PUT {URL_API}/exams/:idExam

Atualiza um exame na API.

* **Resquest body:**

  ```javascript
    {
      name: "exam 3",
	    type: "image"
    }
  ```

*  **URL Params**

   **Required:**
 
   `idExam=[integer]`

*  **Bearer Token**

   **Required:**
 
   `token=[string]`
   
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
  ```javascript
    {
      status: "true",
      message: "Exam update successfully"
    }
  ```
  
* **Error Response:**

  * **Code:** 401: Unauthorized <br />
    **Content:** 
  ```javascript
    {
      status: "error",
      statusCode: 401,
      message: "Invalid token"
    }
  ```

  OU

  * **Code:** 400: Unauthorized <br />
    **Content:** 
  ```javascript
    {
      status: "error",
      statusCode: 400,
      message: [
        "type is a required field"
      ]
    }
  ```

### GET {URL_API}/exams/:idExam

Mostra as informações de um exame.

*  **URL Params**

   **Required:**
 
   `idExam=[integer]`

*  **Bearer Token**

   **Required:**
 
   `token=[string]`
   
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
  ```javascript
    {
      status: "true",
      exam: {
        id_exams: 2,
        name: "exam2",
        type: "image",
        status: "disabled"
      }
    }
  ```
  
* **Error Response:**

  * **Code:** 401: Unauthorized <br />
    **Content:** 
  ```javascript
    {
      status: "error",
      statusCode: 401,
      message: "Invalid token"
    }
  ```

  OU

  * **Code:** 500: Server Error <br />
    **Content:** 
  ```javascript
    {
      status: "error",
      statusCode: 500,
      message: {}
    }
  ```

### GET {URL_API}/exams

Mostra as informações de todos os exames.

*  **Bearer Token**

   **Required:**
 
   `token=[string]`
   
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
  ```javascript
    {
      status: "true",
      exams: [
        {
          id_exams: 8,
          name: "Chad",
          type: "clinical_analysis",
          status: "active",
          laboratories: [
            {
              id_laboratories: 20,
              name: "Waelchi, Runolfsdottir and Crooks",
              address: "3430 Waters Roads",
              status: "disabled"
            },
            {
              id_laboratories: 18,
              name: "Ernser - Kassulke",
              address: "7456 O'Conner Hill",
              status: "disabled"
            },
            {
              id_laboratories: 17,
              name: "Schowalter - Cummerata",
              address: "04260 Adeline Vista",
              status: "disabled"
            },
            {
              id_laboratories: 10,
              name: "Smith, Keeling and Greenfelder",
              address: "832 Lori Glens",
              status: "disabled"
            }
          ]
        },
        {
          id_exams: 13,
          name: "haptic",
          type: "clinical_analysis",
          status: "active",
          laboratories: [
            {
              id_laboratories: 10,
              name: "Smith, Keeling and Greenfelder",
              address: "832 Lori Glens",
              status: "disabled"
            },
            {
              id_laboratories: 18,
              name: "Ernser - Kassulke",
              address: "7456 O'Conner Hill",
              status: "disabled"
            }
          ]
        }
      ]
    }
  ```
  
* **Error Response:**

  * **Code:** 401: Unauthorized <br />
    **Content:** 
  ```javascript
    {
      status: "error",
      statusCode: 401,
      message: "Invalid token"
    }
  ```

  OU

  * **Code:** 500: Server Error <br />
    **Content:** 
  ```javascript
    {
      status: "error",
      statusCode: 500,
      message: {}
    }
  ```

### DEL {URL_API}/exams/:idExam

Deleta um exame.

*  **URL Params**

   **Required:**
 
   `idExam=[integer]`

*  **Bearer Token**

   **Required:**
 
   `token=[string]`
   
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
  ```javascript
    {
      status: "true",
      message: "The exam was deleted successfully"
    }
  ```
  
* **Error Response:**

  * **Code:** 401: Unauthorized <br />
    **Content:** 
  ```javascript
    {
      status: "error",
      statusCode: 401,
      message: "Invalid token"
    }
  ```

  OU

  * **Code:** 500: Server Error <br />
    **Content:** 
  ```javascript
    {
      status: "error",
      statusCode: 500,
      message: {}
    }
  ```


# Associar exames aos laboratórios

Aréa responsável por associar e desvincultar exames a laboratórios

### POST {URL_API}/laboratories/:idLaboratory/exams/:idExam/associate

Associa um exame a um laboratório.

*  **URL Params**

   **Required:**
 
   `idLaboratory=[integer]`
   `idExam=[integer]`

*  **Bearer Token**

   **Required:**
 
   `token=[string]`
   
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
  ```javascript
    {
      status: "true",
      exams_laboratories: {
        id_exams_laboratories: 12,
        id_laboratories: 20,
        id_exams: 6
      }
    }
  ```
  
* **Error Response:**

  * **Code:** 401: Unauthorized <br />
    **Content:** 
  ```javascript
    {
      status: "error",
      statusCode: 401,
      message: "Invalid token"
    }
  ```

  OU

  * **Code:** 500: Server Error <br />
    **Content:** 
  ```javascript
    {
      status: "error",
      statusCode: 500,
      message: {}
    }
  ```

### DEL {URL_API}/exams-laboratories/:idExamLaboratory

Desvincular um exame de um laboratório.

*  **URL Params**

   **Required:**
 
   `idExamLaboratory=[integer]`

*  **Bearer Token**

   **Required:**
 
   `token=[string]`
   
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
  ```javascript
    {
      status: "true",
      message: "The exam-laboratory association was deleted successfully"
    }
  ```
  
* **Error Response:**

  * **Code:** 401: Unauthorized <br />
    **Content:** 
  ```javascript
    {
      status: "error",
      statusCode: 401,
      message: "Invalid token"
    }
  ```

  OU

  * **Code:** 500: Server Error <br />
    **Content:** 
  ```javascript
    {
      status: "error",
      statusCode: 500,
      message: {}
    }
  ```
