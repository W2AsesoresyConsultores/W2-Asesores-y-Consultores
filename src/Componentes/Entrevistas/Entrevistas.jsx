import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../supabase/supabase.config';
import HeaderAdmin from '../Admin/HeaderAdmin';
import MenuAdmin from '../Admin/MenuAdmin';
import { UserAuth } from '../../Context/AuthContext';
import Filter from './Filter';
import CargarExcel from './CargarExcel';
import CrearCandidatoModal from './CrearCandidatoModal';
import DescargarPlantilla from './DescargarPlantilla';
import CandidateStageMover from './CandidateStageMover';
import SelectProceso from './SelectProceso';
import DateFilter from './DateFilter';

function Entrevistas() {
  const { user } = UserAuth();
  const { id_oferta } = useParams();
  const [idReclutador, setIdReclutador] = useState(null);
  const [idOferta, setIdOferta] = useState(id_oferta);
  const [candidatos, setCandidatos] = useState([]);
  const [candidatosNoAuth, setCandidatosNoAuth] = useState([]);
  const [programaData, setProgramaData] = useState([]);
  const [puesto, setPuesto] = useState('');
  const [filteredCandidatos, setFilteredCandidatos] = useState([]);
  const [selectedCandidatos, setSelectedCandidatos] = useState(new Set());
  const [selectedStage, setSelectedStage] = useState('');

  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      const { data: profileData, error: profileError } = await supabase
        .from('perfiles')
        .select('id')
        .eq('id', user.id)
        .single();

      if (profileError || !profileData) {
        console.error('Error al obtener perfil:', profileError);
        return;
      }

      setIdReclutador(profileData.id);
      await loadOfertaData(idOferta);
    };

    fetchData();
  }, [user, idOferta]);

  const loadOfertaData = async (ofertaId) => {
    if (!ofertaId) return;

    const { data: ofertaData, error: ofertaError } = await supabase
      .from('Oferta')
      .select('id_oferta, puesto, empresa')
      .eq('id_oferta', ofertaId)
      .single();

    if (ofertaError || !ofertaData) {
      console.error('Error al obtener datos de la oferta:', ofertaError);
      return;
    }

    setIdOferta(ofertaData.id_oferta);
    setPuesto(ofertaData.puesto);
    await loadCandidatos(ofertaData.id_oferta);
    await fetchProgramaData(ofertaData.id_oferta);
  };

  const loadCandidatos = async (ofertaId) => {
    const [postulacionData, noAuthData] = await Promise.all([
      supabase
        .from('Postulacion')
        .select('name_user, telefono, dni, fecha_postulacion, estado_etapas')
        .eq('id_oferta', ofertaId)
        .eq('estado', 'apto'),
      supabase
        .from('CandidatosNoAuth')
        .select('nombre, telefono, dni, fecha, estado_etapas')
        .eq('id_oferta', ofertaId)
        .eq('estado', 'apto')
    ]);

    if (postulacionData.error || noAuthData.error) {
      console.error('Error al obtener candidatos:', postulacionData.error || noAuthData.error);
      return;
    }

    setCandidatos(postulacionData.data);
    setCandidatosNoAuth(noAuthData.data);
  };

  const fetchProgramaData = async (ofertaId) => {
    const { data: programaData, error } = await supabase
      .from('Programa')
      .select('id_programa, empresa, lugar, etapas')
      .eq('id_oferta', ofertaId);

    if (error) {
      console.error('Error al obtener datos del Programa:', error);
      return;
    }

    setProgramaData(programaData);
  };

  useEffect(() => {
    const combinedCandidatos = [...candidatos, ...candidatosNoAuth].sort((a, b) => {
      return new Date(b.fecha_postulacion || b.fecha) - new Date(a.fecha_postulacion || a.fecha);
    });
    setFilteredCandidatos(combinedCandidatos);
  }, [candidatos, candidatosNoAuth]);

  const handleFilter = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = [...candidatos, ...candidatosNoAuth].filter(candidato =>
      (candidato.name_user && candidato.name_user.toLowerCase().includes(lowerCaseQuery)) ||
      (candidato.nombre && candidato.nombre.toLowerCase().includes(lowerCaseQuery)) ||
      (candidato.telefono && candidato.telefono.includes(lowerCaseQuery)) ||
      (candidato.dni && candidato.dni.includes(lowerCaseQuery))
    );
    setFilteredCandidatos(filtered);
  };

  const handleDateFilter = (date) => {
    setSelectedDate(date);
    const filtered = [...candidatos, ...candidatosNoAuth].filter(candidato => {
      const fecha = new Date(candidato.fecha_postulacion || candidato.fecha);
      return date ? fecha.toISOString().split('T')[0] === date : true;
    });
    setFilteredCandidatos(filtered);
  };

  const toggleCandidateSelection = (candidato) => {
    const newSelection = new Set(selectedCandidatos);
    newSelection.has(candidato.dni) ? newSelection.delete(candidato.dni) : newSelection.add(candidato.dni);
    setSelectedCandidatos(newSelection);
  };

  const moveSelectedCandidates = async () => {
    if (selectedCandidatos.size === 0) return; // No hay candidatos seleccionados

    const updatedCandidatos = [...candidatos];
    const updatedCandidatosNoAuth = [...candidatosNoAuth];

    await Promise.all([...selectedCandidatos].map(async dni => {
      const isNoAuthCandidate = candidatosNoAuth.some(c => c.dni === dni);
      const tableName = isNoAuthCandidate ? 'CandidatosNoAuth' : 'Postulacion';

      // Update the stage based on selected option
      await supabase.from(tableName).update({ estado_etapas: selectedStage }).eq('dni', dni);

      const targetArray = isNoAuthCandidate ? updatedCandidatosNoAuth : updatedCandidatos;
      const index = targetArray.findIndex(c => c.dni === dni);
      if (index !== -1) targetArray[index].estado_etapas = selectedStage;
    }));

    setCandidatos(updatedCandidatos);
    setCandidatosNoAuth(updatedCandidatosNoAuth);
    setSelectedCandidatos(new Set());
    setSelectedStage('');
  };

  return (
    <div className="w-full min-h-screen flex">
      <HeaderAdmin />
      <MenuAdmin />
      <div className="w-full h-full bg-[#fafbff] dark:bg-[#141a21] dark:text-white flex flex-col p-8 font-lato pl-72 pt-28">
        <div className='flex items-center gap-2'>
          <div className='w-96 max-h-20'>
            <Filter onFilter={handleFilter} />
          </div>
          <div className='w-96 max-h-20'>
            <SelectProceso idReclutador={idReclutador} onSelectProceso={setIdOferta} />
          </div>
          <div className='w-96 max-h-20'>
            <DateFilter onDateFilter={handleDateFilter} />
          </div>
          <div className="flex space-x-4">
            <CargarExcel idReclutador={idReclutador} idOferta={idOferta} setCandidatosNoAuth={setCandidatosNoAuth} />
            <DescargarPlantilla />
          </div>
        </div>

        <h2 className="text-2xl mt-7 mb-4 font-bold">
          Proceso - {puesto || 'Proceso Desconocido'} - {programaData[0]?.empresa || 'Empresa Desconocida'}
        </h2>

        <div className="flex gap-2 justify-between w-auto overflow-x-scroll">
          <div className="bg-cyan-50 rounded-lg border p-2 w-56 mt-5 ml-0">
            <h2 className="mb-4 font-medium text-gray-800 flex items-center justify-around">Candidatos <CrearCandidatoModal idOferta={idOferta} idReclutador={idReclutador} setCandidatosNoAuth={setCandidatosNoAuth} /></h2>
            {filteredCandidatos.length > 0 ? (
              filteredCandidatos.map((candidato, index) => {
                const isInStage = programaData[0]?.etapas.some(etapa => candidato.estado_etapas === etapa.etapa);
                return !isInStage ? (
                  <div
                    key={index}
                    onClick={() => toggleCandidateSelection(candidato)}
                    className={`cursor-pointer rounded ${selectedCandidatos.has(candidato.dni) ? 'bg-blue-100' : ''}`}>
                    <CandidateStageMover 
                      candidate={candidato}
                      programStages={programaData[0]?.etapas || []}
                      idOferta={idOferta}
                      setCandidatos={setCandidatos}
                      setFilteredCandidatos={setFilteredCandidatos}
                      setCandidatosNoAuth={setCandidatosNoAuth}
                    />
                  </div>
                ) : null;
              })
            ) : (
              <p className="text-center text-gray-600">No hay candidatos disponibles.</p>
            )}
            <div className="mt-4">
              <select 
                value={selectedStage} 
                onChange={(e) => setSelectedStage(e.target.value)} 
                className="border rounded p-2">
                <option value="">Seleccionar etapa</option>
                <option value="Ninguno">Ninguno</option> {/* Add this line */}
                {programaData[0]?.etapas?.map((etapa, idx) => (
                  <option key={idx} value={etapa.etapa}>{etapa.etapa}</option>
                ))}
              </select>
              <button 
                className="ml-4 bg-blue-500 text-white py-2 px-4 rounded" 
                onClick={moveSelectedCandidates}
                disabled={!selectedStage || selectedCandidatos.size === 0}
              >
                Mover Seleccionados
              </button>
            </div>
          </div>

          {programaData.length > 0 && (
            <div className="flex gap-4 justify-around">
              {programaData[0].etapas?.map((etapa, index) => (
                <div key={index} className="bg-gray-50 rounded-lg border border-primarycolor/30 p-2 w-56 mt-5 flex-grow">
                  <h2 className="mb-4 font-medium text-gray-800">{etapa.etapa}</h2>
                  <div className="space-y-2">
                    {filteredCandidatos.filter(candidato => candidato.estado_etapas === etapa.etapa).map((candidato, idx) => (
                      <div
                        key={idx}
                        onClick={() => toggleCandidateSelection(candidato)}
                        className={`cursor-pointer rounded ${selectedCandidatos.has(candidato.dni) ? 'bg-blue-100' : ''}`}>
                        <CandidateStageMover 
                          candidate={candidato}
                          programStages={programaData[0]?.etapas || []}
                          idOferta={idOferta}
                          setCandidatos={setCandidatos}
                          setFilteredCandidatos={setFilteredCandidatos}
                          setCandidatosNoAuth={setCandidatosNoAuth}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Entrevistas;