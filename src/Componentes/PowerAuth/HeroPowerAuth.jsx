import React from "react";
import Buscador from "../Power/Buscador";
import { useContext } from "react";
import JobsContext from "../../Context/JobsContext";

function HeroPowerAuth() {
  const { jobs } = useContext(JobsContext);

  return (
    <section className="w-full md:h-[400px] h-[450px] bg-primarygradient font-dmsans flex items-center justify-center md:pl-20 rounded-full-b-3xl">
      <div className="md:w-1/2 w-full md:p-8 p-4">
        <h1 className="text-3xl md:text-4xl text-center text-white font-regular mt-12 md:mt-0 max-w-[500px] mx-auto">
          Vive la experiencia{" "}
          <span className="text-[#FFE946] font-bold">Power</span>{" "}
          <span className="font-bold">y postula con nosotros.</span>
        </h1>
        <Buscador />
      </div>
      <div className="w-1/2 hidden lg:flex flex-col p-8">
        <div className="grid grid-cols-3 xl:grid-cols-3 gap-8 xl:gap-20 mb-6">
          <div className="bg-white h-24 w-24 rounded-full overflow-hidden hover:scale-125 transition-all duration-300">
            <img src="https://img.freepik.com/fotos-premium/sonrisa-trabajador-contenedores-feliz-su-trabajo-muelle-transporte-carga-distribucion-carga-capataz-personas-africanas_255544-2680.jpg" alt="Inspectora de contenedores" className="h-full w-full object-cover" />
          </div>
          <div className="bg-white h-32 w-32 rounded-full overflow-hidden hover:scale-125 transition-all duration-300">
            <img src="https://images.pexels.com/photos/6170398/pexels-photo-6170398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Auxiliar de reparto" className="h-full w-full object-cover" />
          </div>
          <div className="bg-white h-28 w-28 rounded-full overflow-hidden hover:scale-125 transition-all duration-300">
            <img src="https://controlcombustible.pe/wp-content/uploads/2023/01/Cual-es-el-sueldo-de-un-conductor-de-transporte-pesado-1024x594.png" alt="Conductor de trailer" className="h-full w-full object-cover" />
          </div>
        </div>
        <div className="grid grid-cols-3 xl:grid-cols-3 gap-8 xl:gap-20">
          <div className="bg-white h-32 w-32 rounded-full overflow-hidden hover:scale-125 transition-all duration-300">
            <img src="https://www.shutterstock.com/image-photo/young-successful-sales-assistant-uniform-600nw-2110605533.jpg" alt="Asesor de ventas" className="h-full w-full object-cover" />
          </div>
          <div className="bg-white h-28 w-28 rounded-full overflow-hidden hover:scale-125 transition-all duration-300">
            <img src="https://unicarriers.pe/wp-content/uploads/2018/05/5-consejos-para-trabajar-con-carga-elevada.jpg" alt="Operario de equipo" className="h-full w-full object-cover" />
          </div>
          <div className="bg-white h-28 w-28 rounded-full overflow-hidden hover:scale-125 transition-all duration-300">
            <img src="https://fundametal.edu.ve/webfundametal/wp-content/uploads/2021/12/curso-operario-almacen.jpg" alt="Operario de almacén" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroPowerAuth;
