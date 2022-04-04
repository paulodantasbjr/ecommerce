import { useContext, useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'

import Cookie from 'js-cookie'
import { toast } from 'react-toastify'

import { GlobalContext } from '../store/GlobalState'
import { ThemeToggle } from './ThemeToggle'

import { BiLogOutCircle } from 'react-icons/bi'

import { LoggedUserProps } from '../types/LoggedUser'

export const LoggedUser = ({
  isUserMenuOpen,
  setIsUserMenuOpen,
  auth,
  isActive,
}: LoggedUserProps) => {
  const [isMobile, setIsMobile] = useState(false)

  const { dispatch } = useContext(GlobalContext)

  const checkMobile = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  const handleLogout = () => {
    Cookie.remove('refreshToken', { path: 'api/auth/accessToken' })
    localStorage.removeItem('firstLogin')
    dispatch({ type: 'AUTH', payload: {} })
    toast.success('Desconectado realizado com sucesso!', {
      autoClose: 1000,
      closeButton: true,
    })
    return Router.push('/')
  }

  useEffect(() => {
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="relative flex items-center">
      {isMobile ? (
        <Link href="#">
          <a
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className={`${isActive(
              '/profile'
            )} navbar-menu__items block w-full`}
          >
            Perfil
          </a>
        </Link>
      ) : (
        <button
          type="button"
          className="mr-3 flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 md:mr-0"
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        >
          <span className="sr-only">abrir menu usuario</span>
          <Image
            height={30}
            width={30}
            className="rounded-full"
            src={auth.user.avatar}
            alt={auth.user.name}
          />
        </button>
      )}

      <div
        className={`${
          isUserMenuOpen ? 'block' : 'hidden'
        } absolute right-0 top-16 z-50 min-w-[15rem] max-w-xs list-none divide-y divide-gray-100 rounded bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700 md:top-12`}
      >
        <div className="py-2 px-4">
          <span className="block truncate text-sm text-gray-900 dark:text-white">
            {auth.user.name}
          </span>
          <span className="block truncate text-sm font-medium text-gray-500 dark:text-gray-400">
            {auth.user.email}
          </span>
        </div>
        <ul className="flex flex-col gap-1">
          <li>
            <Link href="/profile">
              <a
                className={`navbar-logged--user__sub-items ${isActive(
                  '/profile'
                )} `}
              >
                Perfil
              </a>
            </Link>
          </li>
          <li>
            <ThemeToggle />
          </li>
          <li>
            <a
              onClick={handleLogout}
              className="navbar-logged--user__sub-items flex w-full justify-center hover:text-rose-600 hover:dark:text-rose-600"
            >
              <BiLogOutCircle size={30} />
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
