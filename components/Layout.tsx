import { ToastContainer } from 'react-toastify'

import { NavBar } from './NavBar'

import { LayoutProps } from '../types/Layout'
import { useTheme } from 'next-themes'

export const Layout = ({ children }: LayoutProps) => {
  const { theme } = useTheme()
  return (
    <div className="container mx-auto ">
      <NavBar />
      {children}
      <ToastContainer
        position="bottom-center"
        theme={`${theme === 'dark' ? 'dark' : 'light'}`}
      />
    </div>
  )
}
