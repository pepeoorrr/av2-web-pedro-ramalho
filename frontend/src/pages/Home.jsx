import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { StatCard, Loading, Alert } from "../components";
import { obterEstatisticas } from "../services/api";

export function Home() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  
  useEffect(() => {
    carregarEstatisticas();
  }, []);
  
  const carregarEstatisticas = async () => {
    try {
      setLoading(true);
      const response = await obterEstatisticas();
      setStats(response.dados);
      setErro(null);
    } catch (error) {
      setErro("Erro ao carregar estatísticas");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <main className="flex-1 container-main">
      <div className="mb-8">
        <h1>Bem-vindo ao QuadraBook! 🏐</h1>
        <p className="text-gray-600 text-lg">
          Sistema de Agendamento de Quadras Esportivas
        </p>
      </div>
      
      {erro && (
        <Alert 
          type="error" 
          message={erro}
          onClose={() => setErro(null)}
        />
      )}
      
      {loading ? (
        <Loading message="Carregando estatísticas..." />
      ) : stats ? (
        <>
          {/* Estatísticas */}
          <div className="grid-cols-responsive mb-8">
            <StatCard
              title="Total de Agendamentos"
              value={stats.total}
              icon="📊"
              color="blue"
            />
            <StatCard
              title="Confirmados"
              value={stats.confirmados}
              icon="✓"
              color="green"
            />
            <StatCard
              title="Pendentes"
              value={stats.pendentes}
              icon="⏳"
              color="yellow"
            />
            <StatCard
              title="Cancelados"
              value={stats.cancelados}
              icon="✕"
              color="red"
            />
          </div>
          
          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg p-8 text-white">
            <div className="max-w-2xl">
              <h2 className="text-white mb-2">Agende sua Quadra Agora!</h2>
              <p className="text-blue-100 mb-4">
                Clique no botão abaixo para criar um novo agendamento e reservar sua quadra.
              </p>
              <Link to="/novo" className="btn bg-white text-blue-600 hover:bg-blue-50">
                → Novo Agendamento
              </Link>
            </div>
          </div>
          
          {/* Funcionalidades */}
          <div className="mt-8">
            <h2 className="mb-6">Funcionalidades</h2>
            <div className="grid-cols-responsive">
              <div className="card">
                <h3>📝 Cadastrar</h3>
                <p>Crie novos agendamentos de forma rápida e prática.</p>
              </div>
              <div className="card">
                <h3>📋 Listar</h3>
                <p>Visualize todos os seus agendamentos em um só lugar.</p>
              </div>
              <div className="card">
                <h3>✏️ Editar</h3>
                <p>Atualize informações de agendamentos existentes.</p>
              </div>
              <div className="card">
                <h3>🗑️ Deletar</h3>
                <p>Remova agendamentos que não serão mais utilizados.</p>
              </div>
              <div className="card">
                <h3>🔍 Filtrar</h3>
                <p>Encontre agendamentos por quadra, data ou status.</p>
              </div>
              <div className="card">
                <h3>📊 Estatísticas</h3>
                <p>Acompanhe o desempenho de suas reservas.</p>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </main>
  );
}
