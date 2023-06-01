import express from 'express'
import {
  getAllRequest,
  postRequest,
  getPrayerRequestRandomly,
} from '../controllers/request.js'

const router = express.Router()

// Post A Prayer Request
router.post('/submit', postRequest)

// Get all Prayer Request
router.get('/allprayers', getAllRequest)

// Get Randomly Prayer
router.get('/random', getPrayerRequestRandomly)

export default router
