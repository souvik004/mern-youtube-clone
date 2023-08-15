import express from "express";
import { deleteUser, getUser, getUsers, subscribe, unsubscribe, updateUser } from "../controller/user.js";
import { verifyToken, verifyUser } from "../middlewares/verifyToken.js";

const userRouter = express.Router();

userRouter.get('/all', getUsers)
userRouter.get('/:id', getUser)

userRouter.put('/:id', verifyUser, updateUser)
userRouter.delete('/:id', verifyUser, deleteUser)

userRouter.put('/sub/:id', verifyToken, subscribe)
userRouter.put('/unsub/:id', verifyToken, unsubscribe)

export default userRouter