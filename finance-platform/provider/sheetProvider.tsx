"use client";

import { NewAccountSheet } from "@/features/accounts/api/components/new-account-sheet";
import {useState, useEffect} from "react";
export const SheetProvider = () =>{
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        setIsOpen(true); 
    }, []);

    if(!isOpen) {
        return null; // if the sheet is not open, return null to avoid rendering
    }



    return (
        <>
        <NewAccountSheet />
        </>)
}