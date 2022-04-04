import { createContext, useEffect, useReducer } from 'react'

import { toast } from 'react-toastify'

import { DataProviderProps, GlobalContextProps } from '../types/GlobalContext'
import { getData } from '../service'
import { reducers } from './Reducer'

export const GlobalContext = createContext({} as GlobalContextProps)

export const DataProvider = ({ children }: DataProviderProps) => {
  const initialState = { auth: { token: null, user: null } }
  const [state, dispatch] = useReducer(reducers, initialState)

  const fetchUser = async () => {
    const firstLogin = window.localStorage.getItem('firstLogin')
    if (firstLogin) {
      const result = await getData('auth/accessToken')

      if (result.success) {
        dispatch({
          type: 'AUTH',
          payload: {
            token: result.accessToken,
            user: result.user,
          },
        })
      }

      if (result.error) {
        toast.error(result.error, { autoClose: 3000, closeButton: true })
      }
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
}
