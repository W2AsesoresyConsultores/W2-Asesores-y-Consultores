import React, { createContext, useState, useEffect, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(localStorage.getItem('theme') || 'light');

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.body.classList.toggle('dark', themeMode === 'dark'); // Agrega o quita la clase 'dark' en el body
    localStorage.setItem('theme', themeMode); // Guarda el tema en localStorage
  }, [themeMode]);

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode: themeMode,
        primary: {
          main: themeMode === 'light' ? '#007bff' : '#90caf9',
        },
        background: {
          default: themeMode === 'light' ? '#ffffff' : '#121212',
          paper: themeMode === 'light' ? '#ffffff' : '#1e1e1e',
        },
        text: {
          primary: themeMode === 'light' ? '#333' : '#fff',
        },
      },
    }), [themeMode]
  );

  return (
    <ThemeContext.Provider value={{ toggleTheme, themeMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
