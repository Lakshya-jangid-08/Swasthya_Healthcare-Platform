const dotenv = require("dotenv")
dotenv.config();

const http = require('http')
const app = require("./app");
const connectDB = require("./configs/db");
const {Server} = require('socket.io');
const Message = require("./models/Message.Model");
const Chat = require("./models/Chat.model");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app); // socket can't attached directly to express so we do this

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true
  }
})  // create websocket server

//store {user, socketId} in map
const userSocketMap = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User connected:",userId);
  
  if(userId) {
    userSocketMap[userId] = socket.id
  }
  
  io.emit("getOnlineUsers", Object.keys(userSocketMap))

  socket.on("send_msg", async(data) => {
      
    const { senderId, receiverId, text } = data;
    
    let chat = await Chat.findOne({
      participants: { $all: [senderId, receiverId] }
    });

    if (!chat) {
      chat = await Chat.create({
        participants: [senderId, receiverId]
      });
    }

    const msg = await Message.create({
      chatId : chat._id,
      senderId,
      receiverId,
      text
    });
    
    const ReceiverSocketId = userSocketMap[receiverId]

    if(ReceiverSocketId) {
      io.to(ReceiverSocketId).emit("rec_msg", msg);
    }

  })

  socket.on("disconnect", () => {
    console.log("User disconnected");
    delete userSocketMap[userId]
    // give updated MAP
    io.emit("getOnlineUsers", Object.keys(userSocketMap))
  });
});

async function startServer() {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

startServer();