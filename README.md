# 🍽️ Restaurant Ordering System

API REST para um sistema de autoatendimento de restaurante, desenvolvida como projeto acadêmico do curso de Engenharia de Software.

## 1. Nome e descrição do projeto

### Restaurant Ordering System

O **Restaurant Ordering System** é uma API desenvolvida para apoiar um sistema de autoatendimento em restaurantes.

O projeto tem como objetivo disponibilizar uma estrutura para gerenciamento do cardápio, permitindo cadastrar, consultar, atualizar, pesquisar e remover **categorias** e **produtos**.

A aplicação utiliza uma API REST desenvolvida com Node.js, TypeScript e Express, com persistência dos dados utilizando Supabase/PostgreSQL.

### Problema que o projeto busca resolver

O projeto busca facilitar a organização e o gerenciamento das informações de um restaurante, centralizando os dados do cardápio em uma API.

Com a API, é possível realizar operações como:

- cadastrar categorias;
- consultar categorias;
- pesquisar categorias;
- atualizar categorias;
- remover categorias;
- cadastrar produtos;
- consultar produtos;
- atualizar produtos;
- remover produtos.

### Objetivo da API

O objetivo da API é disponibilizar os dados do restaurante de forma organizada e acessível por aplicações clientes, como sistemas de autoatendimento, aplicações web ou outras interfaces.

---

# 2. Identificação do estudante

**Estudante:** Leofredo Junior

**Curso:** Engenharia de Software

**Disciplina:** Desenvolvimento Back-End

**Projeto:** Restaurant Ordering System

---

# 3. Tecnologias utilizadas

As principais tecnologias utilizadas no projeto são:

| Tecnologia | Utilização |
|---|---|
| Node.js | Ambiente de execução da aplicação |
| TypeScript | Linguagem utilizada no desenvolvimento |
| Express | Framework para criação da API REST |
| Supabase | Serviço utilizado para acesso ao banco de dados |
| PostgreSQL | Banco de dados utilizado pelo Supabase |
| Git | Controle de versão |
| GitHub | Hospedagem do código-fonte |

O projeto utiliza `express` e `@supabase/supabase-js` como dependências, além de TypeScript e `tsx` para desenvolvimento.

---

# 4. Entidades e relacionamentos

O sistema possui como principais entidades do cardápio:

- **Category**
- **Product**

## 4.1 Category

A entidade `Category` representa uma categoria de produtos do restaurante.

### Principais atributos

| Atributo | Descrição |
|---|---|
| `id` | Identificador único da categoria |
| `name` | Nome da categoria |
| `description` | Descrição da categoria |
| `icon` | Ícone da categoria |
| `display_order` | Ordem de exibição |
| `active` | Indica se a categoria está ativa |

Esses campos são utilizados pelo model de categorias ao inserir e atualizar registros no Supabase.

## 4.2 Product

A entidade `Product` representa um produto disponível no restaurante.

### Principais atributos

| Atributo | Descrição |
|---|---|
| `id` | Identificador único do produto |
| `category_id` | Identificador da categoria relacionada |
| `title` | Nome/título do produto |
| `description` | Descrição do produto |
| `price` | Preço do produto |
| `icon` | Ícone do produto |
| `available` | Indica se o produto está disponível |
| `active` | Indica se o produto está ativo |

Esses campos estão definidos na interface `ProductData` utilizada pelo model de produtos.

## 4.3 Relacionamento

O relacionamento entre as entidades é:

```text
CATEGORY
   │
   │ 1:N
   │
   ▼
PRODUCT
```

Uma categoria pode possuir vários produtos.

Por exemplo:

```text
Pizzas
 ├── Pizza Calabresa
 ├── Pizza Margherita
 └── Pizza Frango com Catupiry

Bebidas
 ├── Coca-Cola
 ├── Guaraná
 └── Água
```

O produto possui o campo `category_id`, utilizado para relacioná-lo à categoria.

---

# 5. Estrutura do projeto

A estrutura principal do projeto é organizada da seguinte forma:

```text
restaurant-ordering-system/
│
├── src/
│   ├── config/
│   │   └── supabase.ts
│   │
│   ├── controller/
│   │   └── CategoryController.ts
│   │
│   ├── models/
│   │   ├── Category.ts
│   │   └── Products.ts
│   │
│   ├── routes/
│   │   └── categoryRoutes.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── .env
├── .gitignore
├── package.json
└── tsconfig.json
```

### `config/`

Responsável pelas configurações externas da aplicação.

O arquivo `supabase.ts` cria o cliente do Supabase utilizando as variáveis de ambiente `SUPABASE_URL` e `SUPABASE_SECRET_KEY`.

