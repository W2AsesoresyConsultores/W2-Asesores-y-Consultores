import React, { useState, useEffect } from "react";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { BsArrowRightCircle } from "react-icons/bs";
import { supabase } from "../../supabase/supabase.config";

function CardTrabajo2({ job, onSelectJob, isSelected }) {
  const { puesto, modalidad, ubicacion, empresa, descripcion, id_reclutador } = job;

  const [nombreReclutador, setNombreReclutador] = useState("");

  // Función para obtener el nombre del reclutador desde la tabla perfiles
  const fetchNombreReclutador = async () => {
    const { data, error } = await supabase
      .from('perfiles')
      .select('nombre')
      .eq('id', id_reclutador)
      .single(); // Solo esperamos un resultado

    if (error) {
      console.error("Error fetching recruiter name:", error);
    } else {
      setNombreReclutador(data?.nombre || "Reclutador no encontrado");
    }
  };

  useEffect(() => {
    if (id_reclutador) {
      fetchNombreReclutador();
    }
  }, [id_reclutador]);

  return (
    <div className="w-full flex justify-center font-dmsans">
      <button
        onClick={() => onSelectJob(job)}
        className={`w-full md:w-[90%] text-left border hover:shadow-sm hover:transition-all hover:duration-200 rounded-lg p-6 overflow-hidden flex justify-between items-center ${
          isSelected ? "bg-gray-200" : "bg-white"
        }`}
      >
        <div className="flex flex-col space-y-2 w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              <div className="bg-primarycolor p-2 rounded-lg">
                <MdOutlineVerifiedUser className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800">{empresa}</h3>
                <p className="text-xs text-gray-500">{nombreReclutador}</p> {/* Aquí se muestra el nombre del reclutador */}
              </div>
            </div>
          </div>
          <h4 className="font-bold text-lg leading-tight text-gray-800">{puesto}</h4>
          <p className="text-sm text-gray-600">
            {descripcion} <span className="text-blue-500">Ver más</span>
          </p>
          <div className="flex space-x-2">
            {modalidad && (
              <span className="bg-gray-200 text-gray-800 py-1 px-3 text-xs rounded-full font-regular tracking-wide">
                {modalidad}
              </span>
            )}
            <span className="bg-gray-200 text-gray-800 py-1 px-3 text-xs rounded-full font-regular tracking-wide">
              {ubicacion}
            </span>
          </div>
        </div>
        <BsArrowRightCircle
          className={`text-3xl self-end ${isSelected ? "text-blue-500" : "text-gray-500"}`}
        />
      </button>
    </div>
  );
}

export default CardTrabajo2;
