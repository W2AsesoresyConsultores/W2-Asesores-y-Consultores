import React, { useState, useContext } from 'react';
import { supabase } from '../../supabase/supabase.config';
import { v4 as uuidv4 } from 'uuid';
import { Button, Modal, TextField, CircularProgress, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeContext } from '../../Context/ThemeContext';

function CrearCandidatoModal({ idReclutador, idOferta, setCandidatosNoAuth }) {
  const { themeMode } = useContext(ThemeContext); // Accedemos a themeMode desde el contexto
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState('');
  const [dni, setDni] = useState('');
  const [telefono, setTelefono] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setNombre('');
    setDni('');
    setTelefono('');
    setLoading(false);
    setSuccess(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!nombre || !dni || !telefono || !idReclutador || !idOferta) return;

    setLoading(true);
    setSuccess(false);

    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // YYYY-MM-DD

    const candidatoData = {
      id_user: uuidv4(),
      id_reclutador: idReclutador,
      id_oferta: idOferta,
      nombre,
      dni,
      telefono,
      estado_etapas: [],
      estado: 'apto',
      fecha: formattedDate,
    };

    const { error } = await supabase.from('CandidatosNoAuth').insert(candidatoData);

    setLoading(false);

    if (error) {
      console.error('Error al crear candidato:', error);
      return;
    }

    setSuccess(true);
    setCandidatosNoAuth((prev) => [...prev, candidatoData]);
    resetForm();
  };

  const modalStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeMode === 'dark' ? '#333' : '#fff', // Fondo condicional
    color: themeMode === 'dark' ? 'white' : 'black',         // Color de texto condicional
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
  };

  const inputStyle = {
    color: themeMode === 'dark' ? 'white' : 'black',
    backgroundColor: themeMode === 'dark' ? '#444' : '#f0f0f0',
  };

  const labelStyle = {
    color: themeMode === 'dark' ? 'lightgray' : 'gray',
  };

  return (
    <div>
     <Tooltip title="Añadir candidato">
      <Button 
        variant="text" 
        color="primary" 
        onClick={handleOpen} 
        sx={{ px: 0 }}
      >
        <AddIcon />
      </Button>
    </Tooltip>
      <Modal open={open} onClose={handleClose}>
        <div style={modalStyle}>
          <IconButton onClick={handleClose} style={{ alignSelf: 'flex-end', color: themeMode === 'dark' ? 'white' : 'black' }}>
            <CloseIcon />
          </IconButton>
          <h2>Nuevo Candidato</h2>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              margin="normal"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              InputLabelProps={{ style: labelStyle }}
              InputProps={{ style: inputStyle }}
            />
            <TextField
              label="DNI"
              variant="outlined"
              fullWidth
              margin="normal"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              required
              InputLabelProps={{ style: labelStyle }}
              InputProps={{ style: inputStyle }}
            />
            <TextField
              label="Teléfono"
              variant="outlined"
              fullWidth
              margin="normal"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
              InputLabelProps={{ style: labelStyle }}
              InputProps={{ style: inputStyle }}
            />
            <Button
              type="submit"
              variant="contained"
              color={success ? 'success' : 'primary'}
              fullWidth
              disabled={loading}
              style={{ marginTop: '20px', color: 'white', backgroundColor: success ? '#4caf50' : '#1976d2' }}
            >
              {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : (success ? <CheckCircleIcon /> : 'Guardar')}
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default CrearCandidatoModal;
