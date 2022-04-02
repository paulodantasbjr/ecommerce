import { ThemeToggle } from './ThemeToggle'
import Image from 'next/image'

export const User = ({ isUserMenuOpen, setIsUserMenuOpen }) => {
  return (
    <div className="relative flex items-center md:order-2">
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
          src="/default-user-image.png"
          alt="user photo"
        />
      </button>

      <div
        className={`${
          isUserMenuOpen ? 'block' : 'hidden'
        } absolute right-0 top-16 z-50 list-none divide-y divide-gray-100 rounded bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700 md:top-12`}
      >
        <div className="py-3 px-4">
          <span className="block text-sm text-gray-900 dark:text-white">
            Paulo Dantas
          </span>
          <span className="block truncate text-sm font-medium text-gray-500 dark:text-gray-400">
            paulorobertosjm@gmail.com
          </span>
        </div>
        <ul className="py-1">
          <li>
            <a
              href="#"
              className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Perfil
            </a>
          </li>
          <li>
            <ThemeToggle />
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Desconectar
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
