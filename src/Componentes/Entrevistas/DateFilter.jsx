import React, { useState } from 'react';
import { TextField, Box } from '@mui/material';

function DateFilter({ onDateFilter }) {
  const [date, setDate] = useState('');

  const handleDateChange = (e) => {
    setDate(e.target.value);
    onDateFilter(e.target.value); // Enviar la fecha al componente padre
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField
        label="Fecha"
        type="date"
        value={date}
        onChange={handleDateChange}
        InputLabelProps={{ shrink: true }}
      />
    </Box>
  );
}

export default DateFilter;