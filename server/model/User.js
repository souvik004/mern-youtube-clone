import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String
        },
        img: {
            type: String,
        },
        //subcriber count
        subscribers: {
            type: Number,
            default: 0,
        },
        //list of users(userId) whom I have subcribed 
        subscribedUsers: {
            type: [String],
        },
    },
    // {timestamps: true}
)

export default mongoose.model('User', UserSchema)