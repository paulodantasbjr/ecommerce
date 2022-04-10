import { useContext } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { addCart } from '../utils/addCart'
import { GlobalContext } from '../store/GlobalState'

import { Action } from '../types/Reducers'
import { ProductItemProps } from '../types/ProductItem'

export const ProductItem = ({ product }: ProductItemProps) => {
  const { state, dispatch } = useContext(GlobalContext)

  const handleCart = () => {
    const actionAddCart = addCart(product, state.cart) as Action

    dispatch({
      type: actionAddCart.type,
      payload: actionAddCart.payload,
    })
  }

  return (
    <div className="max-w-sm rounded-lg bg-white shadow-md hover:shadow-xl dark:bg-gray-800 dark:shadow-md hover:dark:shadow-xl hover:dark:shadow-white/5">
      <Image
        src={product.images[0].url}
        alt={product.title}
        width={380}
        height={150}
        objectFit="cover"
        objectPosition="0 30%"
      />

      <div className="px-5 pb-5">
        <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {product.title.toUpperCase()}
        </h5>

        <div className="flex items-center justify-between">
          <span className="text-4xl font-bold text-emerald-600">
            R$ {product.price.toFixed(2)}
          </span>
          <div className="flex flex-col gap-1">
            {product.inStock > 0 ? (
              <span className="text-sm text-amber-500">
                Estoque: {product.inStock}
              </span>
            ) : (
              <span className="text-sm text-rose-500">Esgotado</span>
            )}
            <span className="text-sm text-rose-500">
              Vendidos: {product.sold}
            </span>
          </div>
        </div>

        <p className="text-md my-3 h-28 text-ellipsis text-gray-400 ">
          {product.description.length > 100
            ? `${product.description.substring(0, 170)}...`
            : product.description}
        </p>

        <div className="flex items-center justify-around gap-5">
          <Link href={`/product/${product._id}`}>
            <a className="flex-1 rounded-lg bg-slate-700 px-7 py-3 text-center text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800">
              Ver
            </a>
          </Link>
          <button
            onClick={handleCart}
            className="flex-1 rounded-lg bg-emerald-700 px-7 py-3 text-center text-sm font-medium text-white hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  )
}
