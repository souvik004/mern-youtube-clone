import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/connectDb.js'
import mongoose from 'mongoose'
import authRouter from './routes/auth.js'
import userRouter from './routes/users.js'
import cookieParser from 'cookie-parser'
import videoRouter from './routes/videos.js'
import commentRouter from './routes/comments.js'
import passport from 'passport'
import session from 'express-session'
import './config/passport.js'
import googleRouter from './routes/googleAuth.js'
import cookieSession from 'cookie-session'
import helmet from 'helmet'
import morgan from 'morgan'
// import google from './config/google.js'

const app = express()
dotenv.config()
const port = process.env.PORT || 3500
console.log("from server, ", process.env.MONGO_URI)
connectDB()

// app.use(session({
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         secure: true,
//         maxAge: 1000 * 60 * 60 * 24
//     }
// }))

app.use(cookieSession({
    name:'session',
    keys: ['secret'],
    maxAge: 1000 * 60 * 60
}))

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}))
app.use(morgan('dev'))
app.use(helmet())

app.use(passport.initialize())
app.use(passport.session())

// googleAuth(passport)

app.use('/api/user', authRouter, userRouter)
app.use('/api/video', videoRouter)
app.use('/api/comment', commentRouter)
app.use('/auth', googleRouter)

app.get('/', (req, res) => {
    res.send('Hello, world!')
})

// googleRoute(app, passport)

//error handler middleware
app.use((err, req, res, next) => {
    const errStatus = err.status || 500
    const errMsg = err.message || 'Something went wrong'
    return res.status(errStatus).json({status: 'error', msg: errMsg, stack: err.stack})
})

mongoose.connection.on('open', () => {
    console.log("connected to DB")
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
})