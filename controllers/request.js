import Prayer_request from '../models/Prayerrequest.js'
import { createError } from '../error.js'

export const postRequest = async (req, res, next) => {
  try {
    const newPrayerRequest = new Prayer_request(req.body)
    // saving the user to db
    await newPrayerRequest.save()
    res.status(200).json('Prayer requested has been submitted!')
  } catch (error) {
    next(error)
  }
}

// Get all Prayer requests
export const getAllRequest = async (req, res, next) => {
  try {
    const allPrayerRequest = await Prayer_request.find({})
    res.status(200).json(allPrayerRequest)
  } catch (error) {
    next(error)
  }
}

// Get Prayer requests by category
export const getPrayerRequestRandomly = async (req, res, next) => {
  try {
    // const countTotal = await Prayer_request.countDocuments()
    const allPrayers = await Prayer_request.find()
    const item = Math.floor(Math.random() * (allPrayers.length + 1))
    const randomPrayer = allPrayers[item]

    res.status(200).json(randomPrayer.d_request)
  } catch (error) {
    next(error)
  }
}

// Get A Prayer Requests Randomly
// export const getRequestByCategory = async (req, res, next) => {
//   try {
//     // const allPrayerRequest = await Prayer_request.find({})
//     // res.status(200).json(allPrayerRequest)
//   } catch (error) {
//     next(error)
//   }
// }
