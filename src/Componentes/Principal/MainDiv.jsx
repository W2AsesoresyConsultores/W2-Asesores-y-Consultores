import React from 'react'
import Fondo from '../../assets/FondoBanner.png'
import Fondo2 from '../../assets/FondoBanner2.png'
import Header from './Header'
import Hero from './Hero'
import { motion } from "framer-motion"



function MainDiv() {
  return (
    <div style={{ minHeight: '740px', backgroundImage:`url(${Fondo2})`}}
    className='flex items-center justify-center bg-no-repeat text-center flex-col font-dmsans pl-4 pr-4 bg-cover pt-24'>
      <Header />
      <h2 
  style={{ animation: 'fade-in 1s ease-in' }}
  className='text-5xl md:text-6xl font-semibold text-primarycolor text-center'>Potenciamos talentos </h2>
<h1 
  style={{ animation: 'fade-in 1.5s ease-in' }}
  className='text-5xl md:text-6xl font-bold text-primarytext mb-8 text-center'>Impulsamos resultados</h1>

      <p
      style={{ animation: 'fade-in 2s ease-in', maxWidth: '600px' }}
      className='font-regular text-gray-700 mb-8'
      >Potenciamos tu éxito empresarial con soluciones de gestión humana y tecnología de vanguardia, incluso sin un departamento de recursos humanos.</p>
      <div className='flex flex-wrap justify-center'>
        <motion.button 
         whileHover={{ scale: 1.1 }}
         onHoverStart={e => {}}
         onHoverEnd={e => {}}
        style={{ animation: 'fade-in 1.5s ease-in' }}
        className='w-40 h-12 bg-primarycolor rounded-xl text-white font-semibold hover:bg-white hover:border-2 hover:border-primarycolor hover:text-primarycolor transition-colors duration-500 mb-4 mr-2 ml-2'>
          Conseguir talento
        </motion.button>
        <motion.button 
        whileHover={{ scale: 1.1 }}
        onHoverStart={e => {}}
        onHoverEnd={e => {}}
        style={{ animation: 'fade-in 2s ease-in' }}
        className='w-40 h-12  text-primarytext font-semibold rounded-xl  hover:bg-gray-100  transition-colors duration-500 mr-2 ml-2 mb-8'>Empezar</motion.button>
      </div>
      <Hero />
    </div>
  )
}

export default MainDiv