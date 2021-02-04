import express from 'express'
import userRouter from './routes/user.router.js'
import indexRouter from './routes/index.router.js'
import tasksRouter from './routes/tasks.router.js'
import dotenv from 'dotenv'
dotenv.config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//routes
app.use('/', indexRouter)
app.use('/api/user', userRouter)
app.use('/api/tasks', tasksRouter)

app.listen(3000)

