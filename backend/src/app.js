// ========================================
// APP - CONFIGURAÇÃO DA APLICAÇÃO
// ========================================
// Este arquivo é responsável por:
// - Criar e configurar a aplicação Express
// - Configurar middlewares
// - Registrar as rotas
// - Preparar a aplicação para ser exportada

import express from "express";
import tarefaRoutes from "./routes/tarefaRoutes.js";

// Cria a aplicação Express
const app = express();

// ========================================
// MIDDLEWARES
// ========================================

// CORS - Permite requisições do frontend
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  // Responde automaticamente a requisições OPTIONS (preflight)
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  
  next();
});

// Permite que o servidor entenda JSON enviado no corpo da requisição
app.use(express.json());

// Middleware para parsing de dados URL-encoded (formulários)
app.use(express.urlencoded({ extended: true }));

// ========================================
// ROTAS
// ========================================

// Rota inicial apenas para testar se a API está funcionando
app.get("/", (req, res) => {
  res.json({
    mensagem: "API de Agendamento de Quadras Esportivas funcionando!",
    versao: "1.0.0",
    arquitetura: "MVC",
    ambiente: process.env.NODE_ENV || "development",
    endpoints: {
      agendamentos: "/agendamentos",
      estatisticas: "/agendamentos/stats/resumo"
    }
  });
});

// Registra as rotas de agendamentos
app.use(tarefaRoutes);

// ========================================
// TRATAMENTO DE ROTAS NÃO ENCONTRADAS
// ========================================

// Middleware para capturar rotas não definidas (404)
app.use((req, res) => {
  res.status(404).json({
    sucesso: false,
    erro: "Rota não encontrada",
    metodo: req.method,
    url: req.url
  });
});

// ========================================
// TRATAMENTO DE ERROS GLOBAL
// ========================================

// Middleware de erro global
app.use((err, req, res, next) => {
  console.error("Erro não tratado:", err);
  
  res.status(err.status || 500).json({
    sucesso: false,
    erro: err.message || "Erro interno do servidor"
  });
});

// Exporta a aplicação configurada
export default app;
