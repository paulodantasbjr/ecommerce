import { AuthProps } from './Auth'

export type LoggedUserProps = {
  isActive: (path: string) => string
  isUserMenuOpen: boolean
  setIsUserMenuOpen: (isUserMenuOpen: boolean) => void
  auth: AuthProps
}
