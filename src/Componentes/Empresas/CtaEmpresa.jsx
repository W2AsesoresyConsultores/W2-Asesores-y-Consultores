import React, {useState} from 'react';
import {useTypewriter, Cursor} from 'react-simple-typewriter'
import Contacto from '../Contacto/Contacto'

function CtaEmpresa() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para abrir el modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [text] = useTypewriter({
    words: ['necesita.', 'busca.', 'requiere.'],
    loop: {},
    typeSpeed: 120,
});

  return (
    <div className="bg-primarycolor text-white font-dmsans pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full flex  flex-col items-center text-center lg:w-1/2">
            <h1 className="text-4xl font-bold leading-tight mb-16">Encontramos el talento que tu empresa <span className='text-[#6cffce]'>{text}</span><Cursor /> </h1>
            <button onClick={openModal}  className="bg-white text-gray-900 py-3 px-6 font-semibold rounded-lg shadow-lg hover:shadow-xl transition duration-200 inline-block mb-4"> 
              Empieza a transformar tu reclutamiento  
            </button>
            {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg md:w-max-[500px] flex items-start justify-end">
                <Contacto closeModal={closeModal} />{" "}
              </div>
            </div>
          )}
          </div>
          <div className="lg:w-1/3 order-first h-full flex items-end">
            <img
              src= "https://elcuvegbwtlngranjtym.supabase.co/storage/v1/object/public/AssetsW2/Empresas/asesora.png"
              alt="Asesora"
              className="transition duration-200 w-64"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CtaEmpresa;