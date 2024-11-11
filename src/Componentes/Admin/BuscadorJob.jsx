import React, { useContext } from 'react';
import { ThemeContext } from '../../Context/ThemeContext'; // Asegúrate de importar el contexto de tema
import JobsContext from '../../Context/JobsContext';
import { IoSearch } from "react-icons/io5";
import { TextField, InputAdornment } from '@mui/material';

function BuscadorJob() {
  const { searchTerm, setSearchTerm } = useContext(JobsContext);
  const { themeMode } = useContext(ThemeContext); // Obtenemos el tema actual del contexto

  return (
    <TextField
      variant="outlined"
      fullWidth
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Buscar por puesto"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IoSearch style={{ color: themeMode === 'dark' ? '#ccc' : 'gray' }} />
          </InputAdornment>
        ),
        sx: {
          borderRadius: '50px',
          backgroundColor: themeMode === 'dark' ? '#2e2e2e' : '#fff',
          color: themeMode === 'dark' ? '#fff' : '#000',
        }
      }}
      sx={{
        width: {
          lg: '24rem',
          md: '16rem',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: themeMode === 'dark' ? '#555' : 'gray',
          },
          '&:hover fieldset': {
            borderColor: themeMode === 'dark' ? '#90caf9' : '#6366F1',
          },
          '&.Mui-focused fieldset': {
            borderColor: themeMode === 'dark' ? '#ffffff' : 'primary',
          },
        },
        transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease', // Transición suave
      }}
    />
  );
}

export default BuscadorJob;
