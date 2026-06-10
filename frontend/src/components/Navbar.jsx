import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="container-main flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <div className="text-2xl font-bold text-blue-600">🏐</div>
          <h1 className="text-xl font-bold text-gray-900 m-0">
            QuadraBook
          </h1>
        </Link>
        
        <div className="flex items-center gap-4">
          <Link 
            to="/" 
            className="text-gray-600 hover:text-blue-600 transition no-underline"
          >
            Home
          </Link>
          <Link 
            to="/agendamentos" 
            className="text-gray-600 hover:text-blue-600 transition no-underline"
          >
            Agendamentos
          </Link>
          <Link 
            to="/novo" 
            className="btn btn-primary btn-small"
          >
            + Novo
          </Link>
        </div>
      </div>
    </nav>
  );
}
