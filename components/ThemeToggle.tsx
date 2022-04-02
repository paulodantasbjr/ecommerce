import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

import { BiMoon, BiSun } from 'react-icons/bi'

export const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className=" flex items-center justify-around divide-x divide-gray-200 ">
      <button
        className={`${
          theme === 'light' && 'bg-gray-100 text-amber-300'
        } flex w-full items-center justify-center py-2 px-4 text-sm hover:bg-gray-100  dark:hover:bg-gray-600 `}
        onClick={() => setTheme('light')}
      >
        <BiSun size={30} />
      </button>
      <button
        className={`${
          theme === 'dark' && 'bg-gray-600 text-sky-600'
        } flex w-full items-center justify-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 `}
        onClick={() => setTheme('dark')}
      >
        <BiMoon size={30} />
      </button>
    </div>
  )
}
