// ========================================
// MODEL - CAMADA DE DADOS (USANDO PRISMA)
// ========================================
// Esta camada é responsável por:
// - Conectar com o banco de dados via Prisma
// - Implementar a lógica de negócio
// - Realizar operações CRUD (Create, Read, Update, Delete)

import { prisma } from "../config/prisma.js";

// ========================================
// OPERAÇÕES CRUD - AGENDAMENTOS
// ========================================

/**
 * Obtém todos os agendamentos
 * @param {Object} filtros - Filtros opcionais { quadra, status, data }
 * @returns {Promise<Array>} - Array com todos os agendamentos
 */
export async function obterTodosAgendamentos(filtros = {}) {
  try {
    const where = {};
    
    if (filtros.quadra) {
      where.quadra = filtros.quadra;
    }
    
    if (filtros.status) {
      where.status = filtros.status;
    }
    
    if (filtros.data) {
      // Busca agendamentos da data especificada
      const dataInicio = new Date(filtros.data);
      dataInicio.setHours(0, 0, 0, 0);
      
      const dataFim = new Date(filtros.data);
      dataFim.setHours(23, 59, 59, 999);
      
      where.data = {
        gte: dataInicio,
        lte: dataFim
      };
    }
    
    const agendamentos = await prisma.agendamento.findMany({
      where,
      orderBy: { data: 'asc' }
    });
    
    return agendamentos;
  } catch (error) {
    throw new Error(`Erro ao buscar agendamentos: ${error.message}`);
  }
}

/**
 * Obtém um agendamento específico pelo ID
 * @param {number} id - ID do agendamento
 * @returns {Promise<Object|null>} - O agendamento encontrado ou null
 */
export async function obterAgendamentoPorId(id) {
  try {
    const agendamento = await prisma.agendamento.findUnique({
      where: { id: parseInt(id) }
    });
    
    return agendamento;
  } catch (error) {
    throw new Error(`Erro ao buscar agendamento: ${error.message}`);
  }
}

/**
 * Cria um novo agendamento
 * @param {Object} dados - Dados do agendamento
 * @returns {Promise<Object>} - O agendamento criado
 */
export async function criarAgendamento(dados) {
  try {
    // Validações básicas
    if (!dados.nomeCliente || !dados.email || !dados.telefone || 
        !dados.quadra || !dados.data || !dados.horario) {
      throw new Error("Campos obrigatórios faltando");
    }
    
    const agendamento = await prisma.agendamento.create({
      data: {
        nomeCliente: dados.nomeCliente.trim(),
        email: dados.email.toLowerCase().trim(),
        telefone: dados.telefone.trim(),
        quadra: dados.quadra.trim(),
        data: new Date(dados.data),
        horario: dados.horario,
        status: dados.status || "pendente",
        observacoes: dados.observacoes ? dados.observacoes.trim() : null
      }
    });
    
    return agendamento;
  } catch (error) {
    throw new Error(`Erro ao criar agendamento: ${error.message}`);
  }
}

/**
 * Atualiza um agendamento existente
 * @param {number} id - ID do agendamento
 * @param {Object} dados - Dados a atualizar
 * @returns {Promise<Object|null>} - O agendamento atualizado ou null
 */
export async function atualizarAgendamento(id, dados) {
  try {
    // Verifica se o agendamento existe
    const agendamentoExistente = await prisma.agendamento.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!agendamentoExistente) {
      return null;
    }
    
    // Prepara os dados para atualização
    const dataAtualizacao = {};
    
    if (dados.nomeCliente) dataAtualizacao.nomeCliente = dados.nomeCliente.trim();
    if (dados.email) dataAtualizacao.email = dados.email.toLowerCase().trim();
    if (dados.telefone) dataAtualizacao.telefone = dados.telefone.trim();
    if (dados.quadra) dataAtualizacao.quadra = dados.quadra.trim();
    if (dados.data) dataAtualizacao.data = new Date(dados.data);
    if (dados.horario) dataAtualizacao.horario = dados.horario;
    if (dados.status) dataAtualizacao.status = dados.status;
    if (dados.observacoes !== undefined) {
      dataAtualizacao.observacoes = dados.observacoes ? dados.observacoes.trim() : null;
    }
    
    const agendamentoAtualizado = await prisma.agendamento.update({
      where: { id: parseInt(id) },
      data: dataAtualizacao
    });
    
    return agendamentoAtualizado;
  } catch (error) {
    throw new Error(`Erro ao atualizar agendamento: ${error.message}`);
  }
}

/**
 * Exclui um agendamento
 * @param {number} id - ID do agendamento
 * @returns {Promise<Object|null>} - O agendamento deletado ou null
 */
export async function excluirAgendamento(id) {
  try {
    // Verifica se o agendamento existe
    const agendamentoExistente = await prisma.agendamento.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!agendamentoExistente) {
      return null;
    }
    
    const agendamentoRemovido = await prisma.agendamento.delete({
      where: { id: parseInt(id) }
    });
    
    return agendamentoRemovido;
  } catch (error) {
    throw new Error(`Erro ao excluir agendamento: ${error.message}`);
  }
}

/**
 * Obtém estatísticas dos agendamentos
 * @returns {Promise<Object>} - Objeto com estatísticas
 */
export async function obterEstatisticas() {
  try {
    const total = await prisma.agendamento.count();
    const confirmados = await prisma.agendamento.count({
      where: { status: "confirmado" }
    });
    const pendentes = await prisma.agendamento.count({
      where: { status: "pendente" }
    });
    const cancelados = await prisma.agendamento.count({
      where: { status: "cancelado" }
    });
    
    return {
      total,
      confirmados,
      pendentes,
      cancelados
    };
  } catch (error) {
    throw new Error(`Erro ao obter estatísticas: ${error.message}`);
  }
}
