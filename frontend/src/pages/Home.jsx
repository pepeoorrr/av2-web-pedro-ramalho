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
    <main className="flex-1">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-16 px-4">
        <div className="container-main text-center">
          <div className="text-6xl mb-4 animate-fadeInDown">🏐</div>
          <h1 className="text-white text-5xl font-bold mb-4">Bem-vindo ao QuadraBook!</h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            O sistema mais moderno para agendamento de quadras esportivas. Gerencie suas reservas com facilidade e eficiência.
          </p>
          <Link to="/novo" className="btn bg-white text-blue-600 hover:bg-blue-50 btn-large inline-block shadow-2xl">
            🚀 Começar Agora
          </Link>
        </div>
      </div>

      <div className="container-main">
        {erro && (
          <Alert 
            type="error" 
            message={erro}
            onClose={() => setErro(null)}
          />
        )}
        
        {loading ? (
          <Loading message="Carregando suas estatísticas..." />
        ) : stats ? (
          <>
            {/* Estatísticas */}
            <div className="mb-12">
              <h2 className="mb-8 text-center text-3xl">Seus Agendamentos</h2>
              <div className="grid-cols-responsive">
                <StatCard
                  title="Total"
                  value={stats.total}
                  icon="📊"
                  color="blue"
                />
                <StatCard
                  title="Confirmados"
                  value={stats.confirmados}
                  icon="✅"
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
                  icon="❌"
                  color="red"
                />
              </div>
            </div>
            
            {/* Funcionalidades */}
            <div className="mb-12">
              <h2 className="mb-8 text-center text-3xl">Funcionalidades Principais</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="card hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl mb-4">📝</div>
                  <h3 className="text-xl font-bold mb-2">Cadastrar</h3>
                  <p className="text-gray-600">Crie novos agendamentos de forma rápida e intuitiva com validação em tempo real.</p>
                </div>
                <div className="card hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl mb-4">📋</div>
                  <h3 className="text-xl font-bold mb-2">Listar</h3>
                  <p className="text-gray-600">Visualize todos os seus agendamentos em um só lugar com informações completas.</p>
                </div>
                <div className="card hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl mb-4">✏️</div>
                  <h3 className="text-xl font-bold mb-2">Editar</h3>
                  <p className="text-gray-600">Atualize informações de agendamentos existentes com facilidade.</p>
                </div>
                <div className="card hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl mb-4">🗑️</div>
                  <h3 className="text-xl font-bold mb-2">Deletar</h3>
                  <p className="text-gray-600">Remova agendamentos que não serão mais utilizados com confirmação de segurança.</p>
                </div>
                <div className="card hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold mb-2">Filtrar</h3>
                  <p className="text-gray-600">Encontre agendamentos por quadra, data, status ou qualquer outro critério.</p>
                </div>
                <div className="card hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl mb-4">📊</div>
                  <h3 className="text-xl font-bold mb-2">Estatísticas</h3>
                  <p className="text-gray-600">Acompanhe o desempenho de suas reservas com gráficos e relatórios.</p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-2xl p-12 text-white text-center mb-12">
              <h2 className="text-white text-3xl mb-4">Pronto para começar?</h2>
              <p className="text-blue-100 text-lg mb-6">
                Agora você pode gerenciar todos os seus agendamentos de quadras em um único lugar!
              </p>
              <Link to="/novo" className="btn bg-white text-blue-600 hover:bg-blue-50 btn-large inline-block shadow-2xl">
                ➕ Criar Novo Agendamento
              </Link>
            </div>
          </>
        ) : null}
      </div>
    </main>
  );
}
