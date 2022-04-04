import { useContext, useState, useEffect } from 'react'

import type { NextPage } from 'next'

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Cookie from 'js-cookie'
import { toast } from 'react-toastify'

import { GlobalContext } from '../store/GlobalState'
import { postData } from '../service'

const Signin: NextPage = () => {
  const initialState = { email: '', password: '' }
  const [userData, setUserData] = useState(initialState)

  const router = useRouter()

  const { state, dispatch } = useContext(GlobalContext)

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const id = toast.loading('Carregando...')
    const result = await postData('auth/login', userData)

    if (result.success) {
      toast.update(id, {
        render: result.success,
        type: 'success',
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      })
      Cookie.set('refreshToken', result.refreshToken, {
        path: 'api/auth/accessToken',
        expires: 7,
      })

      dispatch({
        type: 'AUTH',
        payload: {
          token: result.accessToken,
          user: result.user,
        },
      })

      window.localStorage.setItem('firstLogin', 'true')
    }

    if (result.error) {
      toast.update(id, {
        render: result.error,
        type: 'error',
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      })
    }
  }
  useEffect(() => {
    if (Object.keys(state.auth).length !== 0) {
      router.push('/')
    }
  }, [router, state.auth])

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
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <div>
                <label className="block" htmlFor="email">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={userData.email}
                  onChange={handleChangeInput}
                  placeholder="Email"
                  className="auth-input"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="password" className="block">
                  Senha
                </label>
                <input
                  name="password"
                  type="password"
                  value={userData.password}
                  onChange={handleChangeInput}
                  placeholder="Senha"
                  className="auth-input"
                />
              </div>
              <div className="flex items-baseline justify-between">
                <button type="submit" className="auth-button">
                  Login
                </button>
                <Link href="/register">
                  <a className="auth-link--page">Cadastrar-se</a>
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
