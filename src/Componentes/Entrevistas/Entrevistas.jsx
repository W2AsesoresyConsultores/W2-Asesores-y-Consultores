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

  const toggleCandidateSelection = (candidato) => {
    const newSelection = new Set(selectedCandidatos);
    newSelection.has(candidato.dni) ? newSelection.delete(candidato.dni) : newSelection.add(candidato.dni);
    setSelectedCandidatos(newSelection);
  };

  const moveSelectedCandidates = async () => {
    const updatedCandidatos = [...candidatos];
    const updatedCandidatosNoAuth = [...candidatosNoAuth];

    await Promise.all([...selectedCandidatos].map(async dni => {
      const isNoAuthCandidate = candidatosNoAuth.some(c => c.dni === dni);
      const tableName = isNoAuthCandidate ? 'CandidatosNoAuth' : 'Postulacion';

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
    <div className="w-full h-screen flex">
      <HeaderAdmin />
      <MenuAdmin />
      <div className="w-full h-full bg-[#fafbff] flex flex-col p-8 font-dmsans overflow-x-auto pl-72 pt-28">
        <div className="flex space-x-4">
          <CargarExcel idReclutador={idReclutador} idOferta={idOferta} setCandidatosNoAuth={setCandidatosNoAuth} />
          <DescargarPlantilla />
        </div>
        <SelectProceso idReclutador={idReclutador} onSelectProceso={setIdOferta} />
        <Filter onFilter={handleFilter} />
        <h2 className="text-2xl mt-7 mb-4 font-bold">
          Proceso - {puesto || 'Proceso Desconocido'} - {programaData[0]?.empresa || 'Empresa Desconocida'}
        </h2>
        <CrearCandidatoModal idOferta={idOferta} idReclutador={idReclutador} setCandidatosNoAuth={setCandidatosNoAuth} />

        <div className="flex space-x-4">
          <div className="bg-white rounded-lg border p-8 mt-5 max-w-sm ml-0">
            <h2 className="mb-4 font-medium text-gray-600">Candidatos</h2>
            {filteredCandidatos.length > 0 ? (
              filteredCandidatos.map((candidato, index) => {
                const isInStage = programaData[0]?.etapas.some(etapa => candidato.estado_etapas === etapa.etapa);
                return !isInStage ? (
                  <div
                    key={index}
                    onClick={() => toggleCandidateSelection(candidato)}
                    className={`cursor-pointer p-2 rounded ${selectedCandidatos.has(candidato.dni) ? 'bg-blue-100' : ''}`}>
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
            <div className="flex space-x-4 flex-grow">
              {programaData[0].etapas?.map((etapa, index) => (
                <div key={index} className="bg-gray-200 rounded-lg shadow-md p-8 mt-5 flex-grow">
                  <h2 className="mb-4 font-medium text-gray-600">{etapa.etapa}</h2>
                  <div className="space-y-4">
                    {filteredCandidatos.filter(candidato => candidato.estado_etapas === etapa.etapa).map((candidato, idx) => (
                      <CandidateStageMover 
                        key={idx}
                        candidate={candidato}
                        programStages={programaData[0]?.etapas || []}
                        idOferta={idOferta}
                        setCandidatos={setCandidatos}
                        setFilteredCandidatos={setFilteredCandidatos}
                        setCandidatosNoAuth={setCandidatosNoAuth}
                      />
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