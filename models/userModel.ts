import { Schema, model, models } from 'mongoose'

import { UserModelProps } from '../types/UserModel'

const userSchema = new Schema<UserModelProps>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
    },
    root: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default:
        'https://res.cloudinary.com/jrw0w/image/upload/v1648834448/ecommerce/default-user-image_soucpq.png',
    },
  },
  {
    timestamps: true,
  }
)

const userModel = models.user || model<UserModelProps>('user', userSchema)

export const User = userModel
