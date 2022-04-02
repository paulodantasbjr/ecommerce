import { ACTIONS } from './Actions'

export const reducers = (state, action) => {
  switch (action.type) {
    case ACTIONS.NOTIFY:
      return {
        ...state,
        notify: action.payload,
      }
    case ACTIONS.AUTH:
      return {
        ...state,
        auth: action.payload,
      }
    default:
      return state
  }
}
