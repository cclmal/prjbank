import HeaderBox from '@/components/ui/HeaderBox'
import useUserData from '@/hooks/useUserData';
import { getLoggedInUser } from '@/lib/server/appwrite';
import { formatAmount } from '@/lib/utils';
import React from 'react'
import TransactionsTable from '../../../components/ui/TransactionsTable';
import { Pagination } from '@/components/ui/Pagination';

const TransactionHistory = async ({ searchParams: { id, page } }: SearchParamProps) => {
 
  const loggedIn = await getLoggedInUser();
  const { account } = await useUserData(loggedIn, id as string);

  const currentPage = Number(page as string) || 1;

  const rowsPerPage= 10;
  const totalPages = Math.ceil(account?.transactions.length / rowsPerPage);
  const indexOfLastTransaction = currentPage * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

  const currentTransactions = account?.transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  return (
    <section className='transactions'>
      <div className="transactions-header">
        <HeaderBox
          title="Transaction History"
          subtext="View all your transactions and bank details here." 
        />
      </div>

      <div className="space-y-y">
        <div className="transactions-account">
          <div className="flex flex-col gap-2">
            <h2 className="text-18 font-bold text-white">
              {account?.data.name}
            </h2>
            <p className="text-14 text-blue-25">
              {account?.data.officialName}
            </p>
            <p className="text-14 font-semibold tracking-[1.1px] text-white">
              ●●●● ●●●● ●●●● {account?.data.mask}   
            </p>
          </div>

          <div className="transactions-account-balance">
            <p className="texet-14">Current Balance</p>
            <p className="text-24 text-center font-bold">
              {formatAmount(account?.data.currentBalance)}
            </p>
          </div>
        </div>

        <section className="flex w-full flex-col gap-6">
          <TransactionsTable  
            transactions={currentTransactions}
          />


        { totalPages > 1 && (
            <div className="my-4 w-full">
                <Pagination totalPages={totalPages} page={currentPage}/>                                
            </div>
        )}

        </section>

      </div>
    </section>
  )
}

export default TransactionHistory
