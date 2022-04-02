import { createContext, useReducer } from 'react'

import { reducers } from './Reducer'

import { GlobalContextProps } from '../types/GlobalContext'

export const GlobalContext = createContext({})

export const DataProvider = ({ children }: GlobalContextProps) => {
  const initialState = { notify: {}, auth: {} }
  const [state, dispatch] = useReducer(reducers, initialState)

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
}
