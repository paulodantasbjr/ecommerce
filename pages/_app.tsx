import 'react-toastify/dist/ReactToastify.css'

import type { AppProps } from 'next/app'
import '../styles/globals.css'

import { ThemeProvider } from 'next-themes'

import { Layout } from '../components/Layout'
import { DataProvider } from '../store/GlobalState'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <DataProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DataProvider>
    </ThemeProvider>
  )
}

export default MyApp
