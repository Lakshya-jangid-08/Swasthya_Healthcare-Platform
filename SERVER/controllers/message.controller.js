const Chat = require("../models/Chat.model");
const Message = require("../models/Message.Model");

const getUserForSlidebar = async (req, res) => {
    try {
        
        const userId = req.user.id
        // take all user which is chat with this user ....
        const chats = await Chat.find({
            participants : userId
        })
        .populate("participants", "fullname contactNumber profileImage")
        .sort({ lastMessageTime: -1 });

        const chatList = chats.map(chat => {

            const otherUser = chat.participants.find(
                user => user._id.toString() !== userId.toString()
            );
            return {
                chatId: chat._id,
                user: otherUser,
                lastMessage: chat.lastMessage,
                lastMessageTime: chat.lastMessageTime
            };
        })
        

        return res.status(200).json({chatList, message : "Successfully fetched"})

    } catch(err) {
        return res.status(500).json({ message: "SERVER ERROR" });
    }
}

const getMessages = async (req, res) => {
    try{
        const { userId: otherUserId } = req.params;
        const userId = req.user.id;
      
        const chat = await Chat.findOne({
          participants: { $all: [userId, otherUserId] }
        });
      
        if (!chat) {
          return res.status(202).json([]);
        }
        
        await Message.updateMany({
            chatId: chat._id,
            senderId: { $ne: userId },
            seen: false
        },
        {
            $set: { seen: true }
        });

        // oldest to newest
        const msgs = await Message.find({
          chatId: chat._id
        }).sort({ createdAt: 1 });
      
        return res.status(200).json({msgs, message : "Fetched successfully"});
    } catch(err) {
        console.log(err);
        return res.status(500).json({ message: "SERVER ERROR" });
    }
};

// const sendMessage = async(req, res) => {
//     try {

//         const { otherUserId } = req.params;
//         const userId = req.user.id;
//         const {text} = req.body;
//         const msg = await Message.create({
//             senderId : userId,
//             receiverId : otherUserId,
//             text
//         })
        
//         // Emit the new message to receiver's socket id
//         const receiverSocketId = userSocketMap[otherUserId]

//         if(receiverSocketId) {
//             io.to(receiverSocketId).emit("newMessage", msg);
//         }

//         return res.status(200).json({msg, message : "Successfull send !"})

//     } catch(error) {
//         return res.status(500).json({ message: "SERVER ERROR" });
//     }
// }

module.exports = {
    getUserForSlidebar,
    getMessages,
    // sendMessage
}