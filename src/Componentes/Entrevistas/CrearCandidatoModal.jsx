import React, { useState } from 'react';
import { supabase } from '../../supabase/supabase.config';
import { v4 as uuidv4 } from 'uuid';
import { Button, Modal, TextField, CircularProgress, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloseIcon from '@mui/icons-material/Close';

function CrearCandidatoModal({ idReclutador, idOferta, setCandidatosNoAuth }) {
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

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen} >
        Crear Candidato
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '300px',
        }}>
          <IconButton onClick={handleClose} style={{ alignSelf: 'flex-end' }}>
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
            />
            <TextField
              label="DNI"
              variant="outlined"
              fullWidth
              margin="normal"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              required
            />
            <TextField
              label="Teléfono"
              variant="outlined"
              fullWidth
              margin="normal"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color={success ? 'success' : 'primary'}
              fullWidth
              disabled={loading}
              style={{ marginTop: '20px' }}
            >
              {loading ? <CircularProgress size={24} /> : (success ? <CheckCircleIcon /> : 'Guardar')}
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default CrearCandidatoModal;