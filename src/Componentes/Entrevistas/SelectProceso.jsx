import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase/supabase.config';

function SelectProceso({ idReclutador, onSelectProceso }) {
  const [procesos, setProcesos] = useState([]);

  useEffect(() => {
    const fetchProcesos = async () => {
      const { data, error } = await supabase
        .from('Programa')
        .select('id_programa, id_oferta')
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
    <div className="mb-4">
      <h3 className="font-medium text-gray-700">Selecciona un Proceso</h3>
      <select
        onChange={(e) => handleSelect(e.target.value)}
        className="border rounded p-2 mt-2">
        <option value="">Selecciona una oferta</option>
        {procesos.map((proceso) => (
          <option key={proceso.id_programa} value={proceso.id_oferta}>
            Oferta {proceso.id_oferta}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectProceso;