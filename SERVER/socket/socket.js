const { Server } = require("socket.io");
const Chat = require("../models/Chat.model");
const Message = require("../models/Message.Model");

const initSocket = (server) => {
     // create websocket server
    const io = new Server(server, {
            cors: {
                origin: "http://localhost:5173",
                credentials: true
            }
        })

    //store {user, socketId} in map
    const userSocketMap = {};

    io.on('connection', (socket)=> {
        const userId = socket.handshake.query.userId;
        if(userId) {
            userSocketMap[userId] = socket.id
        }
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
        
        socket.on("send message", async(data) => {
            const { senderId, receiverId, text } = data;
            let chat = await Chat.findOne({
                participants: { $all: [senderId, receiverId] }
            })
            if(!chat) {
                chat = await Chat.create({
                    participants: [senderId, receiverId]
                })
            }
            const message = await Message.create({
                chatId : chat._id,
                senderId : senderId,
                receiverId : receiverId,
                text : text
            })

            const ReceiverSocketId = userSocketMap[receiverId];
            if(ReceiverSocketId) {
                io.to(ReceiverSocketId).emit("receive message", message);
            }
        })

        socket.on("disconnect", () => {
            console.log("User disconnected");
            delete userSocketMap[userId]
            // give updated MAP
            io.emit("getOnlineUsers", Object.keys(userSocketMap))
        });
    })

}

module.exports = initSocket;