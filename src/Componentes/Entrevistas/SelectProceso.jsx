import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase/supabase.config';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function SelectProceso({ idReclutador, onSelectProceso }) {
  const [procesos, setProcesos] = useState([]);
  const [selectedProceso, setSelectedProceso] = useState('');

  useEffect(() => {
    const fetchProcesos = async () => {
      const { data, error } = await supabase
        .from('Programa')
        .select('id_programa, id_oferta, proceso')
        .eq('id_reclutador', idReclutador);

      if (error) {
        console.error('Error al obtener procesos:', error);
      } else {
        setProcesos(data);
      }
    };

    if (idReclutador) {
      fetchProcesos();
    }
  }, [idReclutador]);

  const handleSelect = (event) => {
    const idOferta = event.target.value;
    setSelectedProceso(idOferta);
    onSelectProceso(idOferta);
  };

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel>Cambiar de Proceso</InputLabel>
      <Select
        value={selectedProceso}
        onChange={handleSelect}
        label="Selecciona un Proceso"
      >
        {procesos.map((proceso) => (
          <MenuItem key={proceso.id_programa} value={proceso.id_oferta}>
            {proceso.proceso}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectProceso;
