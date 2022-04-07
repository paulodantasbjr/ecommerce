import { ACTIONS } from '../store/Actions'
import { toast } from 'react-toastify'

import { CartProps } from '../types/Cart'
import { ProductModelProps } from '../types/ProductModel'

export const addCart = (product: ProductModelProps, cart: CartProps) => {
  if (product.inStock === 0) {
    return toast.error('Produto esgotado', {
      autoClose: 1000,
      closeButton: true,
    })
  }

  const check = cart.every((item) => {
    return item._id !== product._id
  })
  if (!check) {
    return toast.error('Produto ja foi adicionado ao carrinho', {
      autoClose: 1000,
      closeButton: true,
    })
  }

  return { type: ACTIONS.CART, payload: [...cart, { ...product, quantity: 1 }] }
}
