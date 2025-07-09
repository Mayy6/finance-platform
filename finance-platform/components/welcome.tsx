'use client'

import { useUser }  from '@clerk/nextjs'

export const Welcome = () => {
    const { user ,isLoaded } = useUser();
    return (
        <div>
            <h2>
                Welcome bback
            </h2>
            <p>This is your Financial Overview Report</p>
        </div>
    )

}