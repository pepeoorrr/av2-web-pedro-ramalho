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
  
  const formatarStatus = (status) => {
    const statusMap = {
      confirmado: "Confirmado",
      pendente: "Pendente",
      cancelado: "Cancelado"
    };
    return statusMap[status] || status;
  };
  
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 m-0">
            {agendamento.nomeCliente}
          </h3>
          <p className="text-sm text-gray-500 m-0">{agendamento.email}</p>
        </div>
        <span className={`badge ${getBadgeClass()}`}>
          {formatarStatus(agendamento.status)}
        </span>
      </div>
      
      <div className="divider" />
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
            Quadra
          </p>
          <p className="font-semibold text-gray-900">
            {agendamento.quadra}
          </p>
        </div>
        
        <div>
          <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
            Telefone
          </p>
          <p className="font-semibold text-gray-900">
            {agendamento.telefone}
          </p>
        </div>
        
        <div>
          <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
            Data
          </p>
          <p className="font-semibold text-gray-900">
            {formatarData(agendamento.data)}
          </p>
        </div>
        
        <div>
          <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
            Horário
          </p>
          <p className="font-semibold text-gray-900">
            {agendamento.horario}h
          </p>
        </div>
      </div>
      
      {agendamento.observacoes && (
        <>
          <div className="divider" />
          <div className="mb-4">
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
              Observações
            </p>
            <p className="text-gray-700 text-sm">
              {agendamento.observacoes}
            </p>
          </div>
        </>
      )}
      
      <div className="card-footer gap-2">
        <Link 
          to={`/editar/${agendamento.id}`}
          className="btn btn-outline btn-small"
        >
          Editar
        </Link>
        <button
          onClick={() => onDelete(agendamento.id)}
          className="btn btn-danger btn-small"
        >
          Deletar
        </button>
      </div>
    </div>
  );
}
