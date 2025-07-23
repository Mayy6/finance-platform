'use client'
import {JSX, useState} from 'react'
import {Button} from '@/components/ui/button'
import{
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,

    
} from  '@/components/ui/dialog'
import { resolve } from 'path'
import { rejects } from 'assert'


export const useConfirm = (
    title: string,
    message: string,
) :[() => JSX.Element, () => Promise<unknown>] => {
    const [promise, setPromise] = useState<{resolve: (value: boolean)=>void } |null>(null);


    const confirm = () => new Promise ((resolve, reject) => {
        setPromise({resolve})
    })
    const handleClose = () => {
        setPromise(null)
    }

    const handleConfirm = () => {
        promise?.resolve(true);
        handleClose();
    }

    const handleCancel = () => {
        promise?.resolve(false);
        handleClose();
    }

    const ConfirmationDialog= () => (
        <Dialog open={promise !==null}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                
                <DialogDescription>{message}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                    <Button variant="purplebg"onClick={handleConfirm}>Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog> 
    )
    

    return [ConfirmationDialog, confirm]
}

