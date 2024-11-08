import React, { useState, useEffect } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { MdDeleteForever } from 'react-icons/md';
import { Box, TextField, Button, Input, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { supabase } from '../../supabase/supabase.config';

const EditStep3 = ({ data, handleChange, prevStep, onSubmit }) => {
  const [recruiterNumber, setRecruiterNumber] = useState(data.id_reclutador || "");
  const [questions, setQuestions] = useState([
    data.preg_1 || "",
    data.preg_2 || "",
    data.preg_3 || "",
    data.preg_4 || "",
    data.preg_5 || "",
    data.preg_6 || ""
  ]);
  const [companyImage, setCompanyImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(data.empresa_img_url || null);
  const [openModal, setOpenModal] = useState(false);  // Estado para el modal

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
    window.location.href = 'http://localhost:5173/Admin'; // Redirigir al inicio
  };

  return (
    <Box fullWidth sx={{ maxWidth: 600, minWidth: 600, mx: "auto", mt: 0, p: 3, bgcolor: "background.paper", borderRadius: 2, boxShadow: 1 }}>
      <TextField
        label="Número de Reclutador"
        variant="outlined"
        name="recruiterNumber"
        value={recruiterNumber}
        onChange={handleRecruiterNumberChange}
        fullWidth
        required
        margin="normal"
      />
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
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Actualizar
      </Button>

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