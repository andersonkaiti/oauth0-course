# OAuth 2.0 — Autenticação com Google

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-000000?style=flat&logo=fastify&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)
![DrizzleORM](https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=flat&logo=drizzle&logoColor=black)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat&logo=zod&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=flat&logo=pnpm&logoColor=white)

Fluxo completo de autenticação OAuth 2.0 com o Google. O frontend inicia o redirecionamento, troca o código de autorização pela API e persiste o JWT retornado para as requisições autenticadas seguintes.

## Stack

| Camada | Tecnologias |
| -------- | ------------- |
| **Frontend** | React 19, TypeScript, Vite 8 |
| **Estilização** | Tailwind CSS v4, Base UI, shadcn |
| **Estado / HTTP** | TanStack Query, Axios, React Router v7, Motion |
| **Backend** | Fastify v5, TypeScript |
| **Banco de dados** | PostgreSQL, Drizzle ORM |
| **Auth / Validação** | @fastify/jwt, @fastify/cors, Zod |
| **Docs** | Swagger, Scalar |

## Fluxo de autenticação

```mermaid
sequenceDiagram
    actor U as Usuário
    participant F as Frontend
    participant G as Google OAuth
    participant A as API
    participant D as Banco de dados

    U->>F: Clica em "Entrar com o Google"
    F->>G: Redireciona para a tela de consentimento
    G->>F: Redireciona para /callback?code=...
    F->>A: POST /auth/google { code }
    A->>G: Troca o código pelo access token
    G-->>A: Retorna o access token
    A->>G: Busca informações do usuário
    G-->>A: Retorna dados do usuário
    A->>D: Upsert do usuário
    D-->>A: Dados do usuário
    A-->>F: Retorna o JWT
    F->>F: Salva o JWT no localStorage
    F->>U: Redireciona para a home
```

## Como rodar

### Pré-requisitos

- Node.js 20+
- pnpm
- PostgreSQL

### 1. Clone o repositório e instale as dependências

```bash
git clone https://github.com/andersonkaiti/oauth0-course.git
cd oauth0-course
pnpm install
```

### 2. Configure as variáveis de ambiente

**API** — crie o arquivo `api/.env`:

```env
PORT=3001
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CLIENT_URL=http://localhost:5173/callback
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=
```

**Frontend** — crie o arquivo `frontend/.env`:

```env
VITE_GOOGLE_CLIENT_ID=
VITE_GOOGLE_CALLBACK_URL=http://localhost:5173/callback
VITE_API_URL=http://localhost:3001
```

> As credenciais do Google (`GOOGLE_CLIENT_ID` e `GOOGLE_CLIENT_SECRET`) podem ser obtidas no [Google Cloud Console](https://console.cloud.google.com/). Adicione `http://localhost:5173/callback` como URI de redirecionamento autorizado.

### 3. Execute as migrations

```bash
cd api && pnpm db:migrate
```

### 4. Inicie os servidores

```bash
# API — http://localhost:3001
cd api && pnpm dev

# Frontend — http://localhost:5173
cd frontend && pnpm dev
```

A documentação da API está disponível em `http://localhost:3001/docs`.
