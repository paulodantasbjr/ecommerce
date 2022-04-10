import { Dispatch } from 'react'

import { Action } from './Reducers'
import { ProductModelProps } from './ProductModel'

export type CartItemProps = {
  item: ProductModelProps
  cart: ProductModelProps[]
  dispatch: Dispatch<Action>
}
