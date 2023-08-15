import dotenv from 'dotenv'
dotenv.config()
import nodemailer from 'nodemailer'

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

export default transporter