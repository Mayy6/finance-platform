import React from 'react'
import Headerlogo from './header-logo'
import Navigation from './navigation'
import { UserButton } from '@clerk/nextjs'
import { Welcome } from './welcome'

const header = () => {
  return (
    <header>
      <div className='bg-gradient-to-b from-purple-700 to-purple-50 px-4 py-8 lg:px-14 pb-36'>
        {/* 上面一行，左侧logo+导航+用户按钮 */}
        <div className='flex items-center gap-x-1 lg:gap-x-20 px-4 py-2 justify-between'>
          <div className="flex items-center gap-x-8">
            <Headerlogo />
            <Navigation />
          </div>
          <UserButton afterSignOutUrl="/" />
        </div>
        <div className="mt-6 px-4">
          <Welcome />
        </div>
      </div>
    </header>
  )
}

export default header