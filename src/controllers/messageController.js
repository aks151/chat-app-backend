import Message from '../models/messageModel.js';
import User from '../models/userModel.js';
import Chat from '../models/chatModel.js';

const sendMessage = async (req, res, next) => {
    console.log('yoyo sendMessage called, req: ', req);
    const {content, chatid} = req.body;

    if(!content || !chatid){
        console.log('Invalid data passed into request');
        return res.sendStatus(400);
    }

    const newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatid
    };

    try {
        let message = await Message.create(newMessage);

        message = await message.populate('sender', 'name');
        message = await message.populate('chat');

        message = await User.populate(message, {
            path: 'chat.users',
            select: 'name email'
        })

        await Chat.findByIdAndUpdate(req.body.chatid, {latestMessage: message});
        res.json(message);
    } catch(error){
        next(error);
    }
}

export { sendMessage };