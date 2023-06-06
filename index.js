import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import userRoutes from './routes/users.js'
import authRoutes from './routes/auth.js'
import requestRoutes from './routes/request.js'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()
app.use(cors())

// Connect to mongodb using mongoose and called in app.listen below
const connect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log('Connected to DB!')
    })
    .catch((err) => {
      throw err
    })
}

app.use(cookieParser())
app.use(express.json())
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/request', requestRoutes)

app.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'Something went wrong'

  return res.status(status).json({
    success: false,
    status,
    message,
  })
})

app.listen(5000, () => {
  connect()
  console.log('Hello, Connected!')
})
