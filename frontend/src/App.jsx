import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
import { Home, Agendamentos, NovoAgendamento, EditarAgendamento } from "./pages";
import "./index-tailwind.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agendamentos" element={<Agendamentos />} />
          <Route path="/novo" element={<NovoAgendamento />} />
          <Route path="/editar/:id" element={<EditarAgendamento />} />
        </Routes>
        
        <footer className="bg-gray-800 text-white py-4 mt-auto">
          <div className="container-main text-center text-sm">
            <p>
              © 2026 QuadraBook - Sistema de Agendamento de Quadras Esportivas
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
