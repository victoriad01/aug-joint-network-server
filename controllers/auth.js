import Users from '../models/Users.js'
import bcrypt from 'bcryptjs'
import { createError } from '../error.js'
import jwt from 'jsonwebtoken'

export const signUp = async (req, res, next) => {
  try {
    // hashing password
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)
    const newUser = new Users({ ...req.body, password: hash })
    // saving the user to db
    await newUser.save()
    res.status(200).json(req.body.name + 'was created as a user!')
  } catch (error) {
    next(error)
  }
}

export const signIn = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      email: req.body.email,
    })
    if (!user) {
      return next(createError(404, 'User not found!'))
    } else {
      const isCorrectPassword = await bcrypt.compare(
        req.body.password,
        user.password
      )
      if (!isCorrectPassword) {
        return next(createError(401, 'Wrong Password!'))
      } else {
        const token = jwt.sign({ id: user._id }, process.env.JWT)
        const { password, ...others } = user._doc
        res
          .cookie('access_token', token, {
            httpOnly: true,
          })
          .status(200)
          .json(others)
      }
    }
  } catch (error) {
    next(error)
  }
}