### `controller/`

Contém os controllers responsáveis por receber as requisições HTTP e chamar os métodos correspondentes dos models.

O `CategoryController` possui operações para consulta, pesquisa, criação, atualização e remoção de categorias.

### `models/`

Contém a lógica de acesso aos dados.

Os models `Category` e `Products` realizam operações diretamente nas tabelas do Supabase.

### `routes/`

Responsável pelo registro das rotas da API.

O arquivo `categoryRoutes.ts` conecta os endpoints de categorias ao `CategoryController`.

### `app.ts`

Configura o Express, registra os middlewares e conecta as rotas da aplicação.

Também contém atualmente os endpoints relacionados a produtos.

### `server.ts`

Responsável por iniciar o servidor na porta `3000`.

---

# 6. Configuração e execução

## 6.1 Pré-requisitos

Para executar o projeto, é necessário possuir instalado:

- Node.js;
- npm;
- Git;
- uma conta/projeto no Supabase.

## 6.2 Clonar o repositório

Execute no terminal:

```bash
git clone https://github.com/SithScript/restaurant-ordering-system.git
```

Entre na pasta:

```bash
cd restaurant-ordering-system
```

Para utilizar especificamente a versão da aula 06:

```bash
git checkout aula-06-controller-routes-category
```

## 6.3 Instalar as dependências

Execute:

```bash
npm install
```

## 6.4 Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
SUPABASE_URL=sua_url_do_supabase
SUPABASE_SECRET_KEY=sua_chave_secreta_do_supabase
```

As credenciais reais não devem ser publicadas no GitHub.

## 6.5 Executar em desenvolvimento

Execute:

```bash
npm run dev
```

O servidor será iniciado em:

```text
http://localhost:3000
```

O script `dev` utiliza `node --watch`, carrega o `.env` e executa o servidor TypeScript por meio do `tsx`.

## 6.6 Compilar o projeto

Para gerar a versão compilada:

```bash
npm run build
```

## 6.7 Executar a versão compilada

Após a compilação:

```bash
npm start
```

---

# 7. Variáveis de ambiente

A aplicação utiliza as seguintes variáveis:

| Variável | Descrição |
|---|---|
| `SUPABASE_URL` | URL do projeto Supabase |
| `SUPABASE_SECRET_KEY` | Chave utilizada para conexão com o Supabase |

O código de configuração do Supabase obtém essas duas variáveis através de `process.env`.

### `.env.example`

Recomenda-se disponibilizar no repositório um arquivo `.env.example`:

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SECRET_KEY=sua_chave_aqui
```

O arquivo `.env` contendo as credenciais reais não deve ser enviado ao Git.

---

# 8. Banco de dados

O projeto utiliza o **Supabase**, que disponibiliza um banco de dados PostgreSQL.

Atualmente são utilizadas as tabelas:

- `categories`
- `products`

## 8.1 Tabela `categories`

Estrutura utilizada pela aplicação:

```sql
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    icon VARCHAR(10),
    display_order INTEGER NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 8.2 Tabela `products`

A aplicação espera que a tabela `products` possua, no mínimo, os campos utilizados pelo model:

```text
id
category_id
title
description
price
icon
available
active
```

O model realiza operações de consulta, inserção, atualização e exclusão diretamente na tabela `products`.

## 8.3 Relacionamento

```text
categories
     │
     │
     │ 1:N
     ▼
products
```

O campo `products.category_id` representa a categoria à qual o produto pertence.

---

# 9. Documentação dos endpoints

## 9.1 Endpoint principal

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/` | Verifica se a API está funcionando |

### Exemplo de resposta

```json
{
    "message": "API Restaurante",
    "version": "1.0.0"
}
```

---

# 9.2 Categorias

As rotas de categorias estão agrupadas no prefixo:

```text
/categories
```

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/categories` | Lista todas as categorias |
| GET | `/categories/search/:keyword` | Pesquisa categorias por palavra-chave |
| GET | `/categories/:id` | Consulta uma categoria pelo ID |
| POST | `/categories` | Cadastra uma categoria |
| PUT | `/categories/:id` | Atualiza uma categoria |
| DELETE | `/categories/:id` | Remove uma categoria |

As rotas são encaminhadas para os métodos correspondentes do `CategoryController`.

> **Observação:** para que a tabela acima corresponda exatamente ao padrão REST esperado, a rota de atualização deve utilizar `PUT /categories/:id` e a rota de exclusão deve utilizar `DELETE /categories/:id`.

---

# 9.3 Produtos

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/products` | Lista todos os produtos |
| GET | `/products/:id` | Consulta um produto pelo ID |
| POST | `/products` | Cadastra um produto |
| PUT | `/products/:id` | Atualiza um produto |
| DELETE | `/products/:id` | Remove um produto |

