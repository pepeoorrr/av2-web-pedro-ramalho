# 🎯 PRÓXIMAS ETAPAS - EXECUTE AGORA!

Este documento mostra EXATAMENTE o que fazer para colocar o sistema funcionando.

---

## ⚠️ PRÉ-REQUISITOS

Antes de tudo, certifique-se de que tem:

### 1. Node.js instalado

```bash
node --version
# Deve mostrar algo como: v18.0.0 ou superior
```

Se não tiver: https://nodejs.org/

### 2. MySQL/MariaDB instalado E RODANDO

```bash
# Windows:
mysql -u root -p

# Se pedir senha, tente deixar em branco ou digitar sua senha
# Se conectar com sucesso, tipo Ctrl+C para sair
```

Se não tiver: https://www.mysql.com/ ou https://mariadb.org/

---

## 📋 PASSO A PASSO - CONFIGURAÇÃO DO BANCO

### Passo 1: Abrir MySQL

**Windows (Command Prompt ou PowerShell):**
```bash
mysql -u root -p
```

Se tiver senha, digitar. Se não, só pressionar ENTER.

### Passo 2: Criar banco de dados

```sql
CREATE DATABASE sistema_agendamento;
EXIT;
```

✅ Pronto! Banco criado.

---

## 🔧 PASSO A PASSO - CONFIGURAR BACKEND

### Passo 1: Abrir terminal/CMD na pasta do projeto

```bash
# Windows
cd C:\Users\seu_usuario\Documents\av2-web-pedroramalho\av2-web-pedro-ramalho\backend
```

### Passo 2: Verificar/Editar .env.local

Abrir arquivo `backend/.env.local`:

```
DATABASE_URL="mysql://root:@localhost:3306/sistema_agendamento"
PORT=3000
NODE_ENV=development
```

**Ajustar se necessário:**
- `root` = seu usuário MySQL
- Vazio depois de `:` = sua senha (deixar vazio se não tem)
- `localhost:3306` = seu host:porta

### Passo 3: Instalar dependências

```bash
npm install
```

Vai levar 1-2 minutos...

✅ Será criada pasta `node_modules`

### Passo 4: Criar tabelas no banco

```bash
npx prisma migrate dev --name initial
```

Vai pedir "Enter a name": digitar `initial` e ENTER

✅ Tabelas criadas no banco

### Passo 5: Opcional - Popular com dados de teste

```bash
npm run seed
```

Isso vai:
- Criar 5 agendamentos de teste
- Populr o banco automaticamente

✅ Dados de teste prontos

### Passo 6: Iniciar servidor backend

```bash
npm run dev
```

✅ Você deve ver:
```
Conexão bem-sucedida com o banco de dados!
Servidor rodando em http://localhost:3000
```

**DEIXAR ESTE TERMINAL ABERTO!**

---

## 🎨 PASSO A PASSO - CONFIGURAR FRONTEND

### Passo 1: Abrir NOVO terminal (não fechar o anterior!)

```bash
cd C:\Users\seu_usuario\Documents\av2-web-pedroramalho\av2-web-pedro-ramalho\frontend
```

### Passo 2: Verificar/Editar .env.local

Arquivo `frontend/.env.local`:

```
VITE_API_URL=http://localhost:3000
```

Se o backend estiver em outra porta, ajustar aqui.

### Passo 3: Instalar dependências

```bash
npm install
```

Vai levar 2-3 minutos...

✅ Pasta `node_modules` criada

### Passo 4: Iniciar servidor frontend

```bash
npm run dev
```

✅ Você deve ver:
```
  VITE v8.0.10  ready in 250 ms

  ➜  Local:   http://localhost:5173/
  ➜  Press h to show help
```

**DEIXAR ESTE TERMINAL ABERTO!**

---

## 🌐 ACESSAR A APLICAÇÃO

1. Abrir navegador
2. Ir para: **`http://localhost:5173`**
3. Você deve ver a página Home com "QuadraBook"

---

## 🧪 TESTES RÁPIDOS

### Teste 1: Dashboard

1. ✅ Ver página inicial
2. ✅ Ver 4 cards de estatísticas
3. ✅ Se executou seed: números devem aparecer

### Teste 2: Criar Agendamento

