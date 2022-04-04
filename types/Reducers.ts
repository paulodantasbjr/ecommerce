import { AuthProps } from './Auth'

export type Action = {
  type: string
  payload?: AuthProps | any
}

export type State = {
  auth: AuthProps
}
