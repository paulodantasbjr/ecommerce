import type { NextPage } from 'next'
import Image from 'next/image'
import { useContext } from 'react'
import { CartItem } from '../../components/CartItem'
import { GlobalContext } from '../../store/GlobalState'

const Cart: NextPage = () => {
  const { state, dispatch } = useContext(GlobalContext)

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
        <div> teste</div>
      </div>
    </div>
  )
}

export default Cart
