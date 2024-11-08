import React, { useEffect, useState } from 'react';
import HeaderPowerAuth from '../PowerAuth/HeaderPowerAuth';
import FormOferta from './FormOferta';
import EditJob from './EditJob';
import { Modal, Box, Typography, Button } from '@mui/material';

function AdminForm() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleBeforeUnload = (event) => {
    event.preventDefault();
    event.returnValue = ''; // Esto hace que el navegador muestre una advertencia.
  };

  const handleRouteChange = (e) => {
    // Si el modal está abierto, no hacemos nada.
    if (!isModalOpen) {
      e.preventDefault();
      setModalOpen(true);
    }
  };

  const handleCloseModal = (shouldLeave) => {
    setModalOpen(false);
    if (shouldLeave) {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      // Aquí puedes utilizar `history.push` o `navigate` según tu configuración
      // para cambiar de ruta si estás usando react-router
    }
  };

  useEffect(() => {
    // Añadir el evento de antes de salir
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    // Aquí puedes escuchar cambios en la ruta si es necesario
    const handlePopState = (e) => handleRouteChange(e);
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isModalOpen]);

  return (
    <div>
      <FormOferta />
      <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={{ ...modalStyle }}>
          <Typography variant="h6" component="h2">
            Advertencia
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Perderás el progreso si sales. ¿Estás seguro de que quieres continuar?
          </Typography>
          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button variant="contained" color="primary" onClick={() => handleCloseModal(true)}>
              Sí, salir
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => handleCloseModal(false)}>
              No, quedarme
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default AdminForm;