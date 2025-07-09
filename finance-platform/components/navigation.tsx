"use client"

import { usePathname, useRouter } from "next/navigation";
import NavButton from "@/components/Nav-button";
import { useMedia } from 'react-use'
import { useState } from "react";
import {Button} from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,

} from '@/components/ui/sheet';
import { Menu } from "lucide-react";

const routes = [
    {
        href: "/",
        label: "Overview",
    },
    {
        href: "/transactions",
        label: "Transactions",
    },
    {
        href: "/accounts",
        label: "Accounts",
    },
    {
        href: "/categories",
        label: "Categories",
    },
    {
        href: "/settings",
        label: "Settings",
    },

];

const Navigation = () => {
    const pathname = usePathname(); 
    const [isopen, setOpen] = useState(false);
    const router = useRouter();
    const isMobile = useMedia('(max-width: 1006px)', false);
    const onClick = (href: string) => {
        router.push(href);
        setOpen(false);
    };
    if (isMobile) {
        return (
            <Sheet open={isopen} 
                onOpenChange={setOpen}>
                <SheetTrigger>
                    <Button variant="purple"
                    size="lg"
                    className="focus:bg-white/30 transition font-normal left-1">
                        {/* focus is after click the button the bg will stay on the focus style */}
                    
                    <Menu className="size-6"/></Button>
                </SheetTrigger>
                <SheetContent
                side="left" className="w-64">
                    <nav className="flex flex-col items-start gap-y-4 p-6">
                        {routes.map((route) => (
                           <Button
                           key={route.href}
                           variant={route.href===pathname ? "secondary" : "ghost"}
                           onClick={() => onClick(route.href)}
                           >
                            {route.label}
                           </Button>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        )
    }
  return (
    <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
        {routes.map((route) => (
            <NavButton key={route.href}
                    href={route.href}
                    label={route.label} 
                    isActive={pathname === route.href}/>))}
    </nav>
  )
}

export default Navigation