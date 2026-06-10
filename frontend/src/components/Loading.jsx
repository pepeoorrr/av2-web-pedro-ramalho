export function Loading({ message = "Carregando..." }) {
  return (
    <div className="flex-center min-h-64">
      <div className="text-center">
        <div className="spinner mx-auto mb-4"></div>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}
