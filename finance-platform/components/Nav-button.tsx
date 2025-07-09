import React from 'react'
import { Button } from '@/components/ui/button';
import Link from 'next/link'
import {
    Sheet,
    SheetContent,
    SheetTrigger,

} from '@/components/ui/sheet';
import { useMedia } from 'react-use'
type props = {
    href: string
    label: string
    isActive?: boolean
}

const NavButtton = ({
    href,
    label,
    isActive,
}:props) => {
  return (
    <Button 
    asChild
    size={'sm'}
    
    variant="purple"
    className='flex items-center justify-center text-lg gap-x-2 px-3 py-2 font-medium transition-colors duration-200 hover:bg-purple-400 focus-visible:ring-purple disabled:pointer-events-none disabled:opacity-50'>
        <Link href={href}>
        {label}</Link>
    </Button>
  )
}

export default NavButtton