import { Dispatch } from 'react'

import { Action } from './Reducers'
import { CartProps } from './Cart'

export type CartItemProps = {
  item: CartProps
  cart: CartProps[]
  dispatch: Dispatch<Action>
}
