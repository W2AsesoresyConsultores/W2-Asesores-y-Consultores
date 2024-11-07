import React from "react";
import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import { FcGoogle } from "react-icons/fc";

function RegisterForm({
  email, setEmail, password, setPassword, name, setName, surname, setSurname,
  dni, setDni, telefono, setTelefono, distrito, setDistrito, fechaNac, setFechaNac,
  error, setError, isLogin, setIsLogin, handleRegister, handleLogin, handleGoogleLogin
}) {
  return (
    <div>
      {isLogin ? (
        <Box component="form" onSubmit={handleLogin} sx={{ maxWidth: 400, mx: 'auto', p: 3 }}>
          <Typography variant="h5" component="h2" textAlign="center" mb={2}>
            Inicia sesión en Power
          </Typography>
          <Typography variant="body2" textAlign="center" color="textSecondary" mb={3}>
            Descubre los puestos disponibles
          </Typography>
          <Button
            variant="outlined"
            startIcon={<FcGoogle />}
            fullWidth
            sx={{ mb: 1 }}
            onClick={handleGoogleLogin}
          >
            Iniciar con Google
          </Button>
          <Divider>O usar email</Divider>
          <TextField
            type="email"
            label="Correo"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            type="password"
            label="Contraseña"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          {error && <Typography color="error" mb={2}>{error}</Typography>}
          <Box textAlign="right" mb={3}>
            <Typography variant="body2" color="primary" component="a" href="#" sx={{ textDecoration: 'none' }}>
              Olvidaste tu contraseña?
            </Typography>
          </Box>
          <Button type="submit" variant="contained" sx={{ backgroundColor: '#2563eb' }} fullWidth>
            Iniciar sesión
          </Button>
          <Typography textAlign="center" mt={2}>
            No tienes una cuenta?{' '}
            <Typography variant="body2" color="primary" component="span" onClick={() => setIsLogin(false)} sx={{ cursor: 'pointer' }}>
              Regístrate
            </Typography>
          </Typography>
        </Box>
      ) : (
        <form className="pt-20" onSubmit={handleRegister}>
          <h2 className="font-bold text-2xl text-primarycolor text-center pb-6">Regístrate en Power</h2>
          <div className="mb-8">
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-primarycolor focus:bg-white focus:outline-none"
            />
          </div>
          <div className="mb-8">
            <input
              type="text"
              placeholder="Apellido"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-primarycolor focus:bg-white focus:outline-none"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-3 py-3 rounded-lg bg-gray-200 border focus:border-primarycolor focus:bg-white focus:outline-none"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="flex-1 px-4 py-3 rounded-lg bg-gray-200 border focus:border-primarycolor focus:bg-white focus:outline-none"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <input
              type="text"
              placeholder="DNI"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              required
              className="flex-1 px-4 py-3 rounded-lg bg-gray-200 border focus:border-primarycolor focus:bg-white focus:outline-none"
            />
            <input
              type="text"
              placeholder="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
              className="flex-1 px-4 py-3 rounded-lg bg-gray-200 border focus:border-primarycolor focus:bg-white focus:outline-none"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <input
              type="text"
              placeholder="Distrito"
              value={distrito}
              onChange={(e) => setDistrito(e.target.value)}
              required
              className="flex-1 px-4 py-3 rounded-lg bg-gray-200 border focus:border-primarycolor focus:bg-white focus:outline-none"
            />
            <input
              type="date"
              placeholder="Fecha de Nacimiento"
              value={fechaNac}
              onChange={(e) => setFechaNac(e.target.value)}
              required
              className="flex-1 px-4 py-3 rounded-lg bg-gray-200 border focus:border-primarycolor focus:bg-white focus:outline-none"
            />
          </div>
          {error && <p className="mb-4 text-red-500">{error}</p>}
          <button
            type="submit"
            className="transition duration-200 bg-[#ffe946] hover:bg-[#fff084] focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-primarycolor h-10 flex py-2.5 rounded-lg text-md shadow-sm hover:shadow-md font-semibold text-center justify-center items-center mx-auto w-full"
          >
            Registrar
          </button>
          <p
            onClick={() => setIsLogin(true)}
            className="mt-4 text-center text-blue-500 cursor-pointer hover:underline"
          >
            ¿Ya tienes una cuenta? Inicia sesión
          </p>
        </form>
      )}
    </div>
  );
}

export default RegisterForm;