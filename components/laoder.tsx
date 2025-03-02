import Image from 'next/image'
import React from 'react'
import logoMobile from '../assets/images/security-logo-no-slogen.png';


function Loader() {
  return (
    <div className='absolute w-full h-full backdrop-blur-sm flex justify-center items-center content-center  bg-white/50'>
      <Image
          src={logoMobile.src}
          alt="logo"
          width={50}
          height={50}
          priority
          className="animate-pulse absolute bottom-1/2 translate-y-1/2 right-1/2 translate-x-1/2"
        />
    </div>
  )
}

export default Loader