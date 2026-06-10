import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormularioAgendamento, Alert } from "../components";
import { criarAgendamento } from "../services/api";

export function NovoAgendamento() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);
  
  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setErro(null);
      
      await criarAgendamento(formData);
      
      // Redireciona para listagem após sucesso
      navigate("/agendamentos", {
        state: { message: "Agendamento criado com sucesso!" }
      });
    } catch (error) {
      setErro(error.message || "Erro ao criar agendamento");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <main className="flex-1 container-main">
      <h1>Novo Agendamento</h1>
      <p className="text-gray-600 mb-8">
        Preencha o formulário abaixo para criar um novo agendamento.
      </p>
      
      {erro && (
        <Alert
          type="error"
          message={erro}
          onClose={() => setErro(null)}
        />
      )}
      
      <div className="max-w-2xl">
        <FormularioAgendamento
          onSubmit={handleSubmit}
          isLoading={loading}
        />
      </div>
    </main>
  );
}
