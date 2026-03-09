import React, { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import { useSocket } from "../../../context/SocketContext";
import { IoSend } from "react-icons/io5";
import { getAllMessagesAPI } from "../../../service/apis";

function ChatCard({SenderId, ReceiverId}) {

  const {socket, connectSocket} = useSocket();
  const [message, setMessage] = useState("");
  const [messageData, setMessageData] = useState([]);

  const handleSubmit = (e) => {

    e.preventDefault();
    if (!message.trim()) return;
    
    const msgObj = {
      senderId: SenderId,
      receiverId: ReceiverId,
      text: message
    };

    socket.emit("send_msg", msgObj);
    setMessageData(prev => [...prev, msgObj]);
    setMessage("");

  }

  const [onlineUser, setonlineUser] = useState({})

  useEffect(() => {
    connectSocket(SenderId);
    if (!socket) return;
    socket.on("getOnlineUsers", (obj)=>{
      setonlineUser(obj)
    })
    return () => socket.off("getOnlineUsers");
  }, [socket])
  
  useEffect(()=> {
    if(!socket) return;
    socket.on("rec_msg", (msg) => {
      setMessageData(prev => [...prev, msg]);
    });
    return () => socket.off("rec_msg");
  }, [socket])

  const fetchMsg = async (receiverId) => {
    const data = await getAllMessagesAPI(receiverId);
    return data; 
  }

useEffect(() => {
  const loadMessages = async () => {
    const data = await fetchMsg(ReceiverId);
    console.log(data.data.msgs);
    
    await setMessageData(data.data.msgs);
    console.log(messageData);
    
  };

  loadMessages();
}, []);
  

  return (
  <>
    {/* HEADER */}
    <div className="flex-shrink-0 border-b bg-white">
      <ChatHeader ReceiverId = {ReceiverId}/>
    </div>

    {/* MESSAGES */}
    <div className="flex-1 w-full overflow-y-auto px-6 py-4 bg-gray-100 space-y-3">

      {messageData.map((m) => {
        const isMe = m.senderId === SenderId;

        return (
          <div key={m.id + Math.random(0,1000)} className={`flex ${isMe ? "justify-end" : "justify-start"}`} >
            <div className={` max-w-xs md:max-w-md px-4 py-2 text-sm ${isMe
                  ? "bg-green-700 text-white rounded-l-xl rounded-br-xl"
                  : "bg-white text-gray-800 rounded-r-xl rounded-bl-xl border"}
              `}>
              {m.text}
            </div>
          </div>
        );
      })}

    </div>

    {/* INPUT */}
    <div className="flex-shrink-0 bg-white border-t px-5 py-3">

      <form onSubmit={handleSubmit} className="flex items-center gap-3">

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border rounded-full px-4 h-11 outline-none focus:border-green-500"
          placeholder="Type a message..."
          type="text"
        />

        <button type="submit" className="rounded-full bg-green-600 hover:bg-green-700 w-11 h-11 flex items-center justify-center">
          <IoSend color="white" size={18} />
        </button>

      </form>

    </div>
  </>
  );
}

export default ChatCard;
