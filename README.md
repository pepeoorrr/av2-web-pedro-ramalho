# 🏐 QuadraBook - Sistema de Agendamento de Quadras Esportivas

**Projeto Acadêmico** - Disciplina: Desenvolvimento de Sistemas Web (DSW)

Um sistema profissional e completo para agendamento de quadras esportivas, desenvolvido com React, Node.js, Express, Prisma e MySQL.

---

## 📋 Índice

1. [Requisitos](#requisitos)
2. [Instalação](#instalação)
3. [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
4. [Execução](#execução)
5. [Estrutura do Projeto](#estrutura-do-projeto)
6. [Funcionalidades](#funcionalidades)
7. [Endpoints da API](#endpoints-da-api)
8. [Tecnologias](#tecnologias)

---

## ✅ Requisitos

- **Node.js** v18+ instalado
- **MySQL** ou **MariaDB** instalado e rodando
- **Git** para versionamento

### Verificar instalação:

```bash
node --version
npm --version
mysql --version
```

---

## 🚀 Instalação

### 1️⃣ Clonar o repositório

```bash
git clone <seu-repositorio>
cd av2-web-pedro-ramalho
```

### 2️⃣ Instalar dependências do Backend

```bash
cd backend
npm install
```

### 3️⃣ Instalar dependências do Frontend

```bash
cd ../frontend
npm install
```

---

## 🗄️ Configuração do Banco de Dados

### 1️⃣ Criar banco de dados MySQL

```sql
CREATE DATABASE sistema_agendamento;
USE sistema_agendamento;
```

### 2️⃣ Configurar variáveis de ambiente (Backend)

Criar arquivo `.env.local` na pasta `backend/`:

```env
DATABASE_URL="mysql://root:@localhost:3306/sistema_agendamento"
PORT=3000
NODE_ENV=development
```

**⚠️ Ajustar credenciais** de acordo com seu MySQL:
- `root` = seu usuário MySQL
- Deixar vazio ou adicionar senha se houver
- `localhost:3306` = seu host e porta

### 3️⃣ Executar migrações do Prisma

```bash
cd backend
npx prisma migrate dev --name initial
```

Isso vai:
- Criar as tabelas automaticamente
- Gerar o cliente Prisma

### 4️⃣ Popular banco com dados de teste (opcional)

```bash
npm run seed
```

---

## ▶️ Execução

### Terminal 1 - Backend

```bash
cd backend
npm run dev
```

O servidor será iniciado em `http://localhost:3000`

Você verá:
```
Conexão bem-sucedida com o banco de dados!
Servidor rodando em http://localhost:3000
```

### Terminal 2 - Frontend

```bash
cd frontend
npm run dev
```

A aplicação estará disponível em `http://localhost:5173` (ou similar)

---

## 📁 Estrutura do Projeto

```
av2-web-pedro-ramalho/
│
├── backend/
│   ├── src/
│   │   ├── controllers/        # Lógica de requisições HTTP
│   │   ├── models/             # Operações com banco de dados
│   │   ├── routes/             # Definição de rotas
│   │   ├── config/             # Configurações (Prisma, etc)
│   │   ├── app.js              # Aplicação Express
│   │   └── server.js           # Inicialização
│   ├── prisma/
│   │   └── schema.prisma       # Schema do banco de dados
│   ├── seed.js                 # Script de seed
│   ├── package.json            # Dependências
│   └── .env.local              # Variáveis de ambiente
│
└── frontend/
    ├── src/
    │   ├── components/         # Componentes React reutilizáveis
    │   │   ├── Navbar.jsx
    │   │   ├── Alert.jsx
    │   │   ├── Modal.jsx
    │   │   ├── CardAgendamento.jsx
    │   │   ├── FormularioAgendamento.jsx
    │   │   ├── Loading.jsx
    │   │   ├── StatCard.jsx
    │   │   └── index.js
    │   ├── pages/              # Páginas da aplicação
    │   │   ├── Home.jsx        # Dashboard
    │   │   ├── Agendamentos.jsx # Listagem
    │   │   ├── NovoAgendamento.jsx
    │   │   ├── EditarAgendamento.jsx
    │   │   └── index.js
    │   ├── services/           # Cliente HTTP/API
    │   │   └── api.js
    │   ├── hooks/              # Custom React hooks (expandível)
    │   ├── context/            # Context API (expandível)
    │   ├── App.jsx             # Componente principal com rotas
    │   ├── main.jsx            # Entrada da aplicação
    │   ├── index-tailwind.css   # Estilos globais
    │   └── App.css             # Estilos específicos
    ├── index.html              # Template HTML
    ├── package.json            # Dependências
    ├── vite.config.js          # Configuração Vite
    ├── tailwind.config.js      # Configuração Tailwind CSS
    └── .env.local              # Variáveis de ambiente
```

---

## ✨ Funcionalidades

### ✅ CRUD Completo

- **[GET]** Listar todos os agendamentos
- **[GET]** Obter agendamento por ID
- **[GET]** Obter estatísticas
- **[POST]** Criar novo agendamento
- **[PUT]** Editar agendamento
- **[DELETE]** Excluir agendamento

### ✅ Filtros Avançados

- Filtrar por quadra
- Filtrar por data
- Filtrar por status (Pendente, Confirmado, Cancelado)

### ✅ Interface Responsiva

- ✓ Dashboard com estatísticas
- ✓ Listagem com cards
- ✓ Formulários validados
- ✓ Modal de confirmação
- ✓ Mensagens de sucesso/erro
- ✓ Loading states
- ✓ Design moderno com Tailwind CSS

---

## 🔌 Endpoints da API

### Base URL: `http://localhost:3000`

#### Agendamentos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/agendamentos` | Listar todos (com filtros) |
| GET | `/agendamentos/:id` | Obter um específico |
| POST | `/agendamentos` | Criar novo |
| PUT | `/agendamentos/:id` | Atualizar |
| DELETE | `/agendamentos/:id` | Excluir |
| GET | `/agendamentos/stats/resumo` | Obter estatísticas |

#### Exemplos de Requisições

**Listar com filtros:**
```bash
GET /agendamentos?quadra=Quadra%201&status=confirmado&data=2026-06-20
```

**Criar agendamento:**
```bash
POST /agendamentos
Content-Type: application/json

{
  "nomeCliente": "João Silva",
  "email": "joao@example.com",
  "telefone": "(11) 98765-4321",
  "quadra": "Quadra 1",
  "data": "2026-06-20",
  "horario": "10:00",
  "status": "pendente",
  "observacoes": "Primeira vez"
}
```

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Prisma ORM** - ORM para banco de dados
- **MySQL/MariaDB** - Banco de dados

### Frontend
- **React** - Biblioteca UI
- **React Router** - Roteamento
- **Tailwind CSS** - Estilização
- **Vite** - Build tool

### DevTools
- **ESLint** - Linter
- **Nodemon** - Hot reload para backend

---

## 🐛 Troubleshooting

### Erro: "Cannot connect to database"

```bash
# Verificar se MySQL está rodando
mysql -u root -p

# Verificar variáveis em backend/.env.local
```

### Erro: "Port 3000 already in use"

```bash
# Mudar porta em backend/.env.local
PORT=3001
```

### Erro: "npm ERR! gyp ERR!"

```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Documentação Adicional

- [Arquitetura MVC - Backend](backend/ARQUITETURA.md)
- [React Documentation](https://react.dev)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com)

---

## 👤 Autor

**Pedro Ramalho**

---

## 📄 Licença

ISC - Projeto acadêmico

---

**Desenvolvido com ❤️ para DSW**
