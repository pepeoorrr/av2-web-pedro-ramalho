export function Modal({ isOpen, title, message, onConfirm, onCancel, confirmText = "Confirmar", cancelText = "Cancelar", type = "info" }) {
  if (!isOpen) return null;
  
  const getButtonClass = () => {
    switch (type) {
      case "danger":
        return "btn btn-danger";
      case "success":
        return "btn btn-success";
      default:
        return "btn btn-primary";
    }
  };
  
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="card-header">
          <h2 className="m-0">{title}</h2>
        </div>
        
        <div className="card-body">
          <p>{message}</p>
        </div>
        
        <div className="card-footer gap-3">
          <button
            onClick={onCancel}
            className="btn btn-outline"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={getButtonClass()}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
