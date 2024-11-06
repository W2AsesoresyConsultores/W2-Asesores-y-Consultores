import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase/supabase.config';

function SelectProceso({ idReclutador, onSelectProceso }) {
  const [procesos, setProcesos] = useState([]);

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

  const handleSelect = (idOferta) => {
    onSelectProceso(idOferta);
  };

  return (
    <div className="mb-4 mt-6">
      <h3 className="font-bold text-lg text-gray-700">Procesos del Reclutador</h3>
      <select
        onChange={(e) => handleSelect(e.target.value)}
        className="border rounded p-2 mt-2 w-full"
        defaultValue=""
      >
        <option value="" disabled>Selecciona un Proceso</option>
        {procesos.map((proceso) => (
          <option key={proceso.id_programa} value={proceso.id_oferta}>
            {proceso.proceso}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectProceso;