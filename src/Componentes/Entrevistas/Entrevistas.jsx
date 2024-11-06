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

function Entrevistas() {
  const { user } = UserAuth();
  const { id_oferta } = useParams();
  const [idReclutador, setIdReclutador] = useState(null);
  const [idOferta, setIdOferta] = useState(null);
  const [candidatos, setCandidatos] = useState([]);
  const [candidatosNoAuth, setCandidatosNoAuth] = useState([]);
  const [programaData, setProgramaData] = useState([]);
  const [puesto, setPuesto] = useState('');
  const [filteredCandidatos, setFilteredCandidatos] = useState([]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

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

      const idReclutador = profileData.id;
      setIdReclutador(idReclutador);

      const { data: ofertaData, error: ofertaError } = await supabase
        .from('Oferta')
        .select('id_oferta, puesto, empresa')
        .eq('id_oferta', id_oferta)
        .order('fecha_publicacion', { ascending: false })
        .limit(1)
        .single();

      if (ofertaError || !ofertaData) {
        console.error('Error al obtener datos de la oferta:', ofertaError);
        return;
      }

      setIdOferta(ofertaData.id_oferta);
      setPuesto(ofertaData.puesto);

      const { data: postulacionData, error: postulacionError } = await supabase
        .from('Postulacion')
        .select('name_user, telefono, dni, fecha_postulacion, estado_etapas')
        .eq('id_oferta', id_oferta)
        .eq('estado', 'apto');

      if (postulacionError) {
        console.error('Error al obtener postulaciones:', postulacionError);
        return;
      }

      setCandidatos(postulacionData);

      const { data: noAuthData, error: noAuthError } = await supabase
        .from('CandidatosNoAuth')
        .select('nombre, telefono, dni, fecha, estado_etapas')
        .eq('id_oferta', id_oferta)
        .eq('estado', 'apto');

      if (noAuthError) {
        console.error('Error al obtener CandidatosNoAuth:', noAuthError);
        return;
      }

      setCandidatosNoAuth(noAuthData);
    };

    fetchData();
  }, [user, id_oferta]);

  useEffect(() => {
    if (id_oferta) {
      fetchProgramaData().then(data => setProgramaData(data));
    }
  }, [id_oferta]);

  useEffect(() => {
    setFilteredCandidatos([...candidatos, ...candidatosNoAuth].sort((a, b) => {
      const dateA = new Date(a.fecha_postulacion || a.fecha);
      const dateB = new Date(b.fecha_postulacion || b.fecha);
      return dateB - dateA;
    }));
  }, [candidatos, candidatosNoAuth]);

  const fetchProgramaData = async () => {
    try {
      const { data: programaData, error } = await supabase
        .from('Programa')
        .select('id_programa, empresa, lugar, etapas')
        .eq('id_oferta', id_oferta);

      if (error) {
        console.error('Error al obtener datos del Programa:', error);
        return [];
      }

      return programaData;
    } catch (err) {
      console.error('Error en la solicitud:', err);
      return [];
    }
  };

  const handleFilter = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = [...candidatos, ...candidatosNoAuth].filter((candidato) => {
      return (
        (candidato.name_user && candidato.name_user.toLowerCase().includes(lowerCaseQuery)) ||
        (candidato.nombre && candidato.nombre.toLowerCase().includes(lowerCaseQuery)) ||
        (candidato.telefono && candidato.telefono.includes(lowerCaseQuery)) ||
        (candidato.dni && candidato.dni.includes(lowerCaseQuery))
      );
    });
    setFilteredCandidatos(filtered);
  };

  const moveCandidateToStage = async (candidate, etapa) => {
    // Si se selecciona "Ninguna"
    if (etapa === "Ninguna") {
      // Eliminar de CandidatosNoAuth
      const { error: noAuthError } = await supabase
        .from('CandidatosNoAuth')
        .delete()
        .eq('id_oferta', id_oferta)
        .eq('dni', candidate.dni);
  
      if (noAuthError) {
        console.error('Error al eliminar candidato de CandidatosNoAuth:', noAuthError);
      } else {
        // Actualizar estado local para CandidatosNoAuth
        setCandidatosNoAuth(prev => prev.filter(c => c.dni !== candidate.dni));
      }
  
      // Eliminar de Postulacion
      const { error: postulacionError } = await supabase
        .from('Postulacion')
        .delete()
        .eq('id_oferta', id_oferta)
        .eq('dni', candidate.dni);
  
      if (postulacionError) {
        console.error('Error al eliminar candidato de Postulacion:', postulacionError);
      } else {
        // Actualizar estado local para Candidatos
        setCandidatos(prev => prev.filter(c => c.dni !== candidate.dni));
      }
  
      // Actualizar los candidatos filtrados
      setFilteredCandidatos(prev => prev.filter(c => c.dni !== candidate.dni));
      return;
    }
  
    // Actualizar estado para CandidatosNoAuth
    const { error: updateNoAuthError } = await supabase
      .from('CandidatosNoAuth')
      .update({ estado_etapas: etapa })
      .eq('id_oferta', id_oferta)
      .eq('dni', candidate.dni);
    
    if (updateNoAuthError) {
      console.error('Error al mover candidato a CandidatosNoAuth:', updateNoAuthError);
    } else {
      setCandidatosNoAuth(prev => prev.map(c => {
        if (c.dni === candidate.dni) {
          return { ...c, estado_etapas: etapa };
        }
        return c;
      }));
      setFilteredCandidatos(prev => prev.map(c => {
        if (c.dni === candidate.dni) {
          return { ...c, estado_etapas: etapa };
        }
        return c;
      }));
    }
  
    // Actualizar estado para Postulacion
    const { error: updatePostulacionError } = await supabase
      .from('Postulacion')
      .update({ estado_etapas: etapa })
      .eq('id_oferta', id_oferta)
      .eq('dni', candidate.dni);
  
    if (updatePostulacionError) {
      console.error('Error al mover candidato a Postulacion:', updatePostulacionError);
    } else {
      setCandidatos(prev => prev.map(c => {
        if (c.dni === candidate.dni) {
          return { ...c, estado_etapas: etapa };
        }
        return c;
      }));
      setFilteredCandidatos(prev => prev.map(c => {
        if (c.dni === candidate.dni) {
          return { ...c, estado_etapas: etapa };
        }
        return c;
      }));
    }
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
        <Filter onFilter={handleFilter} />
        <h2 className="text-2xl mt-7 mb-4 font-bold">
          Proceso - {puesto || 'Proceso Desconocido'} - {programaData[0]?.empresa || 'Empresa Desconocida'}
        </h2>
        <CrearCandidatoModal idOferta={idOferta}
          idReclutador={idReclutador} setCandidatosNoAuth={setCandidatosNoAuth} />
        <div className="flex space-x-4">
          <div className="bg-white rounded-lg border p-8 mt-5 max-w-sm ml-0">
            <h2 className="mb-4 font-medium text-gray-600">Candidatos</h2>
            {filteredCandidatos.length > 0 ? (
              filteredCandidatos.map((candidato, index) => (
                <div key={index} className="bg-white rounded-lg border p-6 mb-2">
                  <h3 className="text-lg font-medium">{candidato.name_user || candidato.nombre}</h3>
                  <p className="text-sm text-gray-500">DNI: {candidato.dni}</p>
                  <p className="text-sm text-gray-500 mt-1">Celular: {candidato.telefono}</p>
                  <p className="text-sm text-gray-500">Fecha: {formatDate(candidato.fecha_postulacion || candidato.fecha)}</p>
                  
                  <select
                    className="mt-2 bg-blue-500 text-white rounded px-2 py-1"
                    onChange={(e) => moveCandidateToStage(candidato, e.target.value)}
                  >
                    <option value="">Selecciona una etapa</option>
                    <option value="">Ninguna</option>
                    {programaData[0]?.etapas?.map((etapa, idx) => (
                      <option key={idx} value={etapa.etapa}>{etapa.etapa}</option>
                    ))}
                  </select>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No hay candidatos disponibles.</p>
            )}
          </div>

          {programaData.length > 0 && (
            <div className="flex space-x-4 flex-grow">
              {programaData[0].etapas?.map((etapa, index) => (
                <div key={index} className="bg-gray-200 rounded-lg shadow-md p-8 mt-5 flex-grow">
                  <h2 className="mb-4 font-medium text-gray-600">{etapa.etapa}</h2>
                  <div className="space-y-4">
                    {/* Filtrar candidatos que pertenecen a la etapa actual */}
                    {filteredCandidatos.filter(candidato => candidato.estado_etapas === etapa.etapa).map((candidato, idx) => (
                      <div key={idx} className="bg-white rounded-lg border p-4 mb-2">
                        <h3 className="text-lg font-medium">{candidato.name_user || candidato.nombre}</h3>
                        <p className="text-sm text-gray-500">DNI: {candidato.dni}</p>
                        <p className="text-sm text-gray-500 mt-1">Celular: {candidato.telefono}</p>
                        <p className="text-sm text-gray-500">Fecha: {formatDate(candidato.fecha_postulacion || candidato.fecha)}</p>
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