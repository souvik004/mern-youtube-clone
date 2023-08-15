import express from "express";
import { forgetPwdController, loginController, registerUser, resetPwdController } from "../controller/auth.js";

const authRouter = express.Router();

authRouter.post('/register', registerUser)
authRouter.post('/login', loginController)
authRouter.post('/forgetpassword', forgetPwdController)
authRouter.post('/resetpassword/:id/:token', resetPwdController)

// authRouter.post('/auth/google', googleAuthController)

export default authRouter