// ========================================
// CONTROLLER - CAMADA DE CONTROLE
// ========================================
// Esta camada é responsável por:
// - Receber as requisições HTTP
// - Validar os dados recebidos
// - Chamar os métodos do Model
// - Retornar as respostas adequadas

import * as AgendamentoModel from "../models/tarefaModel.js";

// ========================================
// VALIDAÇÕES
// ========================================

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validarTelefone(telefone) {
  const regex = /^[\d\s\-\(\)]+$/;
  return telefone.length >= 8 && regex.test(telefone);
}

function validarHorario(horario) {
  const regex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
  return regex.test(horario);
}

// ========================================
// ROTAS DE AGENDAMENTOS
// ========================================

/**
 * Retorna todos os agendamentos com filtros opcionais
 * @route GET /agendamentos?quadra=...&status=...&data=...
 */
export async function listarAgendamentos(req, res) {
  try {
    const { quadra, status, data } = req.query;
    
    const filtros = {};
    if (quadra) filtros.quadra = quadra;
    if (status) filtros.status = status;
    if (data) filtros.data = data;
    
    const agendamentos = await AgendamentoModel.obterTodosAgendamentos(filtros);
    
    res.json({
      sucesso: true,
      total: agendamentos.length,
      dados: agendamentos
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      sucesso: false,
      erro: error.message
    });
  }
}

/**
 * Retorna um agendamento específico pelo ID
 * @route GET /agendamentos/:id
 */
export async function obterAgendamento(req, res) {
  try {
    const { id } = req.params;
    
    // Valida se o id é um número válido
    if (Number.isNaN(Number(id))) {
      return res.status(400).json({
        sucesso: false,
        erro: "ID inválido"
      });
    }
    
    const agendamento = await AgendamentoModel.obterAgendamentoPorId(id);
    
    if (!agendamento) {
      return res.status(404).json({
        sucesso: false,
        erro: "Agendamento não encontrado"
      });
    }
    
    res.json({
      sucesso: true,
      dados: agendamento
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      sucesso: false,
      erro: error.message
    });
  }
}

/**
 * Cria um novo agendamento
 * @route POST /agendamentos
 */
export async function criarAgendamento(req, res) {
  try {
    const { nomeCliente, email, telefone, quadra, data, horario, status, observacoes } = req.body;
    
    // ========== VALIDAÇÕES ==========
    
    // Validar nome do cliente
    if (!nomeCliente || typeof nomeCliente !== "string" || nomeCliente.trim().length === 0) {
      return res.status(400).json({
        sucesso: false,
        erro: "Nome do cliente é obrigatório"
      });
    }
    
    // Validar email
    if (!email || !validarEmail(email)) {
      return res.status(400).json({
        sucesso: false,
        erro: "Email inválido"
      });
    }
    
    // Validar telefone
    if (!telefone || !validarTelefone(telefone)) {
      return res.status(400).json({
        sucesso: false,
        erro: "Telefone inválido (mínimo 8 dígitos)"
      });
    }
    
    // Validar quadra
    if (!quadra || typeof quadra !== "string" || quadra.trim().length === 0) {
      return res.status(400).json({
        sucesso: false,
        erro: "Quadra é obrigatória"
      });
    }
    
    // Validar data
    if (!data) {
      return res.status(400).json({
        sucesso: false,
        erro: "Data é obrigatória"
      });
    }
    
    const dataAgendamento = new Date(data);
    if (isNaN(dataAgendamento.getTime())) {
      return res.status(400).json({
        sucesso: false,
        erro: "Data inválida"
      });
    }
    
    // Não permite agendar no passado
    if (dataAgendamento < new Date()) {
      return res.status(400).json({
        sucesso: false,
        erro: "Não é permitido agendar em data passada"
      });
    }
    
    // Validar horário
    if (!horario || !validarHorario(horario)) {
      return res.status(400).json({
        sucesso: false,
        erro: "Horário inválido (use formato HH:MM)"
      });
    }
    
    // Validar status (se fornecido)
    const statusValidos = ["pendente", "confirmado", "cancelado"];
    if (status && !statusValidos.includes(status)) {
      return res.status(400).json({
        sucesso: false,
        erro: "Status inválido (pendente, confirmado ou cancelado)"
      });
    }
    
    // ========== CRIAR AGENDAMENTO ==========
    
    const agendamento = await AgendamentoModel.criarAgendamento({
      nomeCliente,
      email,
      telefone,
      quadra,
      data,
      horario,
      status: status || "pendente",
      observacoes
    });
    
    res.status(201).json({
      sucesso: true,
      mensagem: "Agendamento criado com sucesso!",
      dados: agendamento
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      sucesso: false,
      erro: error.message
    });
  }
}

