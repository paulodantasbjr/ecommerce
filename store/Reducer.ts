import { ACTIONS } from './Actions'

import { Action, State } from '../types/Reducers'

export const reducers = (state: State, action: Action) => {
  switch (action.type) {
    case ACTIONS.AUTH:
      return {
        ...state,
        auth: action.payload,
      }
    case ACTIONS.CART:
      return {
        ...state,
        cart: action.payload,
      }
    default:
      return state
  }
}
