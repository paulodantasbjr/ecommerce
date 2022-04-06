import type { NextApiRequest, NextApiResponse } from 'next'

import { Product } from '../../../models/ProductModel'
import { connectDB } from '../../../utils/connectDB'

connectDB()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      await getProduct(req, res)
      break
    default:
      break
  }
}

const getProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query
    const product = await Product.findById(id)
    if (!product)
      return res.status(404).json({ error: 'Produto nao encontrado' })

    res.status(200).json({
      product,
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
