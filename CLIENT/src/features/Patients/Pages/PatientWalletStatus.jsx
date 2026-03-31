import React, { useEffect, useState } from 'react'
import ProfileSidebar from '../Components/ProfileSlidebar'
import { useAuth } from '../../../context/AuthContext'
import { FaMinus, FaPlus, FaRupeeSign } from 'react-icons/fa';
import { MdHistory } from 'react-icons/md';
import { getTransactionLists } from '../../../service/apis';

function PatientWalletStatus() {
    const {user} = useAuth();

    const [transactions, setTransactions] = useState([])
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await getTransactionLists();
                const data = res.data;
                if (data.success) {
                    setTransactions(data.Transactions);
                }

            } catch (error) {
                console.error("Error fetching transactions", error);
            }
        };

        fetchTransactions();
    }, [user?.walletBalance]);

  return (
    <div className='flex min-h-screen w-full'>
        <ProfileSidebar role={user?.role} />
        <main className="flex-1 px-6 sm:px-10 py-8 relative flex flex-col">
            <div className='flex gap-1 items-center absolute right-10 border-2 px-3 py-2 rounded-lg text-lg font-semibold'>
                <h1>Current Balance :</h1>
                <span> <FaRupeeSign size={20} color='green' /> </span>
                <h1>{user?.walletBalance}</h1>
            </div>
            <div className="h-14"></div>
            <div>
                <div className='flex flex-col gap-4'>
                    <h1 className='flex gap-2 items-center text-xl mb-5'>
                        <span><MdHistory/></span> Transcation History
                    </h1>
                    <div className='flex flex-col'>
                        {transactions.map((trans, idx) => {
                            const isCredit = trans.reciever?._id === user._id;

                            const otherPerson = isCredit 
                                ? trans.sender?.fullname || "System"
                                : trans.reciever?.fullname;
                                
                            return (
                                <div key={trans._id} className='flex justify-between border p-4'>

                                    <div className='flex items-center gap-2'>
                                        <div className='text-2xl'>
                                            {idx + 1}. 
                                        </div>
                                        <div>

                                        <h1 className='text-xl'>{otherPerson}</h1>
                                        <p>{trans.purpose}</p>
                                        </div>
                                    </div>

                                    <div className={`${isCredit ? 'text-green-500' : 'text-red-500'}`}>
                                        {isCredit ? '+' : '-'} ₹{trans.amount}
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </main>
    </div>
  )
}

export default PatientWalletStatus