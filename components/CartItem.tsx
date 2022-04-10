import Image from 'next/image'
import Link from 'next/link'

import { FaTrashAlt } from 'react-icons/fa'

import { decrease } from '../utils/decrease'
import { increase } from '../utils/increase'

import { CartItemProps } from '../types/CartItem'

export const CartItem = ({ cart, dispatch, item }: CartItemProps) => {
  const handleIncrease = () => {
    dispatch(increase(cart, item._id))
  }

  const handleDecrease = () => {
    dispatch(decrease(cart, item._id))
  }

  return (
    <div className="mt-4 flex items-center border-t border-gray-400 p-2">
      <div className="relative flex flex-[3] gap-2">
        <Image
          src={item.images[0].url}
          alt={item.title}
          width={100}
          height={100}
        />

        <div className="flex flex-col">
          <Link href={`/product/${item._id}`}>
            <a>
              <h5 className=" text-sm capitalize hover:underline md:text-xl">
                {item.title}
              </h5>
            </a>
          </Link>
          <h6 className="text-lg text-emerald-500">
            R$ {item.quantity * item.price}
          </h6>
          {item.inStock > 0 ? (
            <p className="text-lg text-amber-500">Estoque: {item.inStock}</p>
          ) : (
            <p className="text-sm text-rose-500">Esgotado</p>
          )}
        </div>
      </div>
      <div className="mr-4 flex flex-1 items-center justify-center ">
        <button
          onClick={handleDecrease}
          type="button"
          className="rounded-full border border-gray-200 bg-white py-1 px-3 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
        >
          -
        </button>
        <span className="mx-2"> {item.quantity} </span>
        <button
          onClick={handleIncrease}
          type="button"
          className="rounded-full border border-gray-200 bg-white py-1 px-3 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
        >
          +
        </button>
      </div>
      <div className="flex items-center justify-center ">
        <button type="button">
          <FaTrashAlt size={20} className="text-rose-500" />
        </button>
      </div>
    </div>
  )
}
