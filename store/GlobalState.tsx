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
    isMobile: false,
  }
  const [state, dispatch] = useReducer(reducers, initialState)

  const checkMobile = () => {
    if (window.innerWidth < 768) {
      dispatch({
        type: 'MOBILE',
        payload: true,
      })
    } else {
      dispatch({
        type: 'MOBILE',
        payload: false,
      })
    }
  }

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
        toast.error(result.error)
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

  useEffect(() => {
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
}
