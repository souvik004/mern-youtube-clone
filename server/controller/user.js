import { ErrorHandler } from "../middlewares/errorHandler.js";
import User from "../model/User.js";
import bcrypt from 'bcryptjs'

//update user profile
export const updateUser = async (req, res, next) => {
    if(req.body.password){
        const salt = bcrypt.genSaltSync(10)
        req.body.password = bcrypt.hashSync(req.body.password, salt)
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                ...req.body
            }
        }, {new: true});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({msg: "User updated successfully", data: user})
    }catch(err){
        next(err)
    }
}

//delete user
export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return next(ErrorHandler(404, 'User not found'))
        }
        res.status(200).json({msg: "User deleted successfully"})
    }catch(err){
        next(err)
    }
}

//get all users
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        if (!users) {
            return next(ErrorHandler(404, 'No users found'))
        }
        res.status(200).json({data: users})
    }catch(err){
        next(err)
    }
}

//get all users
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            return next(ErrorHandler(404, 'User not found'))
        }
        res.status(200).json({data: user})
    }catch(err){
        next(err)
    }
}

//subsribe an user
export const subscribe = async (req, res, next) => {
    try {
        //like youtube subcriptions: add into my subscription list
        await User.findByIdAndUpdate(req.user.id, {
            $push: {
                subscribedUsers: req.params.id
            }
        })

        //increase that user's subscriber count whom I've just subscribed
        const subs = await User.findByIdAndUpdate(req.params.id, {
            $inc: {
                subscribers: 1
            }
        })

        res.status(200).json({msg: `Subscribed to ${subs.name}`})
    } catch (error) {
        next(error)
    }
}

//unsubsribe an user
export const unsubscribe = async (req, res, next) => {
    try {
        //like youtube subcriptions: add into my subscription list
        await User.findByIdAndUpdate(req.user.id, {
            $pull: {
                subscribedUsers: req.params.id
            }
        })

        //increase that user's subscriber count whom I've just subscribed
        const subs = await User.findByIdAndUpdate(req.params.id, {
            $inc: {
                subscribers: -1
            }
        })

        res.status(200).json({msg: `Unsubscribed to ${subs.name}`})
    } catch (error) {
        next(error)
    }
}