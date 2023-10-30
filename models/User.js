import { Schema, model } from 'mongoose'

const UserSchema = new Schema(
  {
    fullName: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
      unique: true,
    },
    passwordHash: {
      required: true,
      type: String,
    },
    iconUrl: String,
  },
  {
    timestamps: true,
  }
)

export default model('User', UserSchema)
