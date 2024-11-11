import React, { useState } from 'react';
import { TextField } from '@mui/material';

function Filter({ onFilter }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onFilter(e.target.value);
  };

  return (
    <div className="">
      <TextField p={0}
        value={query}
        onChange={handleInputChange}
        placeholder="Buscar candidatos..."
        variant="outlined"
        fullWidth
        margin=""
        InputProps={{
          style: { padding: '0px' },
        }}
      />
    </div>
  );
}

export default Filter;
