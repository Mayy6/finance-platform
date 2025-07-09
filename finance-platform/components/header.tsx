import React from 'react'
import Headerlogo from './header-logo'
import Navigation from './navigation'
import { UserButton } from '@clerk/nextjs'
const header = () => {
  return (
    <div className='bg-gradient-to-b from-purple-700 to-purple-50 px-4 py-8 lg:px-14 pb-36 flex justify-between'>
        <div className='flex items-center gap-x-1 lg:gap-x-20 px-4 py-2'>
            {/* regards the different size of the mobile and bowser view */}
            <Headerlogo />
            <Navigation />
        </div>
        <UserButton afterSignOutUrl="/" className="z-50"/>
    </div>
  )
}

export default header