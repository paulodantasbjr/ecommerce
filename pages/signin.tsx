import type { NextPage } from 'next'

import Head from 'next/head'
import Link from 'next/link'

const Signin: NextPage = () => {
  return (
    <>
      <Head>
        <title>Logar</title>
      </Head>
      <div className="flex min-h-screen items-center justify-center">
        <div className="mt-4 rounded  bg-white px-8 py-6 text-left shadow-lg dark:bg-gray-800">
          <h3 className="text-center text-2xl font-bold">
            Login to your account
          </h3>
          <form action="">
            <div className="mt-4">
              <div>
                <label className="block" htmlFor="email">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="mt-2 w-full rounded-md border bg-gray-200 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="password" className="block">
                  Senha
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="Senha"
                  className="mt-2 w-full rounded-md border bg-gray-200 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div className="flex items-baseline justify-between">
                <button className="mt-4 rounded-lg bg-sky-600 px-6 py-2 text-white hover:bg-sky-400">
                  Login
                </button>
                <Link href="/register">
                  <a className="text-sm text-sky-500 hover:text-sky-400 hover:underline">
                    Cadastrar-se
                  </a>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signin
