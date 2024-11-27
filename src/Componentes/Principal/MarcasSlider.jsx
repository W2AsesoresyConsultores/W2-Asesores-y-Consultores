import React from 'react';

// Define la URL base de las imágenes en Supabase
const IMAGE_BASE_URL = 'https://elcuvegbwtlngranjtym.supabase.co/storage/v1/object/public/AssetsW2/Logos%20Clientes/';

// Define las rutas relativas de las imágenes
const slides = [
    'Alma@2x.png',
    'Altisa@2x.png',
    'Depsa@2x.png',
    'Solaris@2x.png',
    'Econolentes@2x.avif',
    'Germsa@2x.png',
    'RANSA@2x.png',
    'SLA@2x.png',
    'LOGO%20FRIORED.jpg',
    'bethel.png',
    'dicar.png',
    'nortex.png',
    'sodimac.png',
    'topsa.jpg',
    'unacem.jpg',
    'visioncenter.jpg',
    '8sabores.png',
    'friendly.png'
];

const MarcasSlider = () => {
    // Duplicar el array de slides para garantizar un bucle sin costuras
    const duplicatedSlides = [...slides, ...slides];

    return (
        <div className="slider">
            <div className="move bg-white flex items-center justify-center gap-2">
                {/* Mapear cada elemento del array y renderizar la imagen dentro de un div */}
                {duplicatedSlides.map((slide, index) => (
                    <div className="box flex items-center justify-center p-0 rounded-lg" key={index}>
                        <img className="img-marca hover:scale-125 transition-all duration-400" src={`${IMAGE_BASE_URL}${slide}`} alt={`Marca ${index}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MarcasSlider;