1. Clicar "Novo Agendamento" ou "+ Novo" no menu
2. Preencher formulário:
   - Nome: "Seu Nome"
   - Email: "seu@email.com"
   - Telefone: "(11) 98765-4321"
   - Quadra: "Quadra 1"
   - Data: Escolher uma data futura
   - Horário: "10:00"
3. Clicar "Salvar Agendamento"
4. ✅ Se funcionou: retorna para listagem e aparece o novo agendamento

### Teste 3: Listar

1. Clicar "Agendamentos" no menu
2. ✅ Ver todos os agendamentos como cards
3. ✅ Cada card mostra informações

### Teste 4: Filtrar

1. Em Agendamentos, usar filtros (Quadra, Status, Data)
2. ✅ Lista atualiza automaticamente

### Teste 5: Editar

1. Em um card, clicar "Editar"
2. ✅ Formulário abre com dados preenchidos
3. Mudar algo
4. Clicar "Salvar Agendamento"
5. ✅ Mudança aparece na lista

### Teste 6: Deletar

1. Em um card, clicar "Deletar"
2. ✅ Modal de confirmação aparece
3. Clicar "Excluir"
4. ✅ Agendamento desaparece da lista

---

## 🆘 SE ALGO DER ERRADO

### ❌ "Cannot connect to database"

```bash
# Verificar se MySQL está rodando
mysql -u root -p

# Se não conectar, iniciar MySQL
# Windows: Services > MySQL (Start)
# Mac: Brew services start mysql
# Linux: sudo service mysql start
```

### ❌ "Port 3000 already in use"

```bash
# Mudar porta em backend/.env.local
PORT=3001

# E depois em frontend/.env.local
VITE_API_URL=http://localhost:3001
```

### ❌ "npm ERR! gyp ERR!"

```bash
# Limpar cache
rm -rf node_modules package-lock.json

# Reinstalar
npm install
```

### ❌ Frontend não conecta com backend

```bash
# Verificar frontend/.env.local
# Deve ter: VITE_API_URL=http://localhost:3000
# Salvar e recarregar navegador (F5 ou Ctrl+R)
```

### ❌ "Port 5173 already in use"

```bash
# Frontend tentará porta 5174, 5175, etc automaticamente
# Ou mude em frontend/vite.config.js
```

---

## 📊 VERIFICAR SE TUDO ESTÁ OK

### Terminal Backend deve mostrar:
```
Conexão bem-sucedida com o banco de dados!
Servidor rodando em http://localhost:3000
```

### Terminal Frontend deve mostrar:
```
➜  Local:   http://localhost:5173/
```

### Navegador deve mostrar:
- Logo "🏐 QuadraBook"
- Título "Bem-vindo ao QuadraBook!"
- 4 cards de estatísticas
- Botão "Novo Agendamento"

---

## 💾 GIT - Salvar o Trabalho

Quando tudo estiver funcionando:

```bash
# Na raiz do projeto
git add .
git commit -m "Sistema completo e funcional"
git push origin main
```

---

## 📚 ARQUIVOS ÚTEIS

- `README.md` - Documentação completa
- `GUIA_RAPIDO.md` - Início rápido
- `CHECKLIST.md` - Verificar tudo funciona
- `ANALISE_FINAL.md` - Antes e depois das melhorias
- `PROXIMAS_ETAPAS.md` - Este arquivo

---

## 🎯 ESTRUTURA FINAL

```
av2-web-pedro-ramalho/
├── backend/
│   ├── src/
│   ├── prisma/
│   ├── .env.local (você cria)
│   ├── package.json
│   └── seed.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── index-tailwind.css
│   ├── .env.local (você cria)
│   ├── package.json
│   └── tailwind.config.js
├── README.md
├── GUIA_RAPIDO.md
├── CHECKLIST.md
├── ANALISE_FINAL.md
└── PROXIMAS_ETAPAS.md
```

---

## ✅ RESUMO

1. ✅ MySQL rodando com banco `sistema_agendamento`
2. ✅ Backend em `http://localhost:3000`
3. ✅ Frontend em `http://localhost:5173`
4. ✅ Agendamentos funcionando
5. ✅ Pronto para apresentar!

---

## 🚀 PRONTO?

Seguindo este guia, seu sistema estará 100% funcional em ~15 minutos!

**Boa sorte! 🍀**
