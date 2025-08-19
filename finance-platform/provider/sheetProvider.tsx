"use client";

import { NewAccountSheet } from "@/features/accounts/api/components/new-account-sheet";
import {useState, useEffect} from "react";
import { EditAccountSheet } from "@/features/accounts/api/components/edit-account-sheet";
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
        <EditAccountSheet />
        </>)
}