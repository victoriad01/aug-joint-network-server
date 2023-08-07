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
const httpPort = 8080

app.use(cors())

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
const BASE_API_AND_APP_VERS = '/api/v1'

app.use(cookieParser())
app.use(express.json())

app.use(`${BASE_API_AND_APP_VERS}/users`, userRoutes)
app.use(`${BASE_API_AND_APP_VERS}/auth`, authRoutes)
app.use(`${BASE_API_AND_APP_VERS}/request`, requestRoutes)

app.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'Something went wrong'

  return res.status(status).json({
    success: false,
    status,
    message,
  })
})

app.listen(httpPort, () => {
  connect()
  console.log('Server Connected!')
})
