import { ACTIONS } from './Actions'

export const reducers = (
  state: any,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case ACTIONS.AUTH:
      return {
        ...state,
        auth: action.payload,
      }
    default:
      return state
  }
}
