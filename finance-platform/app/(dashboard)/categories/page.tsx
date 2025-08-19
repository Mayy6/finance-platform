'use client'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card'
import { fr } from 'zod/v4/locales'
import { Button } from '@/components/ui/button'
import {Loader2, Plus} from 'lucide-react'
import { useNewAcct } from '@/features/accounts/hooks/use-new-acct'

import { columns } from "./columns"
import { DataTable } from '@/components/data-table'
import { InferResponseType } from 'hono'
import { client } from '@/lib/hono'
import { use } from 'react'
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts'
import { Skeleton } from '@/components/ui/skeleton'
import { useBulkDelete } from '@/features/accounts/api/use-bulk-delete'
import { RowPagination } from '@tanstack/react-table'

const Categoriespage = () => {
    const newAccount = useNewAcct();
    const accountsQuery = useGetAccounts();
    const deleteAcct = useBulkDelete();
    const accounts = accountsQuery.data || [];
    
    const isDisabled = accountsQuery.isLoading || deleteAcct.isPending;

    if (accountsQuery.isLoading) {
      return (
        <div className='max-w-screen-2xl mx-auto w-full pd-8 -mt-26'>
          <Card className='border-none drop-shadow-sm w-full'>

            <CardHeader className='gap-y-2 lg:flex lg:flex-row lg:items-center lg:justify-between'>
                <Skeleton className='h-6 w-full' />
            </CardHeader>
            <CardContent>
              <div className='w-full flex items-center'>
              <Loader2 className='animate-spin size-6 text-slate-300'/>
              </div>
            </CardContent>
            </Card>
        </div>
      )
    }

    return (
    <div className='max-w-screen-2xl mx-auto w-full pd-8 -mt-26'>
        <Card className='border-none drop-shadow-sm w-full'>
            <CardHeader className='gap-y-2 lg:flex lg:flex-row lg:items-center lg:justify-between'>
                <CardTitle className='text-xl font-bold line-clamp-1'>Categories Page</CardTitle>
                {/* <CardDescription>
                    Manage your financial accounts here.
                </CardDescription> */}
                <Button onClick={newAccount.onOpen} variant={'purplebg'} size='sm' className='px-2 py-1 text-sm'>
                    <Plus />Add New</Button>
            </CardHeader>
            <CardContent>
                <DataTable 
                columns={columns} 
                data={accounts} 
                onDelete={(row) => {
                  // row is an array of selected rows
                  // we need to extract the ids from the rows
                  const ids = row.map((r) => r.original.id);


                  deleteAcct.mutate({ids});
                }} 
                disabled={isDisabled} />
            </CardContent>
            </Card>
        </div>
  )
}

export default Categoriespage