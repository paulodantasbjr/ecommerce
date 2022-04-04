import { useContext, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { BiMenu } from 'react-icons/bi'

import { GlobalContext } from '../store/GlobalState'
import { LoggedUser } from './LoggedUser'

export const NavBar = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const router = useRouter()
  const { state } = useContext(GlobalContext)

  const isActive = (path: string) => {
    if (router.pathname === path) {
      return 'text-blue-700 dark:text-sky-500'
    } else {
      return 'text-gray-700 dark:text-gray-400'
    }
  }

  return (
    <nav className="rounded border-gray-200 bg-white px-2 py-2.5 dark:bg-gray-800 sm:px-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link href="/">
          <a className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              height={30}
              width={30}
              alt="ecommerce Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              e-Commerce
            </span>
          </a>
        </Link>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          type="button"
          className="ml-1 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
        >
          <span className="sr-only">abrir menu</span>
          <BiMenu size={30} />
        </button>
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } w-full items-center justify-between md:order-1 md:flex md:w-auto`}
        >
          <ul className="mt-4 flex flex-col md:mt-0 md:flex-row md:items-center md:space-x-8 md:text-sm md:font-medium">
            <li>
              <Link href="/">
                <a className={`${isActive('/')} navbar-menu__items `}>Inicio</a>
              </Link>
            </li>
            <li>
              <Link href="/cart">
                <a className={`${isActive('/cart')} navbar-menu__items `}>
                  Carrinho
                </a>
              </Link>
            </li>
            {Object.keys(state.auth).length === 0 ? (
              <li>
                <Link href="/signin">
                  <a className={`${isActive('/signin')} navbar-menu__items`}>
                    Entrar
                  </a>
                </Link>
              </li>
            ) : (
              <LoggedUser
                isUserMenuOpen={isUserMenuOpen}
                setIsUserMenuOpen={setIsUserMenuOpen}
                auth={state.auth}
                isActive={isActive}
              />
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
