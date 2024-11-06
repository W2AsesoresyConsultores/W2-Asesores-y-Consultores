import React, { useContext, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaSun, FaMoon } from 'react-icons/fa';
import { IoChatbubbleOutline, IoCalendarClearOutline, IoStatsChartOutline } from "react-icons/io5";
import { RxAvatar, RxDashboard } from "react-icons/rx";
import { useSpring, animated } from '@react-spring/web';
import { supabase } from "../../supabase/supabase.config";
import { ThemeContext } from "../../Context/ThemeContext";

// Componente reutilizable para los items del menú
const MenuItem = ({ to, icon: Icon, label, themeMode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const styles = useSpring({
    backgroundColor: isActive ? 'rgba(0, 123, 255, 0.2)' : 'transparent',
    color: isActive ? '#007bff' : themeMode === 'light' ? '#555' : '#ccc',
  });

  return (
    <animated.div style={styles} className="rounded-lg hover:bg-opacity-20">
      <Link to={to} className="flex items-center py-3 px-6 transition duration-300 ease-in-out font-medium">
        <Icon className="mr-4 text-xl" /> {label}
      </Link>
    </animated.div>
  );
};

function MenuAdmin() {
  const navigate = useNavigate();
  const { toggleTheme, themeMode } = useContext(ThemeContext); // Usamos el contexto de tema

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error cerrando sesión:', error.message);
        return;
      }
      localStorage.clear();
      navigate('/Power');
    } catch (error) {
      console.error('Error cerrando sesión:', error);
    }
  };

  const menuItems = useMemo(() => [
    { to: "/Admin", icon: RxDashboard, label: "Ofertas" },
    { to: "/Programa", icon: IoCalendarClearOutline, label: "Entrevistas" },
    { to: "/Conversaciones", icon: IoChatbubbleOutline, label: "Conversaciones" },
    { to: "/Estadisticas", icon: IoStatsChartOutline, label: "Estadísticas" },
    { to: "/AdminProfile", icon: RxAvatar, label: "Mi Perfil" },
  ], []);

  return (
    <div className={`w-60 h-screen z-10 font-lato dark:border-r dark:border-gray-800 ${themeMode === 'light' ? 'bg-white text-gray-800' : 'bg-[#141a21] text-gray-300'} px-4 shadow-sm flex flex-col justify-between pt-8 fixed`}>
      {/* Header del menú */}
      <div className="flex justify-between items-center px-6 mb-8">
        <h2 className="text-2xl font-semibold font-dmsans text-primarycolor text-center">Power</h2>
        <button onClick={toggleTheme} className="text-xl">
          {themeMode === 'light' ? <FaMoon /> : <FaSun />}
        </button>
      </div>

      {/* Menú de navegación */}
      <ul className="space-y-4">
        {menuItems.map(({ to, icon, label }) => (
          <li key={to}>
            <MenuItem to={to} icon={icon} label={label} themeMode={themeMode} />
          </li>
        ))}
      </ul>

      {/* Botón de cerrar sesión */}
      <div className="px-6 pb-12">
        <button onClick={handleLogout} className="flex items-center text-red-500 transition duration-300 ease-in-out">
          <FaSignOutAlt className="mr-3 text-xl" /> Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default MenuAdmin;