Esses endpoints estão implementados diretamente no `app.ts`.

---

# 10. Exemplos de requisições

## 10.1 Criar categoria

### POST

```text
POST /categories
```

### Body

```json
{
    "name": "Pizzas",
    "description": "Pizzas tradicionais e especiais",
    "icon": "🍕",
    "display_order": 1,
    "active": true
}
```

---

## 10.2 Atualizar categoria

### PUT

```text
PUT /categories/ID_DA_CATEGORIA
```

### Body

```json
{
    "name": "Pizzas Especiais",
    "description": "Pizzas tradicionais e especiais da casa",
    "icon": "🍕",
    "display_order": 1,
    "active": true
}
```

---

## 10.3 Pesquisar categoria

### GET

```text
GET /categories/search/pizza
```

A pesquisa utiliza a palavra-chave para procurar correspondências nos campos `name` e `description`.

---

## 10.4 Consultar categoria por ID

### GET

```text
GET /categories/ID_DA_CATEGORIA
```

---

## 10.5 Criar produto

### POST

```text
POST /products
```

### Body

```json
{
    "category_id": "ID_DA_CATEGORIA",
    "title": "Pizza Calabresa",
    "description": "Pizza com molho de tomate, queijo, calabresa e cebola.",
    "price": 49.90,
    "icon": "🍕",
    "available": true,
    "active": true
}
```

Os campos utilizados nesse exemplo correspondem à interface `ProductData` definida no projeto.

---

## 10.6 Atualizar produto

### PUT

```text
PUT /products/ID_DO_PRODUTO
```

### Body

```json
{
    "title": "Pizza Calabresa Especial",
    "description": "Pizza com molho de tomate, queijo, calabresa, cebola e azeitonas.",
    "price": 54.90,
    "available": true,
    "active": true
}
```

---

## 10.7 Consultar produto

### GET

```text
GET /products/ID_DO_PRODUTO
```

---

## 10.8 Remover produto

### DELETE

```text
DELETE /products/ID_DO_PRODUTO
```

---

# 11. Status HTTP utilizados

A API utiliza códigos HTTP para informar o resultado das operações.

| Código | Significado |
|---|---|
| `200` | Requisição realizada com sucesso |
| `400` | Requisição inválida |
| `404` | Recurso não encontrado |
| `500` | Erro interno do servidor |

Exemplo de resposta de erro:

```json
{
    "message": "Erro ao buscar categorias."
}
```

---

# 12. Controle de versão

O projeto utiliza Git para controle de versão e GitHub para armazenamento do código.

Principais comandos:

```bash
git status
```

Verifica o estado dos arquivos.

```bash
git add .
```

Adiciona as alterações para o próximo commit.

```bash
git commit -m "mensagem"
```

Registra as alterações no histórico.

```bash
git push
```

Envia as alterações para o GitHub.

---

# 13. Status do projeto

### Funcionalidades implementadas

- [x] Configuração do Node.js;
- [x] TypeScript;
- [x] Express;
- [x] Configuração do Supabase;
- [x] Model de categorias;
- [x] Model de produtos;
- [x] Controller de categorias;
- [x] Rotas de categorias;
- [x] Consulta de categorias;
- [x] Pesquisa de categorias;
- [x] Cadastro de categorias;
- [x] Atualização de categorias;
- [x] Exclusão de categorias;
- [x] Consulta de produtos;
- [x] Cadastro de produtos;
- [x] Atualização de produtos;
- [x] Exclusão de produtos.

### Próximas evoluções

- [ ] Corrigir e padronizar todas as rotas REST;
- [ ] Separar as rotas de produtos em arquivo próprio;
- [ ] Criar controller específico para produtos;
- [ ] Organizar repositories;
- [ ] Implementar demais entidades do sistema;
- [ ] Ampliar a documentação da API;
- [ ] Adicionar testes automatizados.

---

# 14. Considerações finais

O projeto **Restaurant Ordering System** representa a implementação de uma API REST para um sistema de autoatendimento de restaurante.

A aplicação utiliza TypeScript e Express para disponibilizar os endpoints e Supabase/PostgreSQL para persistência dos dados.

A estrutura do projeto está sendo desenvolvida de forma incremental, permitindo aplicar conceitos de APIs REST, separação de responsabilidades, acesso a banco de dados, controle de versão e organização de aplicações Back-End.
