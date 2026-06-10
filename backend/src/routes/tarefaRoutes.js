// ========================================
// ROUTES - CAMADA DE ROTAS
// ========================================
// Esta camada é responsável por:
// - Definir as rotas da aplicação
// - Mapear URLs para os controllers correspondentes
// - Organizar as rotas por recurso/entidade

import express from "express";
import * as AgendamentoController from "../controllers/tarefaController.js";

// Cria um roteador do Express
const router = express.Router();

// ========================================
// DEFINIÇÃO DAS ROTAS DE AGENDAMENTOS
// ========================================

/**
 * GET /agendamentos - Lista todos os agendamentos
 * Filtros opcionais: ?quadra=...&status=...&data=...
 */
router.get("/agendamentos", AgendamentoController.listarAgendamentos);

/**
 * GET /agendamentos/stats/resumo - Retorna estatísticas
 */
router.get("/agendamentos/stats/resumo", AgendamentoController.obterEstatisticas);

/**
 * GET /agendamentos/:id - Obtém um agendamento específico
 */
router.get("/agendamentos/:id", AgendamentoController.obterAgendamento);

/**
 * POST /agendamentos - Cria um novo agendamento
 */
router.post("/agendamentos", AgendamentoController.criarAgendamento);

/**
 * PUT /agendamentos/:id - Atualiza um agendamento completamente
 */
router.put("/agendamentos/:id", AgendamentoController.atualizarAgendamento);

/**
 * DELETE /agendamentos/:id - Remove um agendamento
 */
router.delete("/agendamentos/:id", AgendamentoController.excluirAgendamento);

// Exporta o roteador para ser usado no app principal
export default router;
