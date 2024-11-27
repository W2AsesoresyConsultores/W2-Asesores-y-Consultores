import React from "react";
import Descubre from "./Descubre";
function HeroPracticantes() {
  return (
    <section className="pt-28 flex flex-wrap font-dmsans md:px-12">
      <div className="flex flex-wrap justify-center">
        <img className="hidden md:flex w-20 h-48 mt-[3%]" 
        src="https://elcuvegbwtlngranjtym.supabase.co/storage/v1/object/public/AssetsW2/DescubriendoTalentos/Icono%20Talentos.png" 
        alt="" />
      <div className="w-full md:w-1/3 flex flex-col justify-center md:items-start items-center gap-6 px-4 text-center md:text-left">
        
        <h1 className="text-5xl md:text-6xl font-bold text-primarytext ">Descubriendo <span className="text-primarycolor">Talentos</span></h1>
        <p className="text-gray-700 text-lg">Un programa para estudiantes de últimos ciclos que desean formarse y unirse a W2. Ofrecemos oportunidades prácticas que complementan su formación académica, preparándolos para los desafíos laborales. No requerimos experiencia, sino TALENTO y PASIÓN.</p>
        <a href="#areas" className="bg-primarycolor p-2 text-white font-semibold rounded-lg w-80 h-14 text-lg flex items-center justify-center hover:text-primarycolor hover:border-2 hover:border-primarycolor hover:bg-white">
          Descubre nuestro ecosistema
          </a>
      </div>
      <div style={{ backgroundImage: `url(${"https://elcuvegbwtlngranjtym.supabase.co/storage/v1/object/public/AssetsW2/DescubriendoTalentos/BG%2031.png"})` }}
      className="w-1/2 md:w-1/3 flex justify-center bg-contain mt-12 md:mt-0 items-center mx-auto">
        <img className="" src={"https://elcuvegbwtlngranjtym.supabase.co/storage/v1/object/public/AssetsW2/DescubriendoTalentos/3d-practicantes.png"} 
        alt="" />
      </div>
      </div>
      
      
      
    </section>
  );
}

export default HeroPracticantes;
