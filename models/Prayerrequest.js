import mongoose from 'mongoose'

const PrayerSchema = new mongoose.Schema(
  {
    name: { type: String, required: false },
    category: { type: String, required: true },
    d_request: { type: String, required: true, unique: true },
    user_id: { type: String, required: true },
  },
  { timestamps: true }
)

export default mongoose.model('Prayer_request', PrayerSchema)
