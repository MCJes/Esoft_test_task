import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import userRouter from './routes/user.router.js'
import indexRouter from './routes/index.router.js'
import tasksRouter from './routes/tasks.router.js'
dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//routes
app.use('/', indexRouter)
app.use('/api/user', userRouter)
app.use('/api/tasks', tasksRouter)

app.listen(3000)

