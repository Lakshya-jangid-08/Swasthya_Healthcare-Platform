import { io } from "socket.io-client";

const URL = "http://localhost:5000";

export const createSocket = (uid) => {
  const socket = io(URL, {
    query : {
      userId : uid,
    },
    autoConnect: false //Prevents automatic connection when app loads.
  });
  return socket;
}
