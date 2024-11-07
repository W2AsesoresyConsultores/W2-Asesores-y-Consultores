import React, { useEffect, useState, useContext, useRef } from "react";
import { supabase } from "../../supabase/supabase.config";
import { Link } from "react-router-dom";
import { SiStagetimer } from "react-icons/si";
import { LinearProgress } from "@mui/material";
import { UserAuth } from "../../Context/AuthContext";
import JobsContext from "../../Context/JobsContext";

const formatDate = (isoString) => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const JobProceso = () => {
  const { user } = UserAuth();
  const { searchTerm } = useContext(JobsContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [programas, setProgramas] = useState([]); // Nuevo estado para almacenar programas
  const hasFetchedJobs = useRef(false);

  useEffect(() => {
    const fetchJobs = async () => {
      if (!user || hasFetchedJobs.current) return;

      setLoading(true);
      hasFetchedJobs.current = true;

      try {
        // Obtener el perfil del reclutador
        const { data: profileData, error: profileError } = await supabase
          .from("perfiles")
          .select("id")
          .eq("id", user.id)
          .single();

        if (profileError) throw profileError;

        const idReclutador = profileData.id;

        // Obtener datos de programas completos
        const { data: programaData, error: programaError } = await supabase
          .from("Programa")
          .select("*")
          .eq("id_reclutador", idReclutador);

        if (programaError) throw programaError;

        setProgramas(programaData); // Guardar los programas en el estado
        const ofertaIds = programaData.map((programa) => programa.id_oferta);

        // Obtener datos de trabajos activos
        const { data: jobsData, error: jobsError } = await supabase
          .from("Oferta")
          .select("*")
          .in("id_oferta", ofertaIds)
          .eq("estado", "activa");

        if (jobsError) throw jobsError;

        const sortedJobs = jobsData.sort(
          (a, b) =>
            new Date(b.fecha_publicacion) - new Date(a.fecha_publicacion)
        );
        setJobs(sortedJobs);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [user]);

  const filteredJobs = jobs.filter((job) =>
    job.puesto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full bg-transparent rounded-lg font-lato">
      {loading ? (
        <div className="flex pt-40 justify-center h-screen">
          <div className="w-3/4 md:w-1/2">
            <LinearProgress
              sx={{
                width: "80%",
                backgroundColor: "#e2e8f0",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#2563eb",
                },
              }}
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => {
              const programa = programas.find(
                (prog) => prog.id_oferta === job.id_oferta
              );

              return (
                <div
                  key={job.id_oferta}
                  className="bg-white dark:bg-[#1c252e] rounded-xl border dark:border-none border-gray-300 shadow-sm p-6 flex items-center justify-between"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center justify-start w-full gap-4">
                      <div className="w-14 h-14 rounded-lg flex items-center justify-center">
                        <img
                          src={job.empresa_img_url}
                          alt="profile"
                          className="w-12 h-12 rounded-lg"
                        />
                      </div>
                      <div className="mb-2">
                        <Link to={`/Entrevistas/${job.id_oferta}`}>
                          <h3 className="text-lg font-medium dark:text-white">{job.puesto}</h3>
                        </Link>
                        <p className="text-sm text-gray-500">
                          Creado: {formatDate(job.fecha_publicacion)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-primarycolor font-medium text-sm mb-2 flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                      <SiStagetimer />
                      <p>{programa?.etapas.length} Etapas</p>
                    </div>
                    <ul>
                      {programa?.etapas?.map((etapaObj, index) => (
                        <li className="text-xs text-gray-500" key={index}>- {etapaObj.etapa}</li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    to={`/Entrevistas/${job.id_oferta}`}
                    className="inline-block bg-primarycolor text-white font-medium py-2 px-4 rounded-lg text-center hover:bg-newprimarycolor transition"
                  >
                    Ver proceso
                  </Link>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-600">No jobs found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default JobProceso;
