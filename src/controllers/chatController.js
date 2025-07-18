import Chat from "../models/chatModel";
import User from "../models/userModel";

const accessChat = async (req, res, next) => {
    const {userid} = req.body;

    if(!userid) {
        console.error("User ID not provided");
        return res.status(400).send({message: "User ID not provided"});
    }

    try {
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
            res.status(200).send(isChat);
          } else {
            const chatData = {
                chatName: "sender",
                isGroupChat: false,
                users: [req.user._id, userid]
            };
          }
          
    } catch(error) {
       next(error);
    }
}