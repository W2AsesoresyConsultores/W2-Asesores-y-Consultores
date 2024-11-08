import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import ShareModal from "./ShareModal";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {
  Box,
  TextField,
  Button,
  Input,
  Typography,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { supabase } from '../../supabase/supabase.config';

const Step3 = ({ data, handleChange, prevStep, onSubmit }) => {
  const [questions, setQuestions] = useState([""]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [updatedData, setUpdatedData] = useState(null);
  const [companyImage, setCompanyImage] = useState(null);

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

    const newData = {
      ...data,
      preg_1: questions[0] || "",
      preg_2: questions[1] || "",
      preg_3: questions[2] || "",
      preg_4: questions[3] || "",
      preg_5: questions[4] || "",
      preg_6: questions[5] || "",
    };

    const { data: ofertaData, error: ofertaError } = await supabase
      .from("Oferta")
      .insert([newData])
      .select();

    if (ofertaError) {
      console.error("Error al crear la oferta:", ofertaError);
      return;
    }

    const ofertaId = ofertaData[0].id_oferta;

    if (companyImage) {
      const { data: imageData, error: imageError } = await supabase.storage
        .from("empresa_img")
        .upload(`${ofertaId}/${companyImage.name}`, companyImage);

      if (imageError) {
        console.error("Error al subir la imagen:", imageError);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("empresa_img")
        .getPublicUrl(`${ofertaId}/${companyImage.name}`);

      const { error: updateError } = await supabase
        .from("Oferta")
        .update({ empresa_img_url: publicUrlData.publicUrl })
        .eq("id_oferta", ofertaId);

      if (updateError) {
        console.error("Error al actualizar la URL de la imagen:", updateError);
        return;
      }
    }

    setUpdatedData(ofertaData[0]);
    setModalOpen(true);
    onSubmit(ofertaData[0]);
  };

  return (
    <Box
      fullWidth
      sx={{
        maxWidth: 600,
        minWidth: 600,
        mx: "auto",
        mt: 0,
        p: 3,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      {/* Modalidad */}
      <Box mb={3}>
        <Typography variant="body1" gutterBottom sx={{ color: 'text.primary' }}>
          Modalidad
        </Typography>
        <Select
          name="modalidad"
          value={data.modalidad}
          onChange={handleChange}
          fullWidth
          required
          sx={{
            bgcolor: 'background.default',
            color: 'text.primary',
            '& .MuiSelect-icon': {
              color: 'text.primary',
            },
            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
              borderColor: 'text.primary',
            },
            '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
              borderColor: 'text.primary',
            }
          }}
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
        value={data.horario}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        sx={{ bgcolor: 'background.default', color: 'text.primary' }}
      />

      {/* Imagen de la empresa */}
      <Box mb={3}>
        <Typography variant="body1" gutterBottom sx={{ color: 'text.primary' }}>
          Imagen de la empresa
        </Typography>
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
        <Typography variant="body1" gutterBottom sx={{ color: 'text.primary' }}>
          Preguntas para el Postulante
        </Typography>
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
              sx={{ bgcolor: 'background.default', color: 'text.primary' }}
            />
            {index === questions.length - 1 && questions.length < 6 && (
              <IconButton color="primary" onClick={addQuestion}>
                <IoMdAdd />
              </IconButton>
            )}
            {index > 0 && (
              <IconButton
                color="secondary"
                onClick={() => removeQuestion(index)}
              >
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
          Enviar
        </Button>
      </Box>

      {/* Modal */}
      {isModalOpen && updatedData && (
        <ShareModal
          selectedJob={updatedData}
          onClose={() => setModalOpen(false)}
        />
      )}
    </Box>
  );
};

export default Step3;