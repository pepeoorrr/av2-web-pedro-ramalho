# ✅ CHECKLIST DE VERIFICAÇÃO

Use este checklist para garantir que tudo está funcionando corretamente.

---

## 🔧 Fase 1: Configuração

- [ ] Node.js instalado (`node --version`)
- [ ] npm funcionando (`npm --version`)
- [ ] MySQL instalado e rodando
- [ ] Banco `sistema_agendamento` criado
- [ ] `backend/.env.local` configurado com DATABASE_URL correto
- [ ] `frontend/.env.local` configurado com VITE_API_URL

---

## 📦 Fase 2: Instalação

**Backend:**
- [ ] `cd backend` e `npm install` executado
- [ ] `npx prisma migrate dev --name initial` executado com sucesso
- [ ] (Opcional) `npm run seed` executado
- [ ] `prisma/schema.prisma` tem modelo `Agendamento`

**Frontend:**
- [ ] `cd frontend` e `npm install` executado
- [ ] `node_modules` foi criada
- [ ] `package.json` tem `react-router-dom` instalado

---

## 🚀 Fase 3: Inicialização

**Backend (Terminal 1):**
- [ ] `npm run dev` executado na pasta `backend`
- [ ] Mensagem "Conexão bem-sucedida com o banco de dados!" apareceu
- [ ] Mensagem "Servidor rodando em http://localhost:3000" apareceu
- [ ] API respondendo em http://localhost:3000

**Frontend (Terminal 2):**
- [ ] `npm run dev` executado na pasta `frontend`
- [ ] Servidor Vite iniciou (ex: http://localhost:5173)
- [ ] Navegador abriu automaticamente

---

## 🎨 Fase 4: Verificação da Interface

**Home (Dashboard):**
- [ ] Navbar aparececom logo e menu de navegação
- [ ] Título "Bem-vindo ao QuadraBook!" visível
- [ ] 4 cards de estatísticas aparecem (Total, Confirmados, Pendentes, Cancelados)
- [ ] Botão "Novo Agendamento" clicável
- [ ] Seção de funcionalidades com 6 cards

**Agendamentos (Listagem):**
- [ ] Página carrega sem erros
- [ ] Filtros aparecem (Quadra, Status, Data)
- [ ] Botão "Limpar Filtros" funciona
- [ ] Se tiver dados, cards de agendamentos aparecem
- [ ] Cada card mostra: Nome, Email, Quadra, Data, Horário, Status, Observações
- [ ] Botões "Editar" e "Deletar" presentes

**Novo Agendamento:**
- [ ] Formulário carrega completo
- [ ] Campos presentes:
  - Nome do Cliente
  - Email
  - Telefone
  - Quadra (select)
  - Data
  - Horário (select)
  - Status (select)
  - Observações (textarea)
- [ ] Botão "Salvar Agendamento" visível

---

## 🧪 Fase 5: Testes Funcionais

### Teste 1: Criar Agendamento
1. [ ] Clique em "Novo Agendamento"
2. [ ] Preencha todos os campos obrigatórios:
   - Nome: "Teste Silva"
   - Email: "teste@example.com"
   - Telefone: "(11) 98765-4321"
   - Quadra: "Quadra 1"
   - Data: Selecione uma data futura
   - Horário: "10:00"
3. [ ] Clique em "Salvar Agendamento"
4. [ ] Mensagem de sucesso apareceu
5. [ ] Redirecionou para listagem automaticamente
6. [ ] Novo agendamento aparece na lista

### Teste 2: Validação de Formulário
1. [ ] Tente enviar formulário vazio
2. [ ] Erros aparecem nos campos
3. [ ] Tente email inválido
4. [ ] Aviso de email inválido apareceu
5. [ ] Tente telefone com poucos dígitos
6. [ ] Aviso de telefone inválido apareceu
7. [ ] Tente data no passado
8. [ ] Aviso de data no passado apareceu

### Teste 3: Listar Agendamentos
1. [ ] Vá para "Agendamentos"
2. [ ] Todos os agendamentos aparecem
3. [ ] Número total de agendamentos correto

### Teste 4: Filtrar Agendamentos
1. [ ] Selecione uma quadra no filtro
2. [ ] Lista atualiza mostrando apenas aquela quadra
3. [ ] Selecione um status
4. [ ] Lista atualiza para aquele status
5. [ ] Clique "Limpar Filtros"
6. [ ] Todos os agendamentos aparecem novamente

### Teste 5: Editar Agendamento
1. [ ] Clique "Editar" em um agendamento
2. [ ] Formulário carrega com dados preenchidos
3. [ ] Modifique algum campo
4. [ ] Clique "Salvar Agendamento"
5. [ ] Mensagem de sucesso apareceu
6. [ ] Mudança aparece na listagem

### Teste 6: Deletar Agendamento
1. [ ] Clique "Deletar" em um agendamento
2. [ ] Modal de confirmação aparece
3. [ ] Clique "Cancelar"
4. [ ] Modal fecha sem deletar
5. [ ] Clique "Deletar" novamente
6. [ ] Modal aparece
7. [ ] Clique "Excluir" (botão em vermelho)
8. [ ] Agendamento foi removido da lista
9. [ ] Mensagem de sucesso apareceu

---

## 🔌 Fase 6: Testes de API (via Terminal)

```bash
# Teste 1: Ver se API está respondendo
curl http://localhost:3000

# Teste 2: Listar agendamentos
curl http://localhost:3000/agendamentos

# Teste 3: Obter estatísticas
curl http://localhost:3000/agendamentos/stats/resumo

# Teste 4: Criar agendamento
curl -X POST http://localhost:3000/agendamentos \
  -H "Content-Type: application/json" \
  -d '{
    "nomeCliente": "API Test",
    "email": "api@test.com",
    "telefone": "(11) 98765-4321",
    "quadra": "Quadra 1",
    "data": "2026-06-25",
    "horario": "15:00"
  }'
```

- [ ] API responde em http://localhost:3000
- [ ] GET /agendamentos retorna JSON com array
- [ ] GET /agendamentos/stats/resumo retorna estatísticas
- [ ] POST cria novo agendamento
- [ ] Resposta inclui `"sucesso": true`

---

## 🗄️ Fase 7: Verificação do Banco

```bash
# Conectar ao MySQL
mysql -u root -p

# Selecionar banco
USE sistema_agendamento;

# Ver tabelas
SHOW TABLES;

# Ver dados
SELECT * FROM Agendamento;

# Ver estrutura
DESCRIBE Agendamento;
```

- [ ] Tabela `Agendamento` existe
- [ ] Tabela tem 11 colunas (id até updatedAt)
- [ ] Dados aparecem ao fazer SELECT
- [ ] Quando cria agendamento no frontend, aparece no banco

---

## 📱 Fase 8: Responsividade

### Desktop (1920x1080)
- [ ] Layout se parece profissional
- [ ] Texto legível
- [ ] Botões acessíveis

### Tablet (768x1024)
- [ ] Layout se adapta
- [ ] Colunas reduzem a 2
- [ ] Formulário ainda funciona

### Mobile (375x667)
- [ ] Layout se adapta completamente
- [ ] 1 coluna
- [ ] Menus funcionam
- [ ] Formulário preenchível
- [ ] Botões clicáveis

*Para testar: Abra DevTools (F12) e use "Toggle device toolbar"*

---

## 🐛 Fase 9: Tratamento de Erros

- [ ] Se mudar DATABASE_URL para inválida, backend mostra erro
- [ ] Se mudar VITE_API_URL para inválida, frontend mostra erro de conexão
- [ ] Se excluir um agendamento que não existe, erro aparece
- [ ] Se tentar criar com email inválido, erro validação aparece

---

## 📊 Fase 10: Dados de Teste

Se executou `npm run seed`:

- [ ] Dashboard mostra 5 agendamentos totais
- [ ] Estatísticas mostram:
  - [ ] Total: 5
  - [ ] Confirmados: 3
  - [ ] Pendentes: 2
  - [ ] Cancelados: 0
- [ ] Cada agendamento tem informações completas
- [ ] Datas são futuras (não no passado)

---

## ✨ Fase 11: Funcionalidades Extra

- [ ] Navbar com logo está bonita
- [ ] Cores estão consistentes (azul como primária)
- [ ] Componentes reutilizáveis funcionam bem
- [ ] Modal de confirmação é clara e profissional
- [ ] Loading spinner aparece enquanto carrega
- [ ] Alerts de erro/sucesso são distintos
- [ ] Estatísticas no dashboard são informativas

---

## 📚 Fase 12: Documentação

- [ ] README.md existe e está completo
- [ ] GUIA_RAPIDO.md existe e é fácil de seguir
- [ ] ANALISE_FINAL.md mostra melhorias
- [ ] Código tem comentários úteis

---

## 🎯 RESULTADO FINAL

Se todos os itens acima estão ✅, seu sistema está:

✅ **100% Funcional**
✅ **Pronto para Apresentação**
✅ **Pronto para Deploy**
✅ **Pronto para Notas Altas**

---

## 🆘 Se Algo Não Funcionar

1. [ ] Verifique o console do navegador (F12 → Console)
2. [ ] Verifique o terminal do backend (mensagens de erro)
3. [ ] Verifique se ambos os servidores estão rodando
4. [ ] Verifique arquivos `.env.local`
5. [ ] Se necessário, veja GUIA_RAPIDO.md → Troubleshooting

---

## 🚀 Próximo Passo

Após confirmar todos os ✅:

1. **Fazer commit no Git**: `git add . && git commit -m "Sistema pronto"`
2. **Fazer push**: `git push origin main`
3. **Apresentar ao professor**: Demonstrar funcionalidades
4. **Solicitar nota**: Entregar documentação

---

**Boa sorte! 🍀**
