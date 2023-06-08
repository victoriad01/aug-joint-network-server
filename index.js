import express from 'express'

import https from 'https'
import http from 'http'

import path from 'path'
import fs from 'fs'

import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import userRoutes from './routes/users.js'
import authRoutes from './routes/auth.js'
import requestRoutes from './routes/request.js'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()

// const httpPort = 80
const httpsPort = 3443

app.use(cors())

// Redirect all HTTP traffic to HTTPS
app.use((req, res, next) => {
  if (!req.secure) {
    return res.redirect(`https://${req.headers.host}${req.url}`)
  }
  next()
})

// Set up HTTPS options
const httpsOptions = {
  key: fs.readFileSync('./cert/key.pem'),
  cert: fs.readFileSync('./cert/cert.pem'),

  // cert: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
}

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

// app.listen(5000, () => {
//   connect()
//   console.log('Hello, Connected!')
// })

// Create and start the HTTP server
// const httpServer = http.createServer(app)
// httpServer.listen(httpPort, () => {
//   connect()
//   console.log(`HTTP server listening on port ${httpPort}`)
// })

// Create and start the HTTPS server
const httpsServer = https.createServer(httpsOptions, app)

httpsServer.listen(httpsPort, () => {
  connect()
  console.log(`HTTPS server listening on port ${httpsPort}`)
})
