export function Loading({ message = "Carregando..." }) {
  return (
    <div className="flex-center min-h-64 animate-fadeInUp">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 animate-spin">
            <div className="spinner h-full w-full border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-2xl">
            🏐
          </div>
        </div>
        <p className="text-gray-600 font-medium text-lg">{message}</p>
        <div className="flex gap-1 justify-center mt-4">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>
    </div>
  );
}
