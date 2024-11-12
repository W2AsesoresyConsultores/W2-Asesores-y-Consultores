import React from 'react'



function CardTestimonio() {
  return (
    <div 
    style={{width:'500px'}}
    className='flex flex-col items-center justify-center h-80 w-96'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos eveniet ipsum impedit totam consectetur tenetur enim iure soluta mollitia repellat?</p>
        <div className='w-32 h-32 bg-white rounded-full'>
          <img className='w-32 h-32' 
          src="https://elcuvegbwtlngranjtym.supabase.co/storage/v1/object/public/AssetsW2/Inicio/logo-lacruz.png"
          alt="" />
        </div>
        <h3></h3>
        <h4></h4>
    </div>
  )
}

export default CardTestimonio