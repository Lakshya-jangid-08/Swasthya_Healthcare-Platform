import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ChatContainer from '../Components/ChatContainer';
import { useAuth } from '../../../context/AuthContext';
import { getUserlistAPI } from '../../../service/apis';
import { FaHome } from 'react-icons/fa';

function Inbox() {
    const {id} = useParams();
    const {user} = useAuth();
    const nav = useNavigate();
    const [search, setSearch] = useState("");
    const [chatList, setChatList] = useState([])
    const [users, setUsers] = useState([])

    const [filterUser, setFilterUser] = useState(users)

    const handleFiltering = (search) => {
        const filteredUsers = users.filter(user =>
            user.fullname.toLowerCase().includes(search.toLowerCase()) ||
            user.contactNumber.toLowerCase().includes(search.toLowerCase())
        );
        setFilterUser(filteredUsers);
    }

    const fetchUsers = async() => {
        const res = await getUserlistAPI();
        setChatList(res.data.chatList);
    }

    useEffect(() => {
        const userArray = chatList.map(chat => chat.user);
        setUsers(userArray);
    }, [chatList]);

    useEffect(()=>{
        fetchUsers();
    }, [])

    useEffect(()=> {
        handleFiltering(search);
    }, [search, users])

  return (
    <div className='w-full h-screen bg-slate-300 flex'>
        <div className={`${id ? "hidden md:block" : "block"} w-full md:w-2/5 border-r-2 border-black`}>
            {/* HEADER */}
            <div className='py-4 px-3 bg-slate-800 justify-between flex items-center'>
                <h1 className='bg-clip-text bg-gradient-to-tr text-transparent from-sky-400 to-emerald-300 font-bold text-3xl'>Swastya</h1>
                <h1 className='text-white text-2xl px-4 cursor-pointer' onClick={()=>nav('/')}><FaHome/></h1>
            </div>
            {/* search */}
            <div className='w-full  py-2 px-2'> 
                <input type='text' placeholder='Search Your Friends...' value={search} onChange={(e)=>setSearch(e.target.value)} className=' w-full px-2 py-1 rounded-lg border-black border-2 bg-transparent outline-none'/>
            </div>

            <div className='flex flex-col gap'>
                {
                    filterUser.map((u, index)=> {
                        return (
                        <div key={index}  className='flex gap-2 font-semibold items-center px-2 hover:bg-slate-600  mt-3' onClick={()=> {nav(`/inbox/${u._id}`)}}>
                            <img src={u.profileImage} alt="img" className='rounded-full h-14 w-14' />
                            <div>
                                <h1>{u.fullname}</h1>
                                <h1 className='font-light'>{u.contactNumber}</h1>
                            </div>
                        </div>
                    )})
                }
            </div>

        </div>
        {
            id ? 
            <div className='flex flex-col flex-1 h-screen w-full'>
                <ChatContainer SenderId={user._id} ReceiverId={id} />
            </div>
              :
            <div className='relative hidden md:flex w-full h-full bg-slate-400 text-white'>
                <div className='absolute text-5xl font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    Let's Start Talk
                </div>
            </div>
        }
        <div>
            
        </div>
    </div>
  )
}

export default Inbox