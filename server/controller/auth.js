import bcrypt from 'bcryptjs'
import { ErrorHandler } from '../middlewares/errorHandler.js'
import User from "../model/User.js"
import jwt from 'jsonwebtoken'
import passport from 'passport'
import transporter from '../config/email.js'

export const registerUser = async (req, res, next) => {
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(req.body.password, salt)

    try {
        const duplicate = await User.findOne({ email: req.body.email })
        if (duplicate) {
            return next(ErrorHandler(409, 'Email already exists'))
        }

        const newUser = await User.create({
            ...req.body,
            password: hashedPassword,
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString()
        })

        // console.log(newUser.createdAt)
        newUser.createdAt = new Date(`${newUser.createdAt}`).toLocaleString()
        // console.log("2", newUser.createdAt)
        newUser.updatedAt = new Date(`${newUser.updatedAt}`).toLocaleString()
        await newUser.save()


        res.status(201).json({ data: newUser, msg: 'Successfully registered' })
    } catch (error) {
        next(error)
    }
}

export const loginController = async (req, res, next) => {

    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return next(ErrorHandler(404, 'Invalid credentials'))
        }

        const isMatch = bcrypt.compareSync(req.body.password, user.password)
        if (!isMatch) {
            return next(ErrorHandler(401, 'Invalid credentials'))
        }

        //accesstoken create
        const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_KEY, { expiresIn: '60m' })

        // res.setHeader('Authorization', 'Bearer ' + process.env.ACCESS_TOKEN_KEY)

        //refresh token create
        const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_KEY, { expiresIn: '7d' })

        res.cookie('token', refreshToken, { maxAge: 24 * 7 * 60 * 60 * 1000, httpOnly: true })
        const { password, ...other } = user._doc
        res.status(200).json({ status: 'success', msg: 'login successful', data: other, accessToken })

    } catch (error) {
        next(error)
    }
}

export const forgetPwdController = async (req, res, next) => {
    try {
        const { email } = req.body

        if (email) {
            const user = await User.findOne({ email: email }).exec() // left side is DB's email field, rhs is entered email

            //create a secret to generate the token
            const secret = user?._id + process.env.ACCESS_TOKEN_KEY

            //check if email is already registered
            if (user) {
                // generate a token for password reset
                const token = jwt.sign({ userID: user?._id }, secret, { expiresIn: '10m' })

                // create frontend link where user will be redirected
                const link = `http://localhost:3000/api/user/resetpassword/${user._id}/${token}`
                // console.log(link)

                // send email with defined transport object
                let info = await transporter.sendMail({
                    from: process.env.EMAIL_FROM, // sender address
                    to: user.email, // list of receivers
                    subject: "MERN Project - Password Reset Link", // Subject line
                    text: "Hello world?", // plain text body
                    html: `<a href=${link}>Click Here</a> to reset your password`, // html body
                });

                res.status(200).json({ status: "success", msg: "Email sent successfully", info })
            } else {
                res.status(400).json({ status: "error", msg: "Entered email is not registered" })
            }
        } else {
            res.status(400).json({ status: "error", msg: "please enter your email address" })
        }
    } catch (error) {
        next(error)
    }
}

export const resetPwdController = async (req, res, next) => {
    const {password, confirm_password} = req.body
    const {id, token} = req.params
    
    if(!password && !confirm_password){
        return res.status(400).json({status: "error", msg: "All fields are required"})
    }
    
    if(password !== confirm_password){
        return res.status(400).json({status: "error", msg: "Both the password and confirm_password should be matched"})
    }

    const user = await User.findById(id)
    const new_secret = user._id + process.env.ACCESS_TOKEN_KEY

    try {
        jwt.verify(token, new_secret)

        const salt = await bcrypt.genSalt(10)
        const newHashPassword = await bcrypt.hash(password, salt)

        await User.findByIdAndUpdate(user._id, {
            $set: {
                password: newHashPassword
            }
        })
        res.status(200).json({status: "success", msg: "Passowrd changed successfully"})
    } catch (error) {
        next(error)
    }
}


export const googleAuthController = async (req, res) => {
    console.log("oauth ", req)
    console.log("oauth :", res)
    try {
        
    } catch (error) {
        console.log(error)
    }
}