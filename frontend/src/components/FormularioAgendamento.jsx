import { useState } from "react";

const QUADRAS = ["Quadra 1", "Quadra 2", "Quadra 3", "Quadra 4", "Futsal"];
const HORAS = Array.from({ length: 12 }, (_, i) => {
  const hora = String(i + 8).padStart(2, "0");
  return `${hora}:00`;
});

export function FormularioAgendamento({ dadosIniciais, onSubmit, isLoading }) {
  const [formData, setFormData] = useState(dadosIniciais || {
    nomeCliente: "",
    email: "",
    telefone: "",
    quadra: "Quadra 1",
    data: "",
    horario: "08:00",
    status: "pendente",
    observacoes: ""
  });
  
  const [erros, setErros] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpa erro do campo
    if (erros[name]) {
      setErros(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };
  
  const validar = () => {
    const novosErros = {};
    
    if (!formData.nomeCliente.trim()) {
      novosErros.nomeCliente = "Nome do cliente é obrigatório";
    }
    
    if (!formData.email.trim()) {
      novosErros.email = "Email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      novosErros.email = "Email inválido";
    }
    
    if (!formData.telefone.trim()) {
      novosErros.telefone = "Telefone é obrigatório";
    } else if (formData.telefone.replace(/\D/g, "").length < 8) {
      novosErros.telefone = "Telefone deve ter no mínimo 8 dígitos";
    }
    
    if (!formData.data) {
      novosErros.data = "Data é obrigatória";
    } else {
      const data = new Date(formData.data);
      if (data < new Date()) {
        novosErros.data = "Não é permitido agendar em data passada";
      }
    }
    
    if (!formData.horario) {
      novosErros.horario = "Horário é obrigatório";
    }
    
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validar()) {
      return;
    }
    
    await onSubmit(formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-center">🏐 Agendar Quadra</h2>
        <p className="text-center text-gray-600 mt-2">Preencha os dados abaixo para criar seu agendamento</p>
      </div>
      
      {/* Nome do Cliente */}
      <div className="mb-6">
        <label htmlFor="nomeCliente" className="font-bold">👤 Nome do Cliente *</label>
        <input
          type="text"
          id="nomeCliente"
          name="nomeCliente"
          value={formData.nomeCliente}
          onChange={handleChange}
          placeholder="Ex: João Silva"
          disabled={isLoading}
          className={erros.nomeCliente ? "ring-2 ring-red-500" : ""}
        />
        {erros.nomeCliente && (
          <p className="text-red-600 text-sm mt-2 flex items-center gap-1">✕ {erros.nomeCliente}</p>
        )}
      </div>
      
      {/* Email e Telefone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="email" className="font-bold">📧 Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="exemplo@email.com"
            disabled={isLoading}
            className={erros.email ? "ring-2 ring-red-500" : ""}
          />
          {erros.email && (
            <p className="text-red-600 text-sm mt-2 flex items-center gap-1">✕ {erros.email}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="telefone" className="font-bold">📞 Telefone *</label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            placeholder="(11) 98765-4321"
            disabled={isLoading}
            className={erros.telefone ? "ring-2 ring-red-500" : ""}
          />
          {erros.telefone && (
            <p className="text-red-600 text-sm mt-2 flex items-center gap-1">✕ {erros.telefone}</p>
          )}
        </div>
      </div>
      
      {/* Quadra, Data e Horário */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label htmlFor="quadra" className="font-bold">🏐 Quadra *</label>
          <select
            id="quadra"
            name="quadra"
            value={formData.quadra}
            onChange={handleChange}
            disabled={isLoading}
          >
            {QUADRAS.map(q => (
              <option key={q} value={q}>{q}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="data" className="font-bold">📅 Data *</label>
          <input
            type="date"
            id="data"
            name="data"
            value={formData.data}
            onChange={handleChange}
            disabled={isLoading}
            className={erros.data ? "ring-2 ring-red-500" : ""}
          />
          {erros.data && (
            <p className="text-red-600 text-sm mt-2 flex items-center gap-1">✕ {erros.data}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="horario" className="font-bold">⏰ Horário *</label>
          <select
            id="horario"
            name="horario"
            value={formData.horario}
            onChange={handleChange}
            disabled={isLoading}
          >
            {HORAS.map(h => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Status */}
      <div className="mb-6">
        <label htmlFor="status" className="font-bold">📊 Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          disabled={isLoading}
        >
          <option value="pendente">⏳ Pendente</option>
          <option value="confirmado">✅ Confirmado</option>
          <option value="cancelado">❌ Cancelado</option>
        </select>
      </div>
      
      {/* Observações */}
      <div className="mb-8">
        <label htmlFor="observacoes" className="font-bold">📝 Observações</label>
        <textarea
          id="observacoes"
          name="observacoes"
          value={formData.observacoes}
          onChange={handleChange}
          placeholder="Digite observações adicionais (opcional)..."
          disabled={isLoading}
        />
      </div>
      
      {/* Botão Submit */}
      <div className="flex gap-3 justify-center">
        <button
          type="submit"
          className="btn btn-primary btn-large"
          disabled={isLoading}
        >
          {isLoading ? "💾 Salvando..." : "✨ Salvar Agendamento"}
        </button>
      </div>
    </form>
  );
}
