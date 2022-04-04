import type { NextApiRequest, NextApiResponse } from 'next'

import { JwtPayload, verify } from 'jsonwebtoken'

import User from '../../../models/userModel'
import { connectDB } from '../../../utils/connectDB'
import { createAccessToken } from '../../../utils/generateToken'

connectDB()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const token = req.cookies.refreshtoken
    if (!token) return res.status(400).json({ error: 'Por favor logue!' })

    const verifyToken = verify(token, process.env.REFRESH_TOKEN_SECRET!)
    console.log(verifyToken)

    if (!verifyToken)
      return res.status(400).json({
        error:
          'Seu token esta incorreto ou expirado, por favor logue novamente!',
      })

    const user = await User.findById(verifyToken.id)
    if (!user)
      return res
        .status(400)
        .json({ error: 'Usuario nao encontrado, por favor logue novamente' })

    const accessToken = createAccessToken({ id: user._id })

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
