import { CartProps } from '../types/Cart'

export const decrease = (data: CartProps[], id: string) => {
  const newData = [...data]
  newData.forEach((item) => {
    if (item._id === id) {
      item.quantity--
    }
  })
  return {
    type: 'CART',
    payload: newData,
  }
}
