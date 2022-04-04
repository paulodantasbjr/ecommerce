import { ChangeEvent, FormEvent, useContext, useEffect } from 'react'
import { useState } from 'react'

import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

import { toast } from 'react-toastify'

import { valid } from '../utils/validFields'
import { postData } from '../service'

import { UserRegisterProps } from '../types/UserRegister'
import { GlobalContext } from '../store/GlobalState'

const Register: NextPage = () => {
  const initialState = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  }
  const [userData, setUserData] = useState<UserRegisterProps>(initialState)
  const { state } = useContext(GlobalContext)
  const router = useRouter()

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const errMsg = valid(
      userData.email,
      userData.password,
      userData.name,
      userData.passwordConfirm
    )
    if (errMsg) return toast.error(errMsg)

    const id = toast.loading('Carregando...')
    const result = await postData('auth/register', userData)

    if (result.success) {
      toast.update(id, {
        render: result.success,
        type: 'success',
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      })
      router.push('/signin')
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
        <title>Register</title>
      </Head>
      <div className="flex min-h-screen items-center justify-center">
        <div className="mt-4 rounded  bg-white px-8 py-6 text-left shadow-lg dark:bg-gray-800">
          <h3 className="text-center text-2xl font-bold">
            Login to your account
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <div>
                <label className="block" htmlFor="name">
                  Nome
                </label>
                <input
                  name="name"
                  type="text"
                  value={userData.name}
                  onChange={handleChangeInput}
                  className="mt-2 w-full rounded-md border bg-gray-200 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block" htmlFor="email">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={userData.email}
                  onChange={handleChangeInput}
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
                  value={userData.password}
                  onChange={handleChangeInput}
                  className="mt-2 w-full rounded-md border bg-gray-200 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="passwordConfirm" className="block">
                  Confirmar senha
                </label>
                <input
                  name="passwordConfirm"
                  type="password"
                  value={userData.passwordConfirm}
                  onChange={handleChangeInput}
                  className="mt-2 w-full rounded-md border bg-gray-200 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div className="flex items-baseline justify-between">
                <button
                  type="submit"
                  className="mt-4 rounded-lg bg-sky-600 px-6 py-2 text-white hover:bg-sky-400"
                >
                  Login
                </button>
                <Link href="/signin">
                  <a className="text-sm text-sky-500 hover:text-sky-400 hover:underline">
                    Signin
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

export default Register
