import type { NextPage } from 'next'

import { useTheme } from 'next-themes'

const Home: NextPage = () => {
  const { theme, setTheme } = useTheme()
  return (
    <div>
      <h1>ecommerce project</h1>
    </div>
  )
}

export default Home
