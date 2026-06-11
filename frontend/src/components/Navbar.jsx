import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-40 border-b border-blue-100">
      <div className="container-main flex items-center justify-between py-5">
        <Link to="/" className="flex items-center gap-3 no-underline hover:opacity-80 transition-opacity">
          <div className="text-3xl font-bold">🏐</div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent m-0">
              QuadraBook
            </h1>
            <p className="text-xs text-gray-500 m-0 font-medium">Sistema de Agendamento</p>
          </div>
        </Link>
        
        <div className="flex items-center gap-8">
          <Link 
            to="/" 
            className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 no-underline relative group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-800 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link 
            to="/agendamentos" 
            className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 no-underline relative group"
          >
            Agendamentos
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-800 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link 
            to="/novo" 
            className="btn btn-primary btn-small shadow-lg hover:shadow-xl"
          >
            ✨ Novo Agendamento
          </Link>
        </div>
      </div>
    </nav>
  );
}
