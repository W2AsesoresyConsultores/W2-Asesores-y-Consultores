import React, { useState, useEffect } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { MdDeleteForever } from 'react-icons/md';
import { Box, TextField, Button, Input, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { supabase } from '../../supabase/supabase.config';
import { useNavigate } from 'react-router-dom';

const EditStep3 = ({ data, handleChange, prevStep, onSubmit }) => {
  const navigate = useNavigate();
  const [recruiterNumber, setRecruiterNumber] = useState(data.id_reclutador || "");
  const [questions, setQuestions] = useState([
    data.preg_1 || "",
    data.preg_2 || "",
    data.preg_3 || "",
    data.preg_4 || "",
    data.preg_5 || "",
    data.preg_6 || ""
  ].filter(q => q));
  const [companyImage, setCompanyImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(data.empresa_img_url || null);
  const [openModal, setOpenModal] = useState(false);  // Estado para el modal
  const [modalidad, setModalidad] = useState(data.modalidad || "");
  const [horario, setHorario] = useState(data.horario || "");

  useEffect(() => {
    if (data.empresa_img_url) {
      setImageUrl(data.empresa_img_url);
    }
  }, [data]);

  const handleRecruiterNumberChange = (e) => setRecruiterNumber(e.target.value);

  const handleQuestionChange = (index, e) => {
    const newQuestions = [...questions];
    newQuestions[index] = e.target.value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    if (questions.length < 6) {
      setQuestions([...questions, ""]);
    }
  };

  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleImageChange = (e) => {
    setCompanyImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...data,
      id_reclutador: recruiterNumber,
      modalidad,
      horario,
      preg_1: questions[0] || "",
      preg_2: questions[1] || "",
      preg_3: questions[2] || "",
      preg_4: questions[3] || "",
      preg_5: questions[4] || "",
      preg_6: questions[5] || "",
    };

    await onSubmit(updatedData); // Envío de datos

    // Si se seleccionó una nueva imagen
    if (companyImage) {
      // Eliminar la imagen existente si hay una
      if (data.empresa_img_url) {
        const imageName = data.empresa_img_url.split('/').pop(); // Obtener el nombre de la imagen existente
        const { error: deleteError } = await supabase.storage
          .from('empresa_img')
          .remove([`${data.id_oferta}/${imageName}`]);

        if (deleteError) {
          console.error("Error al eliminar la imagen existente:", deleteError);
          return;
        }
      }

      // Subir la nueva imagen
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('empresa_img')
        .upload(`${data.id_oferta}/${companyImage.name}`, companyImage);

      if (uploadError) {
        console.error("Error al subir la nueva imagen:", uploadError);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('empresa_img')
        .getPublicUrl(`${data.id_oferta}/${companyImage.name}`);

      await supabase
        .from('Oferta')
        .update({ empresa_img_url: publicUrlData.publicUrl })
        .eq('id_oferta', data.id_oferta);
        
      setImageUrl(publicUrlData.publicUrl); // Actualiza URL de la imagen
    }

    // Mostrar el modal de éxito
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    navigate('/Admin');
  };

  return (
    <Box fullWidth sx={{ maxWidth: 600, minWidth: 600, mx: "auto", mt: 0, p: 3, bgcolor: "background.paper", borderRadius: 2, boxShadow: 1 }}>
      {/* Modalidad */}
      <Box mb={3}>
        <Typography variant="body1" gutterBottom>Modalidad</Typography>
        <Select
          name="modalidad"
          value={modalidad}
          onChange={e => setModalidad(e.target.value)}
          fullWidth
          required
        >
          <MenuItem value="">Selecciona una modalidad</MenuItem>
          <MenuItem value="Presencial">Presencial</MenuItem>
          <MenuItem value="Remoto">Remoto</MenuItem>
          <MenuItem value="Híbrido">Híbrido</MenuItem>
        </Select>
      </Box>

      {/* Horario */}
      <TextField
        label="Horario"
        variant="outlined"
        name="horario"
        value={horario}
        onChange={e => setHorario(e.target.value)}
        fullWidth
        required
        margin="normal"
      />
      
      {/* Imagen de la empresa */}
      <Box mb={3}>
        <Typography variant="body1" gutterBottom>Imagen de la empresa</Typography>
        {imageUrl && <img src={imageUrl} alt="Imagen de la empresa" width="100%" />}
        <label htmlFor="upload-image">
          <Input
            id="upload-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            sx={{ width: '100%', height: 'auto', border: '1px solid #ccc', padding: '16px', borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <PhotoCamera fontSize="large" />
          </IconButton>
        </label>
      </Box>

      {/* Preguntas para el Postulante */}
      <Box mb={3}>
        <Typography variant="body1" gutterBottom>Preguntas para el Postulante</Typography>
        {questions.map((question, index) => (
          <Box key={index} display="flex" alignItems="center" mb={2}>
            <TextField
              value={question}
              onChange={(e) => handleQuestionChange(index, e)}
              fullWidth
              placeholder={`Pregunta ${index + 1}`}
              required={index === 0}
              variant="outlined"
              margin="normal"
            />
            {index === questions.length - 1 && questions.length < 6 && (
              <IconButton color="primary" onClick={addQuestion}>
                <IoMdAdd />
              </IconButton>
            )}
            {index > 0 && (
              <IconButton color="secondary" onClick={() => removeQuestion(index)}>
                <MdDeleteForever />
              </IconButton>
            )}
          </Box>
        ))}
      </Box>
      
      {/* Botones de navegación */}
      <Box display="flex" justifyContent="space-between" mt={3}>
        <Button variant="contained" color="secondary" onClick={prevStep}>
          Anterior
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Actualizar
        </Button>
      </Box>

      {/* Modal de éxito */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Éxito</DialogTitle>
        <DialogContent>
          <Typography>Los datos se han actualizado correctamente.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">Aceptar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EditStep3;