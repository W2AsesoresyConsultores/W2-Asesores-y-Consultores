import React, { useState, useEffect, useContext } from 'react';
import { supabase } from '../../supabase/supabase.config';
import { UserAuth } from "../../Context/AuthContext";
import { ThemeContext } from "../../Context/ThemeContext"; // Asegúrate de importar el contexto
import { FaSun, FaMoon } from 'react-icons/fa';

function HeaderAdmin() {
  const { user } = UserAuth();
  const { toggleTheme, themeMode } = useContext(ThemeContext); // Usar el contexto de tema

  const [profile, setProfile] = useState({
    nombre: '',
    avatar_url: ''
  });
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('perfiles')
        .select('nombre, avatar_url')
        .eq('id', userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }

      if (data) {
        setProfile({
          nombre: data.nombre,
          avatar_url: data.avatar_url,
        });
        localStorage.setItem('profile', JSON.stringify(data));
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      const storedProfile = localStorage.getItem('profile');
      
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
        setLoading(false);
      } else {
        fetchProfile(user.id);
      }

      const subscription = supabase
        .channel('custom-perfiles-channel')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'perfiles', filter: `id=eq.${user.id}` }, 
          (payload) => {
            const newProfile = {
              nombre: payload.new.nombre,
              avatar_url: payload.new.avatar_url,
            };

            setProfile(newProfile);
            localStorage.setItem('profile', JSON.stringify(newProfile));
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(subscription);
      };
    }
  }, [user?.id]);

  const getFirstName = (nombreCompleto) => {
    return nombreCompleto.split(' ')[0];
  };

  return (
    <div className="flex items-center pl-72 justify-between p-4 bg-white dark:bg-[#141a21] shadow-sm fixed w-full z-10 font-lato">
      <div className="text-gray-800 dark:text-gray-200">
        <span className="text-lg font-semibold">
          Hola, {getFirstName(profile.nombre)} 👋
        </span>
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Echemos un vistazo a tu actividad hoy.
        </div>
      </div>

      <div className="flex items-center space-x-4 min-w-64 pr-4">
        <button
          onClick={toggleTheme}
          className="relative w-16 h-8 rounded-full flex items-center mr-4 bg-gray-200 transition-colors duration-300"
          style={{
            backgroundColor: themeMode === "light" ? "#E2E8F0" : "#1E3A8A",
          }}
        >
          <div
            className={`absolute top-1 w-6 h-6 rounded-full transition-transform duration-300 transform flex items-center justify-center ${
              themeMode === "light"
                ? "translate-x-1 bg-white"
                : "translate-x-9 bg-gray-400"
            }`}
          >
            {themeMode === "light" ? (
              <FaSun className="text-yellowprimary text-sm" />
            ) : (
              <FaMoon className="text-white text-sm" />
            )}
          </div>
          {/* Icono Luna visible en modo claro */}
          {themeMode === "light" && (
            <FaMoon className="absolute right-2 text-gray-400 text-sm" />
          )}
          {/* Icono Sol visible en modo oscuro */}
          {themeMode === "dark" && (
            <FaSun className="absolute left-2 text-blue-100 text-sm" />
          )}
        </button>
        {loading ? (
          <div className="flex items-center space-x-2">
            <div className="loader"></div>
            <span>Cargando...</span>
          </div>
        ) : (
          <>
            <span className="text-gray-800 dark:text-gray-200 text-base font-medium w-44 truncate">
              {profile.nombre}
            </span>
            <img
              src={profile.avatar_url || 'https://static-00.iconduck.com/assets.00/user-avatar-happy-icon-2048x2048-ssmbv1ou.png'}
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
          </>
        )}

        {/* Botón para cambiar el tema */}
       
      </div>
    </div>
  );
}

export default HeaderAdmin;