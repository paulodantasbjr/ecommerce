import { useTheme } from 'next-themes'

import { ToastContainer } from 'react-toastify'

import { NavBar } from './NavBar'

import { LayoutProps } from '../types/Layout'

export const Layout = ({ children }: LayoutProps) => {
  const { theme } = useTheme()

  return (
    <div className="container mx-auto flex h-screen flex-col">
      <NavBar />
      {children}
      <ToastContainer
        position="bottom-center"
        theme={`${theme === 'dark' ? 'dark' : 'light'}`}
        pauseOnHover={false}
        autoClose={1000}
        closeButton={true}
      />
    </div>
  )
}
