import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/supabase.config";
import HeaderPower from "./HeaderPower";
import DashboardContent from '../../assets/BGPOWER.svg';
import RegisterForm from "./RegisterForm";
import VerificationMessage from "./VerificationMessage";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [dni, setDni] = useState("");
  const [telefono, setTelefono] = useState("");
  const [distrito, setDistrito] = useState("");
  const [fechaNac, setFechaNac] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [showVerification, setShowVerification] = useState(false); // Nuevo estado
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const fullName = `${name} ${surname}`;
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (signUpError) {
        setError("Hubo un problema al registrarse.");
        return;
      }
      const user = data.user;
      if (user) {
        const perfilData = {
          nombre: fullName,
          correo: email,
          id: user.id,
          rol: "candidato",
          user_id: user.id,
          dni: dni,
          telefono: telefono,
          distrito: distrito,
          fecha_nac: fechaNac,
        };
        const { error: profileError } = await supabase.from("perfiles").insert(perfilData);
        if (profileError) {
          setError("Hubo un problema al crear el perfil.");
          return;
        }
        const experienciaData = {
          user_id: user.id,
        };
        const { error: experienciaError } = await supabase.from("Experiencia").insert(experienciaData);
        if (experienciaError) {
          setError("Hubo un problema al crear la experiencia.");
          return;
        }
        
        // Mostrar mensaje de verificación
        setShowVerification(true);
      }
    } catch (error) {
      setError("Hubo un problema al registrarse. Inténtalo de nuevo.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (loginError) {
        setError(loginError.message);
        return;
      }
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        setError("No se pudo obtener la sesión.");
        return;
      }
      const user = sessionData.session.user;
      const { data: perfil, error: perfilError } = await supabase
        .from("perfiles")
        .select("rol")
        .eq("user_id", user.id)
        .single();
      if (perfilError) {
        setError("Error al verificar el perfil.");
        return;
      }
      const currentPath = window.location.pathname;
      if (perfil) {
        if (currentPath === "/AdminLogin" && perfil.rol === "reclutador") {
          navigate("/Admin");
        } else if (currentPath === "/Login" && perfil.rol === "candidato") {
          navigate("/PowerAuth");
        } else {
          setError("No tienes permiso para acceder a esta sección.");
        }
      } else {
        setError("Perfil no encontrado.");
      }
    } catch (error) {
      setError("Hubo un problema al iniciar sesión. Inténtalo de nuevo.");
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      const { error: googleError } = await supabase.auth.signInWithOAuth({
        provider: "google"
      });
      if (googleError) {
        setError(googleError.message);
        return;
      }
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData?.session) {
        setError("No se pudo obtener el usuario después de iniciar sesión con Google.");
        return;
      }
      const user = sessionData.session.user;
      const { data: existingUser, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('email', user.email)
        .single();
      if (userError && userError.code !== '23503') {
        setError("Error al verificar el usuario.");
        return;
      }
      if (!existingUser) {
        const { error: createUserError } = await supabase
          .from('users')
          .insert([{ email: user.email }]);
        if (createUserError) {
          setError("Error al registrar el nuevo usuario.");
          return;
        }
        const { error: verificationError } = await supabase.auth.api.sendVerificationEmail(user.email);
        if (verificationError) {
          setError("Error al enviar el correo de verificación.");
          return;
        }
      }
      navigate("/PowerAuth");
    } catch (error) {
      setError("Hubo un problema al iniciar sesión con Google. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="flex justify-center min-h-screen font-dmsans">
      <HeaderPower />
      <div className="w-1/2 h-screen bg-primarygradientdark hidden md:flex justify-center items-center relative">
        <img
          src="https://png.pngtree.com/png-vector/20240614/ourmid/pngtree-vibrant-yellow-abstract-background-with-textured-white-lines-on-isolated-patterned-png-image_12219818.png"
          className="opacity-40 w-full h-full object-cover"
          alt=""
        />
        <img
          src={DashboardContent}
          className="absolute w-auto h-96"
          alt="Dashboard Content"
        />
      </div>
      <div className="md:w-1/2 h-screen py-6 bg-white flex items-center mx-auto px-4 lg:px-40 justify-center overflow-y-scroll">
        {showVerification ? (
          <VerificationMessage />
        ) : (
          <RegisterForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            name={name}
            setName={setName}
            surname={surname}
            setSurname={setSurname}
            dni={dni}
            setDni={setDni}
            telefono={telefono}
            setTelefono={setTelefono}
            distrito={distrito}
            setDistrito={setDistrito}
            fechaNac={fechaNac}
            setFechaNac={setFechaNac}
            error={error}
            setError={setError}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            handleRegister={handleRegister}
            handleLogin={handleLogin}
            handleGoogleLogin={handleGoogleLogin}
          />
        )}
      </div>
    </div>
  );
}

export default Register;