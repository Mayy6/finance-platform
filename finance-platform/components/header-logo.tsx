import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const Headerlogo = () => {
  return (
    <Link href="/" >
    <div className='items-center hidden lg:flex'>
        <Image src="/logo_carifi.svg" alt="Carifi Logo" width={150} height={150} />
        {/* <p>ClariFi</p> */}
    </div>
    </Link>
  )
}

export default Headerlogo