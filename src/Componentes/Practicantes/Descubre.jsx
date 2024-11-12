import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Mousewheel, Pagination } from 'swiper/modules';

const SliderComponent = () => {



    return (
      <div id="descubre" className="w-full mx-auto relative mt-12 md:mt-24 font-dmsans">
      <div class="inline-flex items-end justify-center w-full text-center mx-auto mb-12">
        <img src="https://cdn.devdojo.com/tails/avatars/024.jpg" class="absolute transform translate-x-24 ml-6 rounded-full w-12 h-12 md:w-16 md:h-16 border-4 border-white"/>
        <img src="https://cdn.devdojo.com/tails/avatars/012.jpg" class="absolute transform -translate-x-24 -ml-6 rounded-full w-12 h-12 md:w-16 md:h-16 border-4 border-white"/>
        <img src="https://cdn.devdojo.com/tails/avatars/029.jpg" class="absolute transform -translate-x-16 rounded-full w-16 h-16 md:w-20 md:h-20 border-4 border-white"/>
        <img src="https://cdn.devdojo.com/tails/avatars/005.jpg" class="absolute transform translate-x-16 rounded-full w-16 h-16 md:w-20 md:h-20 border-4 border-white"/>
        <img src="https://cdn.devdojo.com/tails/avatars/032.jpg" class="rounded-full w-20 h-20 md:w-24 md:h-24 border-4 border-white relative"/>
      </div>
      <h2 class="text-3xl font-extrabold text-black dark:text-white sm:text-5xl text-center pb-12">
        <img src="https://elcuvegbwtlngranjtym.supabase.co/storage/v1/object/public/AssetsW2/Inicio/flecha.png"
        alt="flecha" className="inline-block w-16 h-12 mr-2"/>Descubre lo que nos hace
          <span class=" text-primarycolor"> DIFERENTES</span>
        </h2>
        <Swiper
          direction={'horizontal'}
          slidesPerView={1}
          spaceBetween={30}
          mousewheel={true}
          pagination={{
            clickable: true,
          }}
          modules={[Mousewheel, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide className='px-8'>
          <section className="text-white body-font bg-none dark:bg-slate-900 shadow-xl">
            <div className="container mx-auto flex md:px-24 md:py-10 md:flex-row flex-col items-center justify-center">
              <div className="lg:flex-grow mt-5 md:mt-0 md:w-1.5/2 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center justify-center">
                <h1 className="text-2xl font-extrabold leading-9 tracking-tight mb-3 text-black sm:text-4xl sm:leading-10 md:text-5xl md:leading-normal">
                  Flexibilidad en el trabajo
                </h1>
                <p className="mb-8 md:pl-0 pl-2 pr-2 leading-relaxed text-gray-700">
                  El equilibrio personal y laboral es nuestra prioridad,
                  asegurando una calidad de vida de nuestro equipo.
                </p>
                <ul className="mt-8 space-y-3 font-medium text-gray-700">
                  <li className="flex items-start lg:col-span-1">
                    <div className="flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-indigo-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <p className="ml-3 leading-5 ">
                      Trabajo Híbrido, 90% remoto 10% presencial
                    </p>
                  </li>
                  <li className="flex items-start lg:col-span-1">
                    <div className="flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-indigo-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <p className="ml-3 leading-5">Jueves de PLATO.</p>
                  </li>
                  <li className="flex items-start lg:col-span-1">
                    <div className="flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-indigo-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <p className="ml-3 leading-5">
                      “W2 Days”: Días de disfrute en Familia.
                    </p>
                  </li>
                </ul>
              </div>
              <div className="lg:max-w-lg lg:w-full mb-5 md:mb-0 md:w-1/2 w-3/6">
                <div className="mx-auto max-w-sm flex flex-col items-center justify-center text-center">
                  <img
                    className="rounded-full w-64"
                    src="https://elcuvegbwtlngranjtym.supabase.co/storage/v1/object/public/AssetsW2/DescubriendoTalentos/Flexibilidad%20(1).gif" // Asegúrate de que esta ruta sea correcta
                    alt=""
                  />
                  <div className="mb-4 text-gray-700">
                    <svg
                      height="35px"
                      className="mb-2"
                      fill="#5a67d8"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 32 32"
                      xmlSpace="preserve"
                    >
                      <g>
                        <g id="right_x5F_quote">
                          <g>
                            <path d="M0,4v12h8c0,4.41-3.586,8-8,8v4c6.617,0,12-5.383,12-12V4H0z"></path>
                            <path d="M20,4v12h8c0,4.41-3.586,8-8,8v4c6.617,0,12-5.383,12-12V4H20z"></path>
                          </g>
                        </g>
                      </g>
                    </svg>
                    <p className="mt-2 text-base leading-6">
                      “El trabajo flexible me ha permitido equilibrar mi vida
                      personal y profesional, trabajar de manera más eficiente y
                      sentirme en control de mi tiempo y éxito laboral.”
                    </p>
                    <div className="text-sm mt-5">
                      <p className="font-medium leading-none text-indigo-600 hover:text-black transition duration-500 ease-in-out">
                        Alexander de W2
                      </p>
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          </SwiperSlide>
          <SwiperSlide>
          <section className="text-white body-font bg-none dark:bg-slate-900 shadow-xl">
            <div className="container mx-auto flex md:px-24 md:py-10 md:flex-row flex-col items-center justify-center">
              <div className="lg:flex-grow mt-5 md:mt-0 md:w-1.5/2 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center justify-center">
                <h1 className="text-2xl font-extrabold leading-9 tracking-tight mb-3 text-black sm:text-4xl sm:leading-10 md:text-5xl md:leading-normal">
                  Aprendizaje continuo
                </h1>
                <p className="mb-8 md:pl-0 pl-2 pr-2 leading-relaxed text-gray-700">
                  Nos involucramos en tu desarrollo profesional y personal, con
                  diversas formas de capacitacitaciones a lo largo de tu
                  estancia con nosotros
                </p>
                <ul className="mt-8 space-y-3 font-medium text-gray-700">
                  <li className="flex items-start lg:col-span-1">
                    <div className="flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-indigo-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <p className="ml-3 leading-5 ">
                      Assessment Center con evaluación y capacitación.
                    </p>
                  </li>
                  <li className="flex items-start lg:col-span-1">
                    <div className="flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-indigo-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <p className="ml-3 leading-5">Experiencia a todo nivel.</p>
                  </li>
                  <li className="flex items-start lg:col-span-1">
                    <div className="flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-indigo-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <p className="ml-3 leading-5">
                      Capacitaciones de desarrollo personal.
                    </p>
                  </li>
                </ul>
              </div>
              <div className="lg:max-w-lg lg:w-full mb-5 md:mb-0 md:w-1/2 w-3/6">
                <div className="mx-auto max-w-sm flex flex-col items-center justify-center text-center">
                  <img
                    className="rounded-full w-64"
                    src="https://elcuvegbwtlngranjtym.supabase.co/storage/v1/object/public/AssetsW2/DescubriendoTalentos/Aprendizaje%20Continuo.gif" // Asegúrate de que esta ruta sea correcta
                    alt=""
                  />
                  <div className="mb-4 text-gray-700">
                    <svg
                      height="35px"
                      className="mb-2"
                      fill="#5a67d8"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 32 32"
                      xmlSpace="preserve"
                    >
                      <g>
                        <g id="right_x5F_quote">
                          <g>
                            <path d="M0,4v12h8c0,4.41-3.586,8-8,8v4c6.617,0,12-5.383,12-12V4H0z"></path>
                            <path d="M20,4v12h8c0,4.41-3.586,8-8,8v4c6.617,0,12-5.383,12-12V4H20z"></path>
                          </g>
                        </g>
                      </g>
                    </svg>
                    <p className="mt-2 text-base leading-6">
                    “La evaluación de ingreso es innovadora porque comenzamos con capacitación y fundamentos, sin requerir experiencia previa, y el aprendizaje continuo depende de nosotros.”
                    </p>
                    <div className="text-sm mt-5">
                      <p className="font-medium leading-none text-indigo-600 hover:text-black transition duration-500 ease-in-out">
                        Kirsten de W2
                      </p>
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          </SwiperSlide>
          <SwiperSlide>
          <section className="text-white body-font bg-none dark:bg-slate-900 shadow-xl">
            <div className="container mx-auto flex md:px-24 md:py-10 md:flex-row flex-col items-center justify-center">
              <div className="lg:flex-grow mt-5 md:mt-0 md:w-1.5/2 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center justify-center">
                <h1 className="text-2xl font-extrabold leading-9 tracking-tight mb-3 text-black sm:text-4xl sm:leading-10 md:text-5xl md:leading-normal">
                  Cultura inclusiva
                </h1>
                <p className="mb-8 md:pl-0 pl-2 pr-2 leading-relaxed text-gray-700">
                  Porque las personas nos importan y nuestra cultura tiene un
                  sello distintivo que fomenta la diversidad en todos sus
                  ámbitos.
                </p>
                <ul className="mt-8 space-y-3 font-medium text-gray-700">
                  <li className="flex items-start lg:col-span-1">
                    <div className="flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-indigo-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <p className="ml-3 leading-5 ">
                      Trabaja desde donde desees.
                    </p>
                  </li>
                  <li className="flex items-start lg:col-span-1">
                    <div className="flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-indigo-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <p className="ml-3 leading-5">
                      Politicas de diversidad e inclusión.
                    </p>
                  </li>
                  <li className="flex items-start lg:col-span-1">
                    <div className="flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-indigo-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <p className="ml-3 leading-5">
                      Propiciamos espacios de comunicación e interacción
                    </p>
                  </li>
                </ul>
              </div>
              <div className="lg:max-w-lg lg:w-full mb-5 md:mb-0 md:w-1/2 w-3/6">
                <div className="mx-auto max-w-sm flex flex-col items-center justify-center text-center">
                  <img
                    className="rounded-full w-64"
                    src="https://elcuvegbwtlngranjtym.supabase.co/storage/v1/object/public/AssetsW2/DescubriendoTalentos/Cultura%20(1).gif" // Asegúrate de que esta ruta sea correcta
                    alt=""
                  />
                  <div className="mb-4 text-gray-700">
                    <svg
                      height="35px"
                      className="mb-2"
                      fill="#5a67d8"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 32 32"
                      xmlSpace="preserve"
                    >
                      <g>
                        <g id="right_x5F_quote">
                          <g>
                            <path d="M0,4v12h8c0,4.41-3.586,8-8,8v4c6.617,0,12-5.383,12-12V4H0z"></path>
                            <path d="M20,4v12h8c0,4.41-3.586,8-8,8v4c6.617,0,12-5.383,12-12V4H20z"></path>
                          </g>
                        </g>
                      </g>
                    </svg>
                    <p className="mt-2 text-base leading-6">
                      “La cultura inclusiva me valora por quién soy y lo que hago, haciéndome sentir integrado sin importar mi ubicación. Esto nos permite aportar nuestras mejores ideas, independientemente de nuestras creencias o antecedentes.”
                    </p>
                    <div className="text-sm mt-5">
                      <p className="font-medium leading-none text-indigo-600 hover:text-black transition duration-500 ease-in-out">
                        Piero de W2
                      </p>
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          </SwiperSlide>
          <SwiperSlide>
          <section className="text-white body-font bg-none dark:bg-slate-900 shadow-xl">
            <div className="container mx-auto flex md:px-24 md:py-10 md:flex-row flex-col items-center justify-center">
              <div className="lg:flex-grow mt-5 md:mt-0 md:w-1.5/2 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center justify-center">
                <h1 className="text-2xl font-extrabold leading-9 tracking-tight mb-3 text-black sm:text-4xl sm:leading-10 md:text-5xl md:leading-normal">
                  Desarrollo profesional
                </h1>
                <p className="mb-8 md:pl-0 pl-2 pr-2 leading-relaxed text-gray-700">
                  Tenemos la determinación que cada talento es capaz de lograr
                  lo que se proponga en el tiempo ideal.
                </p>
                <ul className="mt-8 space-y-3 font-medium text-gray-700">
                  <li className="flex items-start lg:col-span-1">
                    <div className="flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-indigo-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <p className="ml-3 leading-5 ">
                      Línea de carrera de acorde a desempeño y resultados.
                    </p>
                  </li>
                  <li className="flex items-start lg:col-span-1">
                    <div className="flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-indigo-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <p className="ml-3 leading-5">Desafiamos el desarrollo.</p>
                  </li>
                  <li className="flex items-start lg:col-span-1">
                    <div className="flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-indigo-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <p className="ml-3 leading-5">
                      Fomentamos la disrupción profesional.
                    </p>
                  </li>
                </ul>
              </div>
              <div className="lg:max-w-lg lg:w-full mb-5 md:mb-0 md:w-1/2 w-3/6">
                <div className="mx-auto max-w-sm flex flex-col items-center justify-center text-center">
                  <img
                    className="rounded-full w-64"
                    src="https://elcuvegbwtlngranjtym.supabase.co/storage/v1/object/public/AssetsW2/DescubriendoTalentos/Inicio%20Diferentes%20(1).gif" // Asegúrate de que esta ruta sea correcta
                    alt=""
                  />
                  <div className="mb-4 text-gray-700">
                    <svg
                      height="35px"
                      className="mb-2"
                      fill="#5a67d8"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 32 32"
                      xmlSpace="preserve"
                    >
                      <g>
                        <g id="right_x5F_quote">
                          <g>
                            <path d="M0,4v12h8c0,4.41-3.586,8-8,8v4c6.617,0,12-5.383,12-12V4H0z"></path>
                            <path d="M20,4v12h8c0,4.41-3.586,8-8,8v4c6.617,0,12-5.383,12-12V4H20z"></path>
                          </g>
                        </g>
                      </g>
                    </svg>
                    <p className="mt-2 text-base leading-6">
                      “La línea de carrera me ha demostrado que el éxito no depende del tiempo ni de los títulos. Aunque comencé como practicante, puedo crecer y ser reconocido por mis logros, controlando mi propio desarrollo.”
                    </p>
                    <div className="text-sm mt-5">
                      <p className="font-medium leading-none text-indigo-600 hover:text-black transition duration-500 ease-in-out">
                        Brayan de W2
                      </p>
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          </SwiperSlide>
          <SwiperSlide>
          <section className="text-white body-font bg-none dark:bg-slate-900 shadow-xl">
            <div className="container mx-auto flex md:px-24 md:py-10 md:flex-row flex-col items-center justify-center">
              <div className="lg:flex-grow mt-5 md:mt-0 md:w-1.5/2 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center justify-center">
                <h1 className="text-2xl font-extrabold leading-9 tracking-tight mb-3 text-black sm:text-4xl sm:leading-10 md:text-5xl md:leading-normal">
                  Beneficios exclusivos
                </h1>
                <p className="mb-8 md:pl-0 pl-2 pr-2 leading-relaxed text-gray-700">
                  Porque sabemos que todo esfuerzo trae grandes resultados y los
                  queremos reconocer.
                </p>
                <ul className="mt-8 space-y-3 font-medium text-gray-700">
                  <li className="flex items-start lg:col-span-1">
                    <div className="flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-indigo-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <p className="ml-3 leading-5 ">
                      Tu cargo no limita tu salario.
                    </p>
                  </li>
                  <li className="flex items-start lg:col-span-1">
                    <div className="flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-indigo-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <p className="ml-3 leading-5">
                      Beneficios Corporativos W2.
                    </p>
                  </li>
                  <li className="flex items-start lg:col-span-1">
                    <div className="flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-indigo-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <p className="ml-3 leading-5">
                      Beneficios en base a resultados.
                    </p>
                  </li>
                </ul>
              </div>
              <div className="lg:max-w-lg lg:w-full mb-5 md:mb-0 md:w-1/2 w-3/6">
                <div className="mx-auto max-w-sm flex flex-col items-center justify-center text-center">
                  <img  
                    className="rounded-full w-64"
                    src="https://elcuvegbwtlngranjtym.supabase.co/storage/v1/object/public/AssetsW2/DescubriendoTalentos/Beneficios.gif" // Asegúrate de que esta ruta sea correcta
                    alt=""
                  />
                  <div className="mb-4 text-gray-700">
                    <svg
                      height="35px"
                      className="mb-2"
                      fill="#5a67d8"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 32 32"
                      xmlSpace="preserve"
                    >
                      <g>
                        <g id="right_x5F_quote">
                          <g>
                            <path d="M0,4v12h8c0,4.41-3.586,8-8,8v4c6.617,0,12-5.383,12-12V4H0z"></path>
                            <path d="M20,4v12h8c0,4.41-3.586,8-8,8v4c6.617,0,12-5.383,12-12V4H20z"></path>
                          </g>
                        </g>
                      </g>
                    </svg>
                    <p className="mt-2 text-base leading-6">
                      “Los beneficios por resultados me han demostrado mi capacidad y esfuerzo. Disfrutar de los beneficios corporativos y participar en los retos semanales y mensuales es motivador.”
                    </p>
                    <div className="text-sm mt-5">
                      <p className="font-medium leading-none text-indigo-600 hover:text-black transition duration-500 ease-in-out">
                        Aldair de W2
                      </p>
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          </SwiperSlide>
        </Swiper>
      </div>

  );
};

export default SliderComponent;
