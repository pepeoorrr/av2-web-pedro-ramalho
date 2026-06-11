import { Link } from "react-router-dom";

export function CardAgendamento({ agendamento, onDelete }) {
  const formatarData = (data) => {
    return new Date(data).toLocaleDateString("pt-BR");
  };
  
  const getBadgeClass = () => {
    switch (agendamento.status) {
      case "confirmado":
        return "badge-success";
      case "pendente":
        return "badge-pending";
      case "cancelado":
        return "badge-danger";
      default:
        return "badge-info";
    }
  };

  const getStatusEmoji = () => {
    switch (agendamento.status) {
      case "confirmado":
        return "✅";
      case "pendente":
        return "⏳";
      case "cancelado":
        return "❌";
      default:
        return "ℹ️";
    }
  };
  
  const formatarStatus = (status) => {
    const statusMap = {
      confirmado: "Confirmado",
      pendente: "Pendente",
      cancelado: "Cancelado"
    };
    return statusMap[status] || status;
  };
  
  return (
    <div className="card hover:shadow-2xl hover:scale-105 transition-all duration-300 border-l-4 border-blue-500">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-900 m-0">
            👤 {agendamento.nomeCliente}
          </h3>
          <p className="text-sm text-gray-500 m-0">📧 {agendamento.email}</p>
        </div>
        <span className={`badge ${getBadgeClass()}`}>
          {getStatusEmoji()} {formatarStatus(agendamento.status)}
        </span>
      </div>
      
      <div className="divider" />
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 uppercase font-bold mb-1 tracking-wide">
            🏐 Quadra
          </p>
          <p className="font-bold text-gray-900 text-lg">
            {agendamento.quadra}
          </p>
        </div>
        
        <div>
          <p className="text-xs text-gray-500 uppercase font-bold mb-1 tracking-wide">
            📞 Telefone
          </p>
          <p className="font-bold text-gray-900">
            {agendamento.telefone}
          </p>
        </div>
        
        <div>
          <p className="text-xs text-gray-500 uppercase font-bold mb-1 tracking-wide">
            📅 Data
          </p>
          <p className="font-bold text-gray-900">
            {formatarData(agendamento.data)}
          </p>
        </div>
        
        <div>
          <p className="text-xs text-gray-500 uppercase font-bold mb-1 tracking-wide">
            ⏰ Horário
          </p>
          <p className="font-bold text-gray-900">
            {agendamento.horario}
          </p>
        </div>
      </div>
      
      {agendamento.observacoes && (
        <>
          <div className="divider" />
          <div className="mb-4 bg-blue-50 rounded-lg p-3 border-l-4 border-blue-400">
            <p className="text-xs text-gray-500 uppercase font-bold mb-1 tracking-wide">
              📝 Observações
            </p>
            <p className="text-gray-700 text-sm">
              {agendamento.observacoes}
            </p>
          </div>
        </>
      )}
      
      <div className="card-footer gap-2 justify-between flex-row">
        <Link 
          to={`/editar/${agendamento.id}`}
          className="btn btn-outline btn-small"
        >
          ✏️ Editar
        </Link>
        <button
          onClick={() => onDelete(agendamento.id)}
          className="btn btn-danger btn-small"
        >
          🗑️ Deletar
        </button>
      </div>
    </div>
  );
}