/**
 * Atualiza um agendamento existente
 * @route PUT /agendamentos/:id
 */
export async function atualizarAgendamento(req, res) {
  try {
    const { id } = req.params;
    const dados = req.body;
    
    // Valida se o id é um número válido
    if (Number.isNaN(Number(id))) {
      return res.status(400).json({
        sucesso: false,
        erro: "ID inválido"
      });
    }
    
    // ========== VALIDAÇÕES ==========
    
    // Validar email (se fornecido)
    if (dados.email && !validarEmail(dados.email)) {
      return res.status(400).json({
        sucesso: false,
        erro: "Email inválido"
      });
    }
    
    // Validar telefone (se fornecido)
    if (dados.telefone && !validarTelefone(dados.telefone)) {
      return res.status(400).json({
        sucesso: false,
        erro: "Telefone inválido (mínimo 8 dígitos)"
      });
    }
    
    // Validar data (se fornecida)
    if (dados.data) {
      const dataAgendamento = new Date(dados.data);
      if (isNaN(dataAgendamento.getTime())) {
        return res.status(400).json({
          sucesso: false,
          erro: "Data inválida"
        });
      }
      
      // Não permite agendar no passado
      if (dataAgendamento < new Date()) {
        return res.status(400).json({
          sucesso: false,
          erro: "Não é permitido agendar em data passada"
        });
      }
    }
    
    // Validar horário (se fornecido)
    if (dados.horario && !validarHorario(dados.horario)) {
      return res.status(400).json({
        sucesso: false,
        erro: "Horário inválido (use formato HH:MM)"
      });
    }
    
    // Validar status (se fornecido)
    const statusValidos = ["pendente", "confirmado", "cancelado"];
    if (dados.status && !statusValidos.includes(dados.status)) {
      return res.status(400).json({
        sucesso: false,
        erro: "Status inválido (pendente, confirmado ou cancelado)"
      });
    }
    
    // ========== ATUALIZAR AGENDAMENTO ==========
    
    const agendamento = await AgendamentoModel.atualizarAgendamento(id, dados);
    
    if (!agendamento) {
      return res.status(404).json({
        sucesso: false,
        erro: "Agendamento não encontrado"
      });
    }
    
    res.json({
      sucesso: true,
      mensagem: "Agendamento atualizado com sucesso!",
      dados: agendamento
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      sucesso: false,
      erro: error.message
    });
  }
}

/**
 * Exclui um agendamento
 * @route DELETE /agendamentos/:id
 */
export async function excluirAgendamento(req, res) {
  try {
    const { id } = req.params;
    
    // Valida se o id é um número válido
    if (Number.isNaN(Number(id))) {
      return res.status(400).json({
        sucesso: false,
        erro: "ID inválido"
      });
    }
    
    const agendamento = await AgendamentoModel.excluirAgendamento(id);
    
    if (!agendamento) {
      return res.status(404).json({
        sucesso: false,
        erro: "Agendamento não encontrado"
      });
    }
    
    res.json({
      sucesso: true,
      mensagem: "Agendamento excluído com sucesso!",
      dados: agendamento
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      sucesso: false,
      erro: error.message
    });
  }
}

/**
 * Retorna estatísticas dos agendamentos
 * @route GET /agendamentos/stats/resumo
 */
export async function obterEstatisticas(req, res) {
  try {
    const stats = await AgendamentoModel.obterEstatisticas();
    
    res.json({
      sucesso: true,
      dados: stats
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      sucesso: false,
      erro: error.message
    });
  }
}
