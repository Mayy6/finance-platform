import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { useNewAcct } from "../../hooks/use-new-acct";
import { AccountForm } from "./account-form";
import { useCreateAccounts } from "@/features/accounts/api/use-create-accounts";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";
const formSchema = insertAccountSchema.pick({
    name: true,
});
type FormSchema = z.input<typeof formSchema>;

export function NewAccountSheet() {
    // distrcture the isOpen and onClose from the useNewAcct hook
    // isOpen is a boolean that indicates if the sheet is open or not
    // onClose is a function that will close the sheet when called
    const { isOpen, onClose } = useNewAcct();
    const mutation = useCreateAccounts();
    const onSubmit = (values: FormSchema) => { 
            console.log("NewAccountSheet onSubmit values:", values);

        mutation.mutate(values);
        console.log("Form submitted with values:", values);
    
    }
    return (
        <Sheet open ={isOpen} onOpenChange={onClose}>
            {/* <SheetTrigger asChild>
                <button className="btn btn-primary">New Account</button>
            </SheetTrigger> */}
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>New Account</SheetTitle>
                    <SheetDescription>
                        Create a new account to manage your finances.
                    </SheetDescription>
                </SheetHeader>
                <AccountForm onSubmit={onSubmit} disabled={mutation.isPending} defaultValues={{name: ""}}/>
                </SheetContent>
                </Sheet>
    )
 }