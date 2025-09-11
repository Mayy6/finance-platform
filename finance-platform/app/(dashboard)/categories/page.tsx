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
import { useNewCate } from '@/features/categories/hooks/use-new-categories'

import { columns } from "./columns"
import { DataTable } from '@/components/data-table'
import { InferResponseType } from 'hono'
import { client } from '@/lib/hono'
import { use } from 'react'
import { useGetCategories } from '@/features/categories/api/use-get-categories'
import { Skeleton } from '@/components/ui/skeleton'
import { useBulkDelete } from '@/features/categories/api/use-bulk-delete'
import { RowPagination } from '@tanstack/react-table'

const Categoriespage = () => {
    const newCategory = useNewCate();
    const categoriesQuery = useGetCategories();
    const deleteAcct = useBulkDelete();
    const categories = categoriesQuery.data || [];
    
    const isDisabled = categoriesQuery.isLoading || deleteAcct.isPending;

    if (categoriesQuery.isLoading) {
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
                <Button onClick={newCategory.onOpen} variant={'purplebg'} size='sm' className='px-2 py-1 text-sm'>
                    <Plus />Add New</Button>
            </CardHeader>
            <CardContent>
                <DataTable 
                columns={columns} 
                data={categories} 
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