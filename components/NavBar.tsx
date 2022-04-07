import { useContext, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { BiMenu, BiHome } from 'react-icons/bi'
import { FaSignInAlt } from 'react-icons/fa'
import { RiShoppingCartLine } from 'react-icons/ri'

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
      <div className="container mx-auto flex flex-wrap items-center md:justify-between">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          type="button"
          className="mr-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
        >
          <span className="sr-only">abrir menu</span>
          <BiMenu size={30} />
        </button>

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

        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } w-full items-center justify-between md:flex md:w-auto`}
        >
          <ul className="mt-4 flex flex-col md:mt-0 md:flex-row md:items-center md:space-x-8 md:text-sm md:font-medium">
            <li className={`${isActive('/')} navbar-menu__items `}>
              <Link href="/">
                <a className="flex items-center gap-1 md:flex-col">
                  <BiHome size={20} />
                  Inicio
                </a>
              </Link>
            </li>
            <li className={`${isActive('/cart')} navbar-menu__items `}>
              <Link href="/cart">
                <a className="relative flex items-center gap-1 md:flex-col">
                  <span className="absolute right-0 rounded-full bg-rose-500 px-2 py-1 text-xs text-white md:-top-1 md:-right-1">
                    {state.cart.length}
                  </span>
                  <RiShoppingCartLine size={20} />
                  Carrinho
                </a>
              </Link>
            </li>
            {!state.auth.token ? (
              <li className={`${isActive('/signin')} navbar-menu__items`}>
                <Link href="/signin">
                  <a className="flex items-center gap-1 md:flex-col">
                    <FaSignInAlt size={20} />
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
