import type { NextPage } from 'next'

import { useTheme } from 'next-themes'

const Home: NextPage = () => {
  const { theme, setTheme } = useTheme()
  return (
    <div>
      <h1>ecommerce project</h1>
      <button
        className="bg-black p-2 text-white dark:bg-white dark:text-black"
        onClick={() => setTheme('dark')}
      >
        teste
      </button>
    </div>
  )
}

export default Home
