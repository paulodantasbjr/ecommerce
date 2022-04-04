import { Dispatch, ReactNode } from 'react'
import { AuthProps } from './Auth'

type GlobalStateProps = {
  auth: AuthProps
}

export type GlobalContextProps = {
  state: GlobalStateProps
  dispatch: Dispatch<any>
}

export type DataProviderProps = {
  children: ReactNode
}
