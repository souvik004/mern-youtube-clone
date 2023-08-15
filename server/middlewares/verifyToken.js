import jwt from "jsonwebtoken"
import { ErrorHandler } from "./errorHandler.js"

// verify token to complete authentication/login
export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['Authorization']

    if (!authHeader) {
        return next(ErrorHandler(401, 'Unauthorized'))
    }
console.log(authHeader)
    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, info) => {
        if(err){
            return next(ErrorHandler(401, 'Invalid token'))
        }else{
            console.log(info)
            req.user = info
            next()
        }
    })
}

// login user but is unauthorized to perform some actions
export const verifyUser = async (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id){
            next()
        }else{
            return next(ErrorHandler(403, "You are not allowed to perform the action"))
        }
    })
}