# API Restaurante – Sistema de Autoatendimento

## Descrição

API REST para um sistema de autoatendimento de restaurante. O objetivo da aplicação é organizar o cardápio digital de forma modular e escalável, permitindo cadastrar categorias (ex.: Pizzas, Bebidas, Sobremesas) e os produtos associados a cada categoria. Assim, os clientes podem consultar itens, preços e disponibilidade de forma autônoma.

**Objetivo da API:** fornecer endpoints para gerenciar o ciclo de vida completo (CRUD) de categorias e produtos, com persistência no Supabase (PostgreSQL), validação de regras de negócio em classes de domínio e testes automatizados.

---

## Identificação do estudante

* **Nome:** Leofredo Junior
* **Curso:** Engenharia de Software – 4º Período – Turma B (sex)
* **Disciplina:** Desenvolvimento Back-End

---

## Tecnologias e Padrões Utilizados

* **Linguagem & Runtime:** Node.js (v20+ / v22+) & TypeScript
* **Framework Web:** Express 5
* **Banco de Dados:** PostgreSQL (via Supabase Client `@supabase/supabase-js`)
* **Testes Automatizados:** Vitest
* **Padrões de Arquitetura:**
  * **Repository Pattern:** Separação completa entre regras de negócio e camada de acesso a dados (`CategoryRepository`, `ProductRepository`).
  * **Orientação a Objetos (POO):** Modelos de domínio ricos (`Category`, `Product`) com atributos privados, encapsulamento, setters com validação e método estático de restauração (`restore`).
  * **Tratamento de Erros Personalizado:** Classes de exceção dedicadas (`ValidationError`, `NotFoundError`).

---

## Estrutura do Projeto

```
src/
├── config/             # Configuração e inicialização do cliente Supabase
├── controller/         # Manipuladores de requisições e respostas HTTP (Controllers)
├── errors/             # Classes customizadas de erros (ValidationError, NotFoundError)
├── models/             # Classes de domínio com encapsulamento e validações (POO)
├── repository/         # Acesso ao banco de dados Supabase (Repository Pattern)
├── routes/             # Definição e roteamento dos endpoints da API
├── tests/              # Testes unitários automatizados com Vitest
├── app.ts              # Configuração do Express, middlewares e rotas
└── server.ts           # Inicialização do servidor HTTP
```

---

## Entidades e Relacionamentos

### Category (`categories`)

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | UUID | Identificador único (Chave Primária) |
| `name` | varchar(100) | Nome da categoria (obrigatório, sem espaços vazios) |
| `description` | varchar(255) | Descrição detalhada da categoria |
| `icon` | varchar(10) | Emoji ou ícone representativo |
| `display_order` | integer | Ordem de exibição no cardápio (inteiro $\ge 0$) |
| `active` | boolean | Status de ativação da categoria (padrão: `true`) |
| `created_at` | timestamptz | Data e hora de criação |
| `updated_at` | timestamptz | Data e hora da última modificação |

### Product (`products`)

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | UUID | Identificador único (Chave Primária) |
| `category_id` | UUID | Chave estrangeira referenciando `categories(id)` |
| `title` | varchar(150) | Nome/Título do produto (obrigatório) |
| `description` | varchar(500) | Descrição do item e ingredientes |
| `price` | numeric(10,2) | Preço do produto (obrigatório, maior que zero) |
| `image` | varchar(255) | URL da imagem do item |
| `available` | boolean | Disponibilidade no cardápio (padrão: `true`) |
| `active` | boolean | Status de ativação (padrão: `true`) |
| `created_at` | timestamptz | Data e hora de criação |
| `updated_at` | timestamptz | Data e hora da última modificação |

### Relacionamento
* **Category 1 : N Product** – Uma categoria pode conter múltiplos produtos vinculados. Cada produto pertence a exatamente uma categoria (`category_id`).

---

## Banco de Dados (Supabase)

Script SQL para execução no **SQL Editor** do Supabase:

```sql
create table categories (
    id uuid primary key default gen_random_uuid(),
    name varchar(100) not null,
    description varchar(255),
    icon varchar(10),
    display_order integer not null,
    active boolean not null default true,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

create table products (
    id uuid primary key default gen_random_uuid(),
    category_id uuid not null,
    title varchar(150) not null,
    description varchar(500),
    price numeric(10, 2) not null,
    image varchar(255),
    available boolean not null default true,
    active boolean not null default true,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now(),

    constraint fk_products_category
        foreign key (category_id)
        references categories(id)
        on delete cascade
);
```

---

## Como Configurar e Executar

### 1. Clonar o repositório
```bash
git clone https://github.com/SithScript/restaurant-ordering-system.git
cd restaurant-ordering-system
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar variáveis de ambiente
Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```
Preencha com os dados do seu projeto Supabase:
```env
PORT=3000
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SECRET_KEY=sua-chave-secreta-service-role
```

### 4. Executar a aplicação
* **Modo de desenvolvimento (com auto-reload):**
  ```bash
  npm run dev
  ```
* **Executar os testes automatizados (Vitest):**
  ```bash
  npm test
  ```
* **Build e produção:**
  ```bash
  npm run build
  npm start
  ```

---

## Documentação dos Endpoints

### Categorias (`/categories`)

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/categories` | Lista todas as categorias |
| `GET` | `/categories/:id` | Retorna uma categoria por ID |
| `GET` | `/categories/search/:keyword` | Pesquisa categorias por palavra-chave (nome ou descrição) |
| `POST` | `/categories` | Cadastra uma nova categoria |
| `PUT` | `/categories/:id` | Atualiza os dados de uma categoria existente |
| `DELETE` | `/categories/:id` | Remove uma categoria pelo ID |

### Produtos (`/products`)

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/products` | Lista todos os produtos |
| `GET` | `/products/:id` | Retorna um produto por ID |
| `GET` | `/products/category/:categoryId` | Lista todos os produtos de uma categoria específica |
| `GET` | `/products/search/:keyword` | Pesquisa produtos por palavra-chave |
| `POST` | `/products` | Cadastra um novo produto |
| `PUT` | `/products/:id` | Atualiza os dados de um produto existente |
| `DELETE` | `/products/:id` | Remove um produto pelo ID |

---

## Exemplos de Requisições

### Criar Categoria (`POST /categories`)
```json
{
  "name": "Pizzas",
  "description": "Pizzas artesanais de fermentação natural",
  "icon": "🍕",
  "display_order": 1
}
```

### Criar Produto (`POST /products`)
```json
{
  "category_id": "e89d1b64-8df6-4ad9-90b4-7164eb3a1f89",
  "title": "Pizza Margherita Especial",
  "description": "Molho de tomate pelado, mussarela de búfala e manjericão fresco",
  "price": 49.90,
  "image": "https://exemplo.com/pizza-margherita.jpg"
}
```

### Atualizar Produto (`PUT /products/:id`)
```json
{
  "price": 54.90,
  "available": true
}
```

---

## Códigos de Resposta HTTP

| Código | Significado |
|---|---|
| `200 OK` | Consulta, atualização ou remoção concluída com sucesso |
| `201 Created` | Novo registro criado com sucesso |
| `400 Bad Request` | Falha de validação ou parâmetros ausentes/inválidos |
| `404 Not Found` | Recurso (categoria ou produto) não encontrado |
| `500 Internal Server Error` | Erro interno do servidor ou falha de banco de dados |
