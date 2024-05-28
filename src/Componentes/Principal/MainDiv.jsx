import React from 'react';
import { Link } from 'react-router-dom';
import fondo from '../../assets/gradiantFondo.png';
import Hero from './Hero';
import arrow from '../../assets/flechanegra.png';

function MainDiv() {
  return (
    <section style={{ backgroundImage: 'none' }}
      className="md:h-auto h-auto pt-20 sm:pt-20 font-dmsans flex flex-col items-center bg-no-repeat bg-cover animate-fade-up">
      <div className="area h-full">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8" />
      <div className="text-center px-4">
        <h1
          className="max-w-4xl mx-auto mb-4 text-4xl font-bold leading-tight text-primarytext sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight animate-fade-up">
          <span className='text-primarycolor'>Potenciamos talentos,</span> impulsamos resultados
        </h1>
        <p className="max-w-2xl mx-auto px-6 text-lg text-primarytext font-inter animate-fade-up">
          Potenciamos tu éxito empresarial con soluciones de gestión humana y tecnología de vanguardia, incluso sin un departamento de recursos humanos.
        </p>
        <div className="px-8 sm:items-start justify-center sm:px-0 sm:space-x-5 sm:flex mt-9 flex flex-col sm:flex-row items-center gap-4">

          <Link to="/Empresas" title=""
            className="bg-primarycolor p-2 text-white font-semibold rounded-lg w-48 h-14 text-lg flex items-center justify-center hover:text-primarycolor hover:border-2 hover:border-primarycolor hover:bg-white" role="button">
            Soy Empresa
            <span className='flex items-center justify-center bg-no-repeat ml-3'
              style={{ backgroundImage: `url(${arrow})`, width: '30px', height: '20px', backgroundSize: 'contain' }}></span>
          </Link>

          <Link to="/Power"
            className="bg-white border border-primarycolor p-2 text-primarycolor font-semibold rounded-lg w-48 h-14 text-lg flex items-center justify-center hover:text-white hover:border-2 hover:border-primarycolor hover:bg-primarycolor" role="button">Soy Talento
            <span className='flex items-center justify-center bg-no-repeat ml-5'
              style={{ backgroundImage: `url(${arrow})`, width: '30px', height: '20px', backgroundSize: 'contain' }}></span>
          </Link>

        </div>
      </div>
      <Hero />
    </section>
  );
}

export default MainDiv;