import User from "../models/userModel.js";

const searchUsers = async (req, res, next) => {
    try {

        const keyword = req.query.search?
        {
            $or: [
                {name: {$regex: req.query.search, $options: 'i'}},
                {email: {$regex: req.query.search, $options: 'i'}},
            ],
        }: {};

        const users = await User.find(keyword).find({_id: {$ne: req.user_id}});
        res.send(users);

    } catch(error){
        next(error);
    }
}

export { searchUsers };