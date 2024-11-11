import React from 'react';
import { Box, Button, Typography, Container, CssBaseline } from '@mui/material';

function VerificationMessage() {
  const handleAccept = () => {
    window.location.href = '/Login';
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography component="h1" variant="h5" align="center" sx={{ mb: 2, color: '#3f51b5' }}>
          ¡Estás a un paso de ingresar a Power!
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 3 }}>
          Ingresa a tu correo y verifica tu cuenta para poder ingresar.
        </Typography>
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleAccept}
        >
          Aceptar
        </Button>
      </Box>
    </Container>
  );
}

export default VerificationMessage;