import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},

    },
    {
        timestamp: true
    }
)

const User = mongoose.model("User", userSchema);
export default User;