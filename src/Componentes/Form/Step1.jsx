import React, { useState } from 'react';
import { TextField, Button, Box, InputAdornment, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const Step1 = ({ data, handleChange, nextStep }) => {
    const [sueldoOption, setSueldoOption] = useState(''); // Estado para la opción de sueldo
    const [sueldoDesde, setSueldoDesde] = useState('');
    const [sueldoHasta, setSueldoHasta] = useState('');

    // Maneja el cambio de la opción de sueldo
    const handleSueldoOptionChange = (event) => {
        const selectedOption = event.target.value;
        setSueldoOption(selectedOption);
        handleChange({
            target: {
                name: 'sueldo',
                value: '', // Restablecer el valor de sueldo cuando cambie la opción
            },
        });
        setSueldoDesde(''); // Restablece los campos de sueldo
        setSueldoHasta('');
    };

    // Función para manejar el cambio en el campo de sueldo fijo
    const handleSueldoFijoChange = (event) => {
        handleChange(event);
    };

    // Función para manejar el cambio en los campos de sueldo desde y hasta
    const handleSueldoRangoChange = (event) => {
        const { name, value } = event.target;
        if (name === 'sueldoDesde') {
            setSueldoDesde(value);
            handleChange({
                target: {
                    name: 'sueldo',
                    value: `${value} - ${sueldoHasta}`, // Actualiza sueldo concatenando sueldoDesde y sueldoHasta
                },
            });
        } else {
            setSueldoHasta(value);
            handleChange({
                target: {
                    name: 'sueldo',
                    value: `${sueldoDesde} - ${value}`, // Actualiza sueldo concatenando sueldoDesde y sueldoHasta
                },
            });
        }
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 0, p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
            <TextField
                label="Puesto"
                variant="outlined"
                name="puesto"
                value={data.puesto}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
            />
            <TextField
                label="Descripción"
                variant="outlined"
                name="descripcion"
                value={data.descripcion}
                onChange={handleChange}
                fullWidth
                required
                multiline
                rows={4}
                margin="normal"
            />
            <TextField
                label="Lugar"
                variant="outlined"
                name="ubicacion"
                value={data.ubicacion}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
            />
            <TextField
                label="Empresa"
                variant="outlined"
                name="empresa"
                value={data.empresa}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                InputProps={{
                    startAdornment: <InputAdornment position="start">W2 -</InputAdornment>,
                }}
            />

            {/* Selección de tipo de sueldo */}
            <FormControl fullWidth margin="normal">
                <InputLabel>Selecciona una opción</InputLabel>
                <Select
                    value={sueldoOption}
                    onChange={handleSueldoOptionChange}
                    displayEmpty
                >
                    <MenuItem value="" disabled>Selecciona una opción</MenuItem>
                    <MenuItem value="sueldoFijo">Sueldo Fijo</MenuItem>
                    <MenuItem value="sueldoRango">Sueldo Desde - Hasta</MenuItem>
                </Select>
            </FormControl>

            {/* Campos de sueldo dinámicos según la opción seleccionada */}
            {sueldoOption === 'sueldoFijo' && (
                <TextField
                    label="Sueldo Fijo"
                    variant="outlined"
                    name="sueldo"
                    value={data.sueldo}
                    onChange={handleSueldoFijoChange}
                    fullWidth
                    required
                    margin="normal"
                />
            )}

            {sueldoOption === 'sueldoRango' && (
                <Box display="flex" alignItems="center" gap={2}>
                    <TextField
                        label="Desde"
                        variant="outlined"
                        name="sueldoDesde"
                        value={sueldoDesde}
                        onChange={handleSueldoRangoChange}
                        required
                        margin="normal"
                        sx={{ flex: 1 }}
                    />
                    <span>-</span>
                    <TextField
                        label="Hasta"
                        variant="outlined"
                        name="sueldoHasta"
                        value={sueldoHasta}
                        onChange={handleSueldoRangoChange}
                        required
                        margin="normal"
                        sx={{ flex: 1 }}
                    />
                </Box>
            )}

            <Box mt={3} display="flex" justifyContent="flex-end">
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={nextStep}
                >
                    Siguiente
                </Button>
            </Box>
        </Box>
    );
};

export default Step1;