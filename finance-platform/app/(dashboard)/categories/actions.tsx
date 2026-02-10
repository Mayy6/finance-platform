"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useOpenCategories } from "@/features/categories/hooks/use-open-categories";
import { useDeleteCategories } from "@/features/categories/api/use-delete-categories";
import { useConfirm } from "@/hooks/useConfirm";
import { Edit, Trash} from "lucide-react";
type Props ={
    id: string;
}

export const Actions =({ id }: Props) =>{

    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure you want to delete this category?",
        "You are about to delete this category"
    );

    const deleteMutation = useDeleteCategories(id);
    const { onOpen } = useOpenCategories(); 
    const handleDelete  = async () => {
        const ok = await confirm();
        if (ok) {
            deleteMutation.mutate(

            );
        }
    }

    return (
        <>
        <ConfirmDialog />
        <DropdownMenu>
            <DropdownMenuTrigger>
                <MoreHorizontal className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-primary" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem disabled = {deleteMutation.isPending} onClick={() =>onOpen(id)}><Edit className="size-4 mr-2"/>Edit</DropdownMenuItem>
                {/* <DropdownMenuItem>Delete</DropdownMenuItem> */}
                <DropdownMenuItem disabled = {deleteMutation.isPending} onClick={handleDelete}><Trash className="size-4 mr-2"/>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    )
} 