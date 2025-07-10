'use client'

import { useUser }  from '@clerk/nextjs'

export const Welcome = () => {
    const { user ,isLoaded } = useUser();
    return (
        <div className='space-y-2 w-full'>
            <h2 className='text-2xl font-semibold text-white'>
                Welcome Back{isLoaded? "," :" "} {user?.firstName} 👋  
            </h2>
            <p className='text-[#674789]'>This is your Financial Overview Report</p>
        </div>
    )

}