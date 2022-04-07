import { createContext, useEffect, useReducer } from 'react'

import { toast } from 'react-toastify'

import { getData } from '../service'
import { reducers } from './Reducer'

import { DataProviderProps, GlobalContextProps } from '../types/GlobalContext'

export const GlobalContext = createContext({} as GlobalContextProps)

export const DataProvider = ({ children }: DataProviderProps) => {
  const initialState = {
    auth: {},
    cart: [],
  }
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
        toast.error(result.error, { autoClose: 1000, closeButton: true })
      }
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  useEffect(() => {
    const __cart__eco = JSON.parse(
      window.localStorage.getItem('__cart__eco__') || '[]'
    )
    if (__cart__eco.length > 0) {
      dispatch({
        type: 'CART',
        payload: __cart__eco,
      })
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('__cart__eco__', JSON.stringify(state.cart))
  }, [state.cart])

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
}
