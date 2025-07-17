import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please enter all the fields" });
        }
        const userExists = await User.findOne({email});

        if(userExists) {
            res.status(400);
            throw new Error('User with provided email already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        if(user) {
            res.status(201).json({
                _id: user._id,
                name: user.name, 
                email: user.email,
                // token: generateToken(user._id)
            })
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }



    } catch(error) {
        next(error);
    }
}
const loginUser = async (req, res, next) => {
    const {email, password } = req.body;
     
    if (!email || !password) {
        return res.status(400).json({ message: "Please enter all the fields" });
    }
    // query the db and check stuff, let's get back to the tutorial already.

    
}

export { registerUser };