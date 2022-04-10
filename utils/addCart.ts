import { toast } from 'react-toastify'

import { ACTIONS } from '../store/Actions'

import { CartProps } from '../types/Cart'
import { ProductModelProps } from '../types/ProductModel'

export const addCart = (product: ProductModelProps, cart: CartProps[]) => {
  if (product.inStock === 0) {
    return toast.error('Produto esgotado')
  }

  const check = cart.every((item) => {
    return item._id !== product._id
  })
  if (!check) {
    return toast.error('Produto ja foi adicionado ao carrinho')
  }

  toast.success('Produto adicionado ao carrinho')

  return { type: ACTIONS.CART, payload: [...cart, { ...product, quantity: 1 }] }
}
