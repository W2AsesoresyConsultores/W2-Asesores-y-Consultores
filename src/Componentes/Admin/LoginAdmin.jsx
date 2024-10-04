import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../Context/AuthContext';
import HeaderPower from '../Power/HeaderPower';

function LoginAdmin() {
    const navigate = useNavigate();
    const { manualSignIn } = UserAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const success = await manualSignIn(email, password);
            if (success) {
                const userRole = await getUserRole(email);
                if (userRole === 'reclutador') {
                    navigate('/Admin');
                } else {
                    setError('No tienes permiso para acceder a esta área');
                }
            } else {
                setError('Correo electrónico o contraseña incorrecta');
            }
        } catch (err) {
            setError('Ocurrió un error al iniciar sesión');
        }
    };

    return (
        <div>
            <HeaderPower />
            <div className="w-[100%] h-screen flex font-dmsans items-center">
                <div className="w-1/2 h-full hidden md:flex items-center justify-center overflow-hidden"
                     style={{
                         backgroundImage: 'url(https://media.licdn.com/dms/image/D5612AQEp8eLVvJjp4g/article-cover_image-shrink_720_1280/0/1701667358138?e=2147483647&v=beta&t=VTBUxf1Yr-jtuKd_HKPxV6adgeRQBT5p45JAkyVbGJ8)',
                         backgroundSize: 'cover',
                         backgroundPosition: 'center',
                     }}>
                </div>
                <div className="md:w-1/2 h-full py-6 bg-white flex items-center mx-auto px-4">
                    <div className="p-10 xs:p-0 md:mx-auto lg:w-full lg:max-w-md">
                        <h1 className="font-bold text-left text-2xl text-primarycolor mt-20">
                            Te damos la bienvenida
                        </h1>
                        <h1 className="font-regular text-left text-md text-gray-700 mt-2">
                            Ingresa tus datos para iniciar sesión
                        </h1>
                        <div className="bg-white w-full rounded-lg divide-y divide-gray-200">
                            <div className="py-7 w-full">
                                <label className="font-regular text-md text-gray-600 pb-1 block">Correo electrónico</label>
                                <input
                                    type="email"
                                    placeholder="Ingresa tu correo"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-primarycolor focus:bg-white focus:outline-none mb-8"
                                    required
                                />
                                <label className="font-regular text-md text-gray-600 pb-1 block">Contraseña</label>
                                <input
                                    type="password"
                                    placeholder="Ingresa tu contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-primarycolor focus:bg-white focus:outline-none mb-12"
                                    required
                                />
                                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
                                <div className='flex md:justify-between items-center flex-wrap gap-4 justify-center'>
                                    <a href="https://wa.me/51970632448?text=Hola%2C%20me%20gustar%C3%ADa%20que%20me%20pueda%20ayudar%20a%20recuperar%20mi%20contrase%C3%B1a" className='text-[#00aec7] font-base text-md'>Olvidé mi contraseña</a>
                                    <button
                                        type="button"
                                        onClick={handleLogin}
                                        className="transition duration-200 bg-[#ffe946] hover:bg-[#fff084] focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-primarycolor w-52 h-10 flex py-2.5 rounded-lg text-md shadow-sm hover:shadow-md font-semibold text-center justify-center items-center"
                                    >
                                        <span className="inline-block mr-2">Continuar</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </button>
                                </div>
                                <a href="https://wa.me/51970632448?text=Hola%20vengo%20de%20Power.%20Quiero%20solicitar%20mi%20cuenta%20de%20Reclutador." className="text-blue-500 mt-4 ml-24 block text-center">
                                    Solicitar cuenta de Reclutador
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginAdmin;