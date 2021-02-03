import express from 'express'
import userRouter from './routes/user.router.js'
import indexRouter from './routes/index.router.js'
import dotenv from 'dotenv'
dotenv.config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//routes
app.use('/api/', indexRouter)
app.use('/api/user', userRouter)

app.listen(3000)

