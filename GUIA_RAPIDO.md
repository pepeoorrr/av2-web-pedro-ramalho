# ⚡ GUIA RÁPIDO - Começar em 5 minutos

Seguir este guia passo a passo para colocar o sistema funcionando.

---

## 📋 Pré-requisitos Rápidos

```bash
# 1. Verificar Node.js
node --version

# 2. Verificar MySQL (deve estar rodando)
mysql -u root -p
# Se pediu senha, você pode deixar em branco ou digitar sua senha
```

---

## 🚀 INÍCIO RÁPIDO

### Terminal 1: Backend

```bash
cd backend

# Instalar dependências
npm install

# Configurar banco de dados (escolha UM):
# Opção A: Se seu MySQL está sem senha
npx prisma migrate dev --name initial

# Opção B: Se seu MySQL tem senha, edite .env.local PRIMEIRO
# Edite backend/.env.local com seus dados do MySQL
# DATABASE_URL="mysql://usuario:senha@localhost:3306/sistema_agendamento"

# Popular banco com dados de teste (opcional)
npm run seed

# Iniciar servidor
npm run dev
```

✅ Você deve ver:
```
Conexão bem-sucedida com o banco de dados!
Servidor rodando em http://localhost:3000
```

---

### Terminal 2: Frontend

```bash
cd frontend

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

✅ Acesse: `http://localhost:5173`

---

## 🧪 Testar o Sistema

1. Abrir no navegador: `http://localhost:5173`
2. Clicar em "Novo Agendamento"
3. Preencher o formulário
4. Clicar "Salvar"
5. Ver na lista de agendamentos

---

## 📝 Campos do Formulário

- **Nome do Cliente**: Ex: João Silva
- **Email**: Ex: joao@example.com
- **Telefone**: Ex: (11) 98765-4321
- **Quadra**: Escolher na lista (Quadra 1, 2, 3, 4, ou Futsal)
- **Data**: Selecionar uma data futura
- **Horário**: Escolher horário disponível (08:00 a 19:00)
- **Status**: Pendente (padrão) ou Confirmado
- **Observações**: Adicionar notas (opcional)

---

## 🔧 Troubleshooting Rápido

### ❌ "Cannot connect to database"
```bash
# Verificar MySQL está rodando
mysql -u root -p

# Se não sabe a senha, deixe em branco e pressione ENTER
```

### ❌ "Port 3000 already in use"
```bash
# Mudar porta em backend/.env.local
PORT=3001

# E depois no frontend, editar .env.local
VITE_API_URL=http://localhost:3001
```

### ❌ "npm ERR! node_modules"
```bash
# Limpar e reinstalar
rm -rf node_modules package-lock.json
npm install
```

---

## 📊 Dados de Teste

Se executou `npm run seed`, já tem:
- ✓ 5 agendamentos de exemplo
- ✓ Datas no futuro
- ✓ Status variados (confirmado, pendente)

---

## 🎯 Verificar Tudo Funciona

1. **Dashboard** - Ver estatísticas
2. **Novo Agendamento** - Criar um agendamento
3. **Listagem** - Ver todos os agendamentos
4. **Filtros** - Filtrar por quadra, status, data
5. **Editar** - Clicar "Editar" e modificar um agendamento
6. **Deletar** - Clicar "Deletar" e confirmar exclusão

---

## 📚 Estrutura de Pastas Importante

```
backend/
├── src/
│   ├── controllers/tarefaController.js  # Lógica HTTP
│   ├── models/tarefaModel.js            # Lógica do banco
│   ├── routes/tarefaRoutes.js           # Rotas /agendamentos
│   └── app.js                           # Configuração Express
└── prisma/
    └── schema.prisma                    # Estrutura do banco

frontend/
├── src/
│   ├── components/                      # Componentes React
│   ├── pages/                           # Páginas (Home, Agendamentos...)
│   ├── services/api.js                  # Cliente HTTP
│   ├── App.jsx                          # Rotas principais
│   └── index-tailwind.css               # Estilos
└── tailwind.config.js                   # Configuração Tailwind
```

---

## ✨ Exemplos de Uso

### Criar Agendamento
```bash
curl -X POST http://localhost:3000/agendamentos \
  -H "Content-Type: application/json" \
  -d '{
    "nomeCliente": "João Silva",
    "email": "joao@example.com",
    "telefone": "(11) 98765-4321",
    "quadra": "Quadra 1",
    "data": "2026-06-20",
    "horario": "10:00",
    "status": "confirmado"
  }'
```

### Listar Agendamentos
```bash
curl http://localhost:3000/agendamentos
```

### Filtrar
```bash
curl "http://localhost:3000/agendamentos?quadra=Quadra%201&status=confirmado"
```

---

## 💡 Dicas

- **Dados de teste**: Execute `npm run seed` no backend
- **Dashboard**: Veja estatísticas na página inicial
- **Filtros**: Use filtros para encontrar agendamentos específicos
- **Responsividade**: O design funciona em celular, tablet e desktop

---

## 🎓 Próximas Melhorias (Opcional)

- [ ] Autenticação de usuários
- [ ] Enviar emails de confirmação
- [ ] Notificações push
- [ ] Dark mode
- [ ] Exportar em PDF
- [ ] Integração com calendário

---

**Pronto! Seu sistema está funcionando! 🎉**

Para mais detalhes, veja [README.md](README.md)
