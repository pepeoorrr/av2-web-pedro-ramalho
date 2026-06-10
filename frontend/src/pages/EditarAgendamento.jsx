import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormularioAgendamento, Alert, Loading } from "../components";
import { obterAgendamento, atualizarAgendamento } from "../services/api";

export function EditarAgendamento() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [agendamento, setAgendamento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [salvando, setSavando] = useState(false);
  const [erro, setErro] = useState(null);
  
  useEffect(() => {
    carregarAgendamento();
  }, [id]);
  
  const carregarAgendamento = async () => {
    try {
      setLoading(true);
      const response = await obterAgendamento(id);
      
      // Formatar data para o campo date input (YYYY-MM-DD)
      const dataFormatada = new Date(response.dados.data)
        .toISOString()
        .split('T')[0];
      
      setAgendamento({
        ...response.dados,
        data: dataFormatada
      });
      setErro(null);
    } catch (error) {
      setErro("Erro ao carregar agendamento");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmit = async (formData) => {
    try {
      setSavando(true);
      setErro(null);
      
      await atualizarAgendamento(id, formData);
      
      // Redireciona para listagem após sucesso
      navigate("/agendamentos", {
        state: { message: "Agendamento atualizado com sucesso!" }
      });
    } catch (error) {
      setErro(error.message || "Erro ao atualizar agendamento");
      console.error(error);
    } finally {
      setSavando(false);
    }
  };
  
  return (
    <main className="flex-1 container-main">
      <h1>Editar Agendamento</h1>
      <p className="text-gray-600 mb-8">
        Modifique os dados do agendamento e salve as alterações.
      </p>
      
      {erro && (
        <Alert
          type="error"
          message={erro}
          onClose={() => setErro(null)}
        />
      )}
      
      <div className="max-w-2xl">
        {loading ? (
          <Loading message="Carregando agendamento..." />
        ) : agendamento ? (
          <FormularioAgendamento
            dadosIniciais={agendamento}
            onSubmit={handleSubmit}
            isLoading={salvando}
          />
        ) : null}
      </div>
    </main>
  );
}
