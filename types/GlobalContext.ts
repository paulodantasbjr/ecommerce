import { Dispatch, ReactNode } from 'react'

type GlobalStateProps = {
  auth: {}
}

export type GlobalContextProps = {
  state: GlobalStateProps
  dispatch: Dispatch<any>
}

export type DataProviderProps = {
  children: ReactNode
}
