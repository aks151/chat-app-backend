import Chat from "../models/chatModel.js";
import User from "../models/userModel.js";

const accessChat = async (req, res, next) => {
    console.log("chatController.js Accessing chat, req.body:", req.body);
    const {userid} = req.body;
    console.log("Accessing chat for user ID:", userid);

    if(!userid) {
        console.error("User ID not provided");
        return res.status(400).send({message: "User ID not provided"});
    }

    try {
      console.log("Accessing chat for user ID, try block:", userid);
      console.log("Current user ", req.user);
        let isChat = await Chat.findOne({
            isGroupChat: false,
            $and: [
                {users: {$elemMatch: {$eq: req.user._id}}},
                {users: {$elemMatch: {$eq: userid}}}
            ]
        }).populate("users", "-password")
          .populate("latestMessage");

          isChat = await User.populate(isChat, {
            path: "latestMessage.sender",
            select: "name email"
          });

          if(isChat) {
            res.send(isChat);
            console.log("Chat found:", isChat);
          } else {
            console.log("No chat found, creating new chat for user ID:", userid);
            const chatData = {
                chatName: "sender",
                isGroupChat: false,
                users: [req.user._id, userid]
            };

            const createdChat = await Chat.create(chatData);

            const fullChat = await Chat.findOne({_id: createdChat._id}).populate(
              "users",
              "-password"
            )

            res.status(201).send(fullChat);
          console.log("New chat created:", fullChat);
          }
          
    } catch(error) {
       next(error);
    };
}

export { accessChat };