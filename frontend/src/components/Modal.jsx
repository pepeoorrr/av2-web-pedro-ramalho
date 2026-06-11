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
  
  const getIconEmoji = () => {
    switch (type) {
      case "danger":
        return "⚠️";
      case "success":
        return "✓";
      default:
        return "ℹ️";
    }
  };
  
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="text-center mb-6">
          <div className="text-5xl mb-4">{getIconEmoji()}</div>
          <h2 className="m-0 text-2xl">{title}</h2>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-600 text-center">{message}</p>
        </div>
        
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="btn btn-outline flex-1"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`${getButtonClass()} flex-1`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
