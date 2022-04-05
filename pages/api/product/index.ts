import { NextApiRequest, NextApiResponse } from 'next'

import { Product } from '../../../models/ProductModel'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      await getProducts(req, res)
      break
    default:
      break
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse) => {
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
