import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
    {
        //which user is commenting
        userId: {
            type: String,
            required: true,
        },
        //for which video the comment is
        videoId: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

export default mongoose.model('Comment', CommentSchema)