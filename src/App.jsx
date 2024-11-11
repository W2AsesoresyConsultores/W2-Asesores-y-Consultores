import { Routes, Route } from "react-router-dom";
import Home from "./Componentes/Principal/Home.jsx";
import Empresas from "./Componentes/Empresas/Empresas.jsx";
import Practicantes from "./Componentes/Practicantes/Practicantes.jsx";
import ScrollToTop from "./Componentes/Principal/ScrollToTop.jsx";
import { AuthContextProvider } from "./Context/AuthContext.jsx";
import { JobsProvider } from "./Context/JobsContext.jsx";
import Privacidad from "./Componentes/Principal/Privacidad.jsx";
import ReservaAdmin from './Componentes/Reserva/ReservaAdmin.jsx';
import Auth from './Componentes/Reserva/Auth.jsx';
import Coworking from './Componentes/Coworking/Coworking.jsx';
import Contacto from './Componentes/Contacto/Contacto.jsx';
import { ThemeContextProvider } from './Context/ThemeContext.jsx';

function App() {
  return (
    <AuthContextProvider>  {/* Proveedor para la autenticación */}
      <ThemeContextProvider> {/* Proveedor para el tema */}
        <JobsProvider>       {/* Proveedor para los trabajos */}
          <ScrollToTop />
          <Routes>
            {/* Rutas Públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/Empresas" element={<Empresas />} />
            <Route path="/DescubriendoTalentos" element={<Practicantes />} />
            <Route path="/Privacidad" element={<Privacidad />} />
            <Route path="/Contacto" element={<Contacto />} />
            <Route path="/ReservaAdmin" element={<ReservaAdmin />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/Coworking" element={<Coworking />} />

          </Routes>
        </JobsProvider>
      </ThemeContextProvider>
    </AuthContextProvider>
  );
}

export default App;
