import express from "express";
import { addComment, deleteComment, getComments } from "../controller/comment.js";
import { verifyToken, verifyUser } from "../middlewares/verifyToken.js";

const commentRouter = express.Router();

commentRouter.post('/create', verifyToken, addComment)
// commentRouter.put('/edit', verifyToken, getComments)
commentRouter.delete('/:id', verifyToken, deleteComment)
commentRouter.get('/:videoId', getComments)

export default commentRouter