import { useState, useEffect } from "react";
import { CardAgendamento, Loading, Alert, Modal } from "../components";
import { obterAgendamentos, excluirAgendamento } from "../services/api";

export function Agendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
  const [agendamentoSelecionado, setAgendamentoSelecionado] = useState(null);
  
  // Filtros
  const [filtros, setFiltros] = useState({
    quadra: "",
    status: "",
    data: ""
  });
  
  useEffect(() => {
    carregarAgendamentos();
  }, []);
  
  const carregarAgendamentos = async (filtrosFinal = {}) => {
    try {
      setLoading(true);
      const response = await obterAgendamentos(filtrosFinal);
      setAgendamentos(response.dados || []);
      setErro(null);
    } catch (error) {
      setErro("Erro ao carregar agendamentos");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    const novosFiltros = { ...filtros, [name]: value };
    setFiltros(novosFiltros);
    carregarAgendamentos(novosFiltros);
  };
  
  const handleDeleteClick = (id) => {
    setAgendamentoSelecionado(id);
    setModalDelete(true);
  };
  
  const handleConfirmDelete = async () => {
    try {
      await excluirAgendamento(agendamentoSelecionado);
      setSucesso("Agendamento excluído com sucesso!");
      setModalDelete(false);
      carregarAgendamentos(filtros);
      
      // Limpar mensagem após 3 segundos
      setTimeout(() => setSucesso(null), 3000);
    } catch (error) {
      setErro("Erro ao excluir agendamento");
      console.error(error);
    }
  };
  
  const handleLimparFiltros = () => {
    setFiltros({ quadra: "", status: "", data: "" });
    carregarAgendamentos({});
  };
  
  return (
    <main className="flex-1 container-main">
      <h1>Meus Agendamentos</h1>
      
      {erro && (
        <Alert
          type="error"
          message={erro}
          onClose={() => setErro(null)}
        />
      )}
      
      {sucesso && (
        <Alert
          type="success"
          message={sucesso}
          onClose={() => setSucesso(null)}
        />
      )}
      
      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3>Filtrar Agendamentos</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="quadra">Quadra</label>
            <select
              id="quadra"
              name="quadra"
              value={filtros.quadra}
              onChange={handleFiltroChange}
            >
              <option value="">Todas as quadras</option>
              <option value="Quadra 1">Quadra 1</option>
              <option value="Quadra 2">Quadra 2</option>
              <option value="Quadra 3">Quadra 3</option>
              <option value="Quadra 4">Quadra 4</option>
              <option value="Futsal">Futsal</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={filtros.status}
              onChange={handleFiltroChange}
            >
              <option value="">Todos os status</option>
              <option value="pendente">Pendente</option>
              <option value="confirmado">Confirmado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="data">Data</label>
            <input
              type="date"
              id="data"
              name="data"
              value={filtros.data}
              onChange={handleFiltroChange}
            />
          </div>
        </div>
        
        <button
          onClick={handleLimparFiltros}
          className="btn btn-outline btn-small"
        >
          Limpar Filtros
        </button>
      </div>
      
      {/* Modal de Confirmação */}
      <Modal
        isOpen={modalDelete}
        title="Confirmar Exclusão"
        message="Tem certeza que deseja excluir este agendamento? Esta ação não pode ser desfeita."
        onConfirm={handleConfirmDelete}
        onCancel={() => setModalDelete(false)}
        confirmText="Excluir"
        cancelText="Cancelar"
        type="danger"
      />
      
      {/* Lista de Agendamentos */}
      {loading ? (
        <Loading message="Carregando agendamentos..." />
      ) : agendamentos.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            Nenhum agendamento encontrado.
          </p>
          <a href="/novo" className="btn btn-primary">
            Criar Primeiro Agendamento
          </a>
        </div>
      ) : (
        <div className="grid-cols-responsive">
          {agendamentos.map(agendamento => (
            <CardAgendamento
              key={agendamento.id}
              agendamento={agendamento}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      )}
    </main>
  );
}
