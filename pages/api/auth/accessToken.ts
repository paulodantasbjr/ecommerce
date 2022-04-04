import type { NextApiRequest, NextApiResponse } from 'next'

import { verify } from 'jsonwebtoken'

import { createAccessToken } from '../../../utils/generateToken'
import { connectDB } from '../../../utils/connectDB'
import { User } from '../../../models/userModel'
import { UserProps } from '../../../types/User'

connectDB()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const token = req.cookies.refreshToken
    if (!token) return res.status(400).json({ error: 'Por favor logue!' })

    const verifyUser = verify(
      token,
      process.env.REFRESH_TOKEN_SECRET!
    ) as UserProps

    if (!verifyUser)
      return res.status(400).json({
        error:
          'Seu token esta incorreto ou expirado, por favor logue novamente!',
      })

    const user = await User.findOne({ email: verifyUser.email })

    if (!user)
      return res
        .status(400)
        .json({ error: 'Usuario nao encontrado, por favor logue novamente' })

    const accessToken = createAccessToken({ email: user.email })

    res.json({
      success: 'Logado com sucesso',
      accessToken,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        root: user.root,
      },
    })
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}
