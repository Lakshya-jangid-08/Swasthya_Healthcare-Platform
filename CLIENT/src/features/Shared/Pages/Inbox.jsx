// Inbox.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatContainer from "../Components/ChatContainer";
import { useAuth } from "../../../context/AuthContext";
import { getUserlistAPI } from "../../../service/apis";
import { FaHome } from "react-icons/fa";

function Inbox() {
  const { id } = useParams();
  const { user } = useAuth();
  const nav = useNavigate();

  const [search, setSearch] = useState("");
  const [chatList, setChatList] = useState([]);
  const [users, setUsers] = useState([]);
  const [filterUser, setFilterUser] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getUserlistAPI();
      setChatList(res.data.chatList);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const userArray = chatList.map((chat) => chat.user);
    setUsers(userArray);
  }, [chatList]);

  useEffect(() => {
    const filtered = users.filter((u) =>
      u.fullname.toLowerCase().includes(search.toLowerCase()) ||
      u.contactNumber.toLowerCase().includes(search.toLowerCase())
    );
    setFilterUser(filtered);
  }, [search, users]);

  return (
    <div className="w-full h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <div className={`${id ? "hidden md:flex" : "flex"} flex-col w-full md:w-1/3 bg-white border-r`}>

        {/* HEADER */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h1 className="text-3xl font-bold text-blue-600">Swasthya</h1>
          <FaHome className="cursor-pointer text-gray-600 hover:text-blue-600 text-xl" onClick={() => nav("/")} />
        </div>

        {/* SEARCH */}
        <div className="p-3">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-full border focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* USERS */}
        <div className="flex-1 overflow-y-auto px-2">
          {filterUser.map((u) => (
            <div
              key={u._id}
              onClick={() => nav(`/inbox/${u._id}`)}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition 
                hover:bg-blue-50 ${id === u._id ? "bg-blue-100" : ""}`}
            >
              <img src={u.profileImage} className="h-12 w-12 rounded-full object-cover ring ring-black" />
              <div>
                <h1 className="font-medium text-lg">{u.fullname}</h1>
                <p className="text-md text-gray-500">{u.contactNumber}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CHAT */}
      {id ? (
        <div className="flex flex-col flex-1 bg-white">
          <ChatContainer SenderId={user._id} ReceiverId={id} />
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center text-gray-400">
          Select a chat to start messaging
        </div>
      )}
    </div>
  );
}

export default Inbox;