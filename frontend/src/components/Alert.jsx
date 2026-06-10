export function Alert({ type = "info", message, onClose }) {
  if (!message) return null;
  
  const getAlertClass = () => {
    const baseClass = "alert flex items-center justify-between gap-3";
    switch (type) {
      case "success":
        return `${baseClass} alert-success`;
      case "error":
        return `${baseClass} alert-error`;
      case "warning":
        return `${baseClass} alert-warning`;
      default:
        return `${baseClass} alert-info`;
    }
  };
  
  const getIcon = () => {
    switch (type) {
      case "success":
        return "✓";
      case "error":
        return "✕";
      case "warning":
        return "⚠";
      default:
        return "ℹ";
    }
  };
  
  return (
    <div className={getAlertClass()}>
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold">{getIcon()}</span>
        <span>{message}</span>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-xl cursor-pointer hover:opacity-70"
        >
          ✕
        </button>
      )}
    </div>
  );
}
