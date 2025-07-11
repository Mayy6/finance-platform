'use client';
import { useGetAccounts } from '../features/accounts/api/use-get-accounts';



import { Button } from '@/components/ui/button';
import { accounts } from '@/db/schema';
import { UserButton } from '@clerk/nextjs';
export default function Home() {
  const accountsQuery = useGetAccounts();

  return (
    <div>
      Home page
    </div>
  );
}
