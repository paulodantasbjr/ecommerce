import { sign } from 'jsonwebtoken'

import { userIdProps } from '../types/UserID'

export const createAccessToken = (userId: userIdProps) => {
  return sign(userId, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '15m' })
}

export const createRefreshToken = (userId: userIdProps) => {
  return sign(userId, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '7d' })
}
