import { NavBar } from './NavBar'

import { LayoutProps } from '../types/Layout'

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  )
}
