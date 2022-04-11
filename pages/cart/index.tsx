import { useContext, useEffect, useState } from 'react'

import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import { CartItem } from '../../components/CartItem'
import { GlobalContext } from '../../store/GlobalState'
import { getData } from '../../service'

import { ProductItemProps } from '../../types/ProductItem'

const Cart: NextPage = () => {
  const [total, setTotal] = useState(0)
  const { state, dispatch } = useContext(GlobalContext)

  useEffect(() => {
    const getTotal = () => {
      const res = state.cart.reduce((prev, item) => {
        return prev + item.price * item.quantity
      }, 0)
      setTotal(res)
    }
    getTotal()
  }, [state.cart])

  useEffect(() => {
    const cartLocal = JSON.parse(localStorage.getItem('__cart__eco__') || '')
    if (cartLocal) {
      let newArr: ProductItemProps[] = []
      const updateCart = async () => {
        for (const item of cartLocal) {
          const res = await getData(`product/${item._id}`)

          if (res.product.inStock > 0) {
            newArr.push({
              ...res.product,
              quantity: item.quantity > res.product.inStock ? 1 : item.quantity,
            })
          }
        }

        dispatch({ type: 'CART', payload: newArr })
      }

      updateCart()
    }
  }, [])

  if (state.cart.length === 0) {
    return (
      <div className="container flex h-screen items-center justify-center">
        <Image
          src="/empty-cart.png"
          alt="empty-cart"
          height={500}
          width={500}
        />
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Carrinho de compra</title>
      </Head>
      <div className="container mt-8 h-screen">
        <h1 className="px-1 text-4xl text-gray-700 dark:text-gray-300 md:px-0">
          Lista de compras
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div>
            {state.cart.map((item) => {
              return (
                <CartItem
                  item={item}
                  key={item._id}
                  cart={state.cart}
                  dispatch={dispatch}
                />
              )
            })}
          </div>
          <div>
            <h3>
              Total: <span>{total}</span>
            </h3>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
