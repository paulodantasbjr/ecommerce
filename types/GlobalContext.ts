import { Dispatch, ReactNode } from 'react'

import { Action } from './Reducers'
import { AuthProps } from './Auth'
import { CartProps } from './Cart'

type GlobalStateProps = {
  auth: AuthProps
  cart: CartProps
}

export type GlobalContextProps = {
  state: GlobalStateProps
  dispatch: Dispatch<Action>
}

export type DataProviderProps = {
  children: ReactNode
}
