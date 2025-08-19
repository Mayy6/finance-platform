import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { AccountForm } from "./account-form";
import { useCreateAccounts } from "@/features/accounts/api/use-create-accounts";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";
import { useOpenAccounts } from "../../hooks/use-open-accounts";
import { useGetAccount } from "../use-get-account";
import { Loader2 } from "lucide-react";
import { useEditAccounts } from "../use-edit-accounts";
import { useDeleteAccounts } from "../use-delete-accounts";
import { useConfirm } from "@/hooks/useConfirm";

const formSchema = insertAccountSchema.pick({
    name: true,
});
type FormSchema = z.input<typeof formSchema>;


export function EditAccountSheet() {
    // distrcture the isOpen and onClose from the useNewAcct hook
    // isOpen is a boolean that indicates if the sheet is open or not
    // onClose is a function that will close the sheet when called
    const { isOpen, onClose, id } = useOpenAccounts();
    //hook call has to be inside the function component
    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure you want to delete this account?",
        "You are about to delete this transaction"
    )
    const accountQuery = useGetAccount(id);
    const editMutation = useEditAccounts(id);
    const deleteMutation = useDeleteAccounts(id);
    // const mutation = useCreateAccounts();
    const isPending = editMutation.isPending || deleteMutation.isPending;
    const isLoading = accountQuery.isLoading;
    const onSubmit = (values: FormSchema) => { 
            console.log("NewAccountSheet onSubmit values:", values);

        editMutation.mutate(values);
        console.log("Form submitted with values:", values);
    
    }

    const onDelete = async () => {
        const ok = await confirm();
        if (ok) {
            deleteMutation.mutate(undefined, {
                onSuccess: () => {
                    onClose();
                },
                
            });
        }
    };

    const defaultValues = accountQuery.data ? {
        name: accountQuery.data.name
    } : { name: "" };
    return (
        <>
            <ConfirmDialog />
            <Sheet open ={isOpen} onOpenChange={onClose}>
                {/* <SheetTrigger asChild>
                    <button className="btn btn-primary">New Account</button>
                </SheetTrigger> */}
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Edit Account</SheetTitle>
                        <SheetDescription>
                            Edit your account details.
                        </SheetDescription>
                    </SheetHeader>
                        {isLoading ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Loader2 className="size-4 text-muted-foreground animate-spin" />
                            </div>
                        ): ( 
                        <AccountForm 
                        id={id} 
                        onSubmit={onSubmit} 
                        disabled={isPending} 
                        defaultValues={defaultValues}
                        onDelete={onDelete}
                        />
    )}
            </SheetContent>
            </Sheet>
        </>
    )
 }