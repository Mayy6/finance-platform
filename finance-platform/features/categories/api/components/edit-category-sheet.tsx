import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { CategoryForm } from "./category-form";
import { useCreateCategories } from "@/features/categories/api/use-create-categories";
import { insertCategorySchema } from "@/db/schema";
import { z } from "zod";
import { useOpenCategories } from "../../hooks/use-open-categories";
import { useGetCategory } from "../use-get-category";
import { Loader2 } from "lucide-react";
import { useEditCategories } from "../use-edit-categories";
import { useDeleteCategories } from "../use-delete-categories";
import { useConfirm } from "@/hooks/useConfirm";

const formSchema = insertCategorySchema.pick({
    name: true,
});
type FormSchema = z.input<typeof formSchema>;


export function EditCategoriesSheet() {
    // distrcture the isOpen and onClose from the useNewAcct hook
    // isOpen is a boolean that indicates if the sheet is open or not
    // onClose is a function that will close the sheet when called
    const { isOpen, onClose, id } = useOpenCategories();
    //hook call has to be inside the function component
    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure you want to delete this category?",
        "You are about to delete this transaction"
    )
    const categoryQuery = useGetCategory(id);
    const editMutation = useEditCategories(id);
    const deleteMutation = useDeleteCategories(id);
    // const mutation = useCreateAccounts();
    const isPending = editMutation.isPending || deleteMutation.isPending;
    const isLoading = categoryQuery.isLoading;
    const onSubmit = (values: FormSchema) => {
        console.log("NewCategorySheet onSubmit values:", values);

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

    const defaultValues = categoryQuery.data ? {
        name: categoryQuery.data.name
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
                        <SheetTitle>Edit Category</SheetTitle>
                        <SheetDescription>
                            Edit your category details.
                        </SheetDescription>
                    </SheetHeader>
                        {isLoading ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Loader2 className="size-4 text-muted-foreground animate-spin" />
                            </div>
                        ): ( 
                        <CategoryForm 
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