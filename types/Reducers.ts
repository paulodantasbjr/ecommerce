import { AuthProps } from './Auth'
import { CartProps } from './Cart'

export type Action = {
  type: string
  payload: AuthProps | CartProps | any
}

export type State = {
  auth: AuthProps
  cart: CartProps
}
