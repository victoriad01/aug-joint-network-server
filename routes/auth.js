import express from 'express'
import { signUp, signIn } from '../controllers/auth.js'

const router = express.Router()

// Sign Up
router.post('/signup', signUp)

// Sign In
router.post('/signin', signIn)

export default router
