import { createContext, Dispatch, useEffect, useReducer } from 'react'

import { toast } from 'react-toastify'

import { reducers } from './Reducer'
import { GlobalContextProps, GlobalStateProps } from '../types/GlobalContext'
import { getData } from '../service'

const initialState = { auth: {} }

export const GlobalContext = createContext<{
  state: GlobalStateProps
  dispatch: Dispatch<any>
}>({
  state: initialState,
  dispatch: () => {},
})

export const DataProvider = ({ children }: GlobalContextProps) => {
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
        toast.error(result.error)
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
