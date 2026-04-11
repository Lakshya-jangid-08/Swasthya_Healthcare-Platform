// ChatContainer.jsx
import React, { useEffect, useRef, useState } from "react";
import { useSocket } from "../../../context/SocketContext";
import InboxHeader from "./InboxHeader";
import { IoSend } from "react-icons/io5";
import { getAllMessagesAPI } from "../../../service/apis";

function ChatContainer({ SenderId, ReceiverId }) {
  const { socket, connectSocket } = useSocket();
  const [message, setMessage] = useState("");
  const [messageData, setMessageData] = useState([]);
  const bottomRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const msgObj = {
      senderId: SenderId,
      receiverId: ReceiverId,
      text: message,
    };

    socket.emit("send message", msgObj);
    setMessageData((prev) => [...prev, msgObj]);
    setMessage("");
  };

  useEffect(() => {
    connectSocket(SenderId);
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("receive message", (msg) => {
      setMessageData((prev) => [...prev, msg]);
    });

    return () => socket.off("receive message");
  }, [socket]);

  useEffect(() => {
    const loadMessages = async () => {
      const data = await getAllMessagesAPI(ReceiverId);
      setMessageData(data?.data?.msgs || []);
    };
    loadMessages();
  }, [ReceiverId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageData]);

  return (
    <>
      <InboxHeader ReceiverId={ReceiverId} />

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto px-6 py-4 bg-gray-100 space-y-2">
        {messageData.map((m, i) => {
          const isMe = m.senderId === SenderId;

          return (
            <div key={i} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div
                className={`px-4 py-2 rounded-xl max-w-xs text-lg shadow
                ${isMe
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-white text-gray-800 border rounded-bl-none"
                }`}
              >
                {m.text}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef}></div>
      </div>

      {/* INPUT */}
      <form onSubmit={handleSubmit} className="flex gap-2 p-3 border-t bg-white">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
        />
        <button className="bg-blue-600 text-white rounded-full p-3 hover:bg-blue-700">
          <IoSend />
        </button>
      </form>
    </>
  );
}

export default ChatContainer;