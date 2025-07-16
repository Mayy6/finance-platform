'use client';
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts';


import { useNewAcct } from '@/features/accounts/hooks/use-new-acct';
import { Button } from '@/components/ui/button';

export default function Home() {
  // distructure the accounts from the hook
  const {onOpen} = useNewAcct();
  return (
    <div>
      <Button onClick={onOpen}
      variant={"newAcctButton"} 
      className="mb-4">
        Create New Account
      </Button>
    </div>
  );
}
