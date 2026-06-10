// ========================================
// API CLIENT - Configuração da API
// ========================================

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// ========================================
// REQUISIÇÕES HTTP
// ========================================

/**
 * Faz uma requisição HTTP genérica
 * @param {string} endpoint - Ex: "/agendamentos"
 * @param {string} method - GET, POST, PUT, DELETE
 * @param {object} data - Dados para POST/PUT
 * @returns {Promise<object>} - Resposta da API
 */
async function request(endpoint, method = "GET", data = null) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    }
  };
  
  if (data && (method === "POST" || method === "PUT")) {
    options.body = JSON.stringify(data);
  }
  
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.erro || `Erro HTTP ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Erro na requisição ${method} ${endpoint}:`, error);
    throw error;
  }
}

// ========================================
// MÉTODOS DA API
// ========================================

/**
 * Obtém todos os agendamentos com filtros opcionais
 */
export async function obterAgendamentos(filtros = {}) {
  let url = "/agendamentos";
  const params = new URLSearchParams();
  
  if (filtros.quadra) params.append("quadra", filtros.quadra);
  if (filtros.status) params.append("status", filtros.status);
  if (filtros.data) params.append("data", filtros.data);
  
  if (params.toString()) {
    url += "?" + params.toString();
  }
  
  return request(url, "GET");
}

/**
 * Obtém um agendamento específico pelo ID
 */
export async function obterAgendamento(id) {
  return request(`/agendamentos/${id}`, "GET");
}

/**
 * Cria um novo agendamento
 */
export async function criarAgendamento(dados) {
  return request("/agendamentos", "POST", dados);
}

/**
 * Atualiza um agendamento existente
 */
export async function atualizarAgendamento(id, dados) {
  return request(`/agendamentos/${id}`, "PUT", dados);
}

/**
 * Exclui um agendamento
 */
export async function excluirAgendamento(id) {
  return request(`/agendamentos/${id}`, "DELETE");
}

/**
 * Obtém estatísticas dos agendamentos
 */
export async function obterEstatisticas() {
  return request("/agendamentos/stats/resumo", "GET");
}

/**
 * Testa a conexão com a API
 */
export async function testarConexao() {
  try {
    const response = await fetch(`${API_BASE_URL}/`);
    return response.ok;
  } catch (error) {
    console.error("Erro ao conectar com a API:", error);
    return false;
  }
}

export default {
  obterAgendamentos,
  obterAgendamento,
  criarAgendamento,
  atualizarAgendamento,
  excluirAgendamento,
  obterEstatisticas,
  testarConexao
};
