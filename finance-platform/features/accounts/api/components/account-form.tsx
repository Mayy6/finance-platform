import {z} from 'zod';
import { Trash } from 'lucide-react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import  {insertAccountSchema} from '@/db/schema';
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
import { useCreateAccounts } from '../use-create-accounts';

// the form schema is used to validate the form data before submitting it
// and it is used name field in the form
const formSchema = insertAccountSchema.pick({
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

export const AccountForm = ({
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
            console.log("AccountForm handleSubmit values:", {values});

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
                        <FormLabel>Account Name</FormLabel>
                        <FormControl>
                            <Input
                                
                                disabled={disabled}
                                placeholder="e.g. Cash, Savings, Credit Card"
                                {...field}
                            />
                        </FormControl>
                        </FormItem>
    )}></FormField>
    <Button className="w-full bg-purple-700" disabled={disabled}>
        {id ? 'Save Account' : 'Create Account'}
    </Button>
    {!!id && (<Button type='button'
            disabled={disabled}
            onClick={handleDelete}
            className='w-full'
            variant="purpleOutline">
                <Trash className="mr-2 h-4 w-4" />
                Delete Account
            </Button>)
            }
    </form>
            
            
        </Form>
    )
};