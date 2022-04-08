import { Dispatch, ReactNode } from 'react'

import { Action } from './Reducers'
import { AuthProps } from './Auth'
import { CartProps } from './Cart'

type GlobalStateProps = {
  auth: AuthProps
  cart: CartProps
  isMobile: Boolean
}

export type GlobalContextProps = {
  state: GlobalStateProps
  dispatch: Dispatch<Action>
}

export type DataProviderProps = {
  children: ReactNode
}
