import Image from 'next/image'
import Link from 'next/link'

import { ProductItemProps } from '../types/ProductItem'

export const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Link href={`/product/${product._id}`} passHref>
      <div className="max-w-sm cursor-pointer rounded-lg bg-white shadow-md hover:shadow-xl dark:bg-gray-800 dark:shadow-md hover:dark:shadow-xl hover:dark:shadow-white/5">
        <Image
          src={product.images[0].url}
          alt={product.title}
          width={380}
          height={150}
          objectFit="cover"
          objectPosition="0 30%"
        />

        <div className="px-5 pb-5">
          <div className="flex items-center justify-between">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {product.title.toUpperCase()}
            </h5>
            {product.inStock > 0 ? (
              <span className="text-sm text-rose-500">
                Estoque: {product.inStock}
              </span>
            ) : (
              <span className="text-rose-500">Esgotado</span>
            )}
          </div>

          <p className="text-md my-4 h-28 text-ellipsis text-gray-400 ">
            {product.description.length > 100
              ? `${product.description.substring(0, 170)}...`
              : product.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-emerald-600">
              R$ {product.price}
            </span>

            <button className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Comprar
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
