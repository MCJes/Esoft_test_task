import express from 'express'
import dotenv from 'dotenv'
// import cors from 'cors'
import path from 'path'
import userRouter from './routes/user.router.js'
import tasksRouter from './routes/tasks.router.js'
dotenv.config()
const app = express()

const __dirname = path.resolve()

const PORT = process.env.PORT || 3000

// app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//routes
app.use('/api/user', userRouter)
app.use('/api/tasks', tasksRouter)

if(process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'dist')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  })
}



app.listen(PORT)

