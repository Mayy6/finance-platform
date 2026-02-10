import {z} from 'zod';
import { Trash } from 'lucide-react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import  {insertCategorySchema} from '@/db/schema';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { id } from 'zod/v4/locales';
import { createServerSearchParamsForServerPage } from 'next/dist/server/request/search-params';
import { Mutation, mutationOptions } from '@tanstack/react-query';
import { useCreateCategories } from '../use-create-categories';

// the form schema is used to validate the form data before submitting it
// and it is used name field in the form
const formSchema = insertCategorySchema.pick({
    name: true,
});
type FormSchema = z.input<typeof formSchema>;

type Props = {
    id?: string;
    defaultValues?: FormSchema;
    onSubmit: (values: FormSchema) => void;
    onDelete?: () => void;
    disabled?: boolean;

}

export const CategoryForm = ({
    id,
    defaultValues,
    onSubmit,
    onDelete,
    disabled = false,
}: Props) => {
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    });

    const handleSubmit = (values: FormSchema) => {
            console.log("CategoryForm handleSubmit values:", {values});

        onSubmit(values);
    };

    const handleDelete = () => {
        if (onDelete) {
            onDelete();
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-4 pt-4 p-4'>
                <FormField
                name="name"
                control={form.control}
                render={({field}) =>(
                    <FormItem>
                        <FormLabel>Category Name</FormLabel>
                        <FormControl>
                            <Input
                                
                                disabled={disabled}
                                placeholder="e.g. Food, Travel..."
                                {...field}
                            />
                        </FormControl>
                        </FormItem>
    )}></FormField>
    <Button className="w-full bg-purple-700" disabled={disabled}>
        {id ? 'Save Category' : 'Create Category'}
    </Button>
    {!!id && (<Button type='button'
            disabled={disabled}
            onClick={handleDelete}
            className='w-full'
            variant="purpleOutline">
                <Trash className="mr-2 h-4 w-4" />
                Delete Category
            </Button>)
            }
    </form>
            
            
        </Form>
    )
};