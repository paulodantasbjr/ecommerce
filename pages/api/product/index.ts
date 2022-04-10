import { NextApiRequest, NextApiResponse } from 'next'

import { connectDB } from '../../../utils/connectDB'
import { Product } from '../../../models/ProductModel'

connectDB()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      await getProducts(res)
      break
    default:
      break
  }
}

const getProducts = async (res: NextApiResponse) => {
  try {
    const products = await Product.find()

    res.status(200).json({
      result: products.length,
      products,
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
