import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isadmin: { type: Boolean, default: false },
    isLeader: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export default mongoose.model('User', UserSchema)
