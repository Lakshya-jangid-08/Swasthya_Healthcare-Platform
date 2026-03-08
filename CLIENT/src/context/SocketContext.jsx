import React from "react";
import { createContext, useContext } from "react";
import { useState } from "react";
import { createSocket } from "../service/socket";
import { useEffect } from "react";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)

  const connectSocket = (userId) => {
    if(!userId || socket) return;
    
    const newSocket = createSocket(userId)
    newSocket.connect();
    setSocket(newSocket) 
  }

  useEffect(() => {
    return () => {
      socket?.disconnect();
    };
  }, [socket]);

  
  return (
    <SocketContext.Provider value={{socket, connectSocket}}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};