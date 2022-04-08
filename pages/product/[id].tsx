import { useContext, useState } from 'react'

import type { GetServerSideProps } from 'next'

import Head from 'next/head'
import Image from 'next/image'

import { FaCcPaypal } from 'react-icons/fa'
import { IoMdArrowBack } from 'react-icons/io'

import { addCart } from '../../utils/addCart'
import { GlobalContext } from '../../store/GlobalState'
import { getData } from '../../service'

import { Action } from '../../types/Reducers'
import { ProductItemProps } from '../../types/ProductItem'
import Link from 'next/link'

const DetailsProduct = ({ product }: ProductItemProps) => {
  const [productItem] = useState(product)
  const [tab, setTab] = useState(0)

  const { state, dispatch } = useContext(GlobalContext)

  const isActive = (index: number) => {
    return tab === index
      ? 'border-amber-500 dark:border-amber-100'
      : 'border-gray-300 dark:border-gray-700'
  }

  const handleCart = () => {
    const actionAddCart = addCart(productItem, state.cart) as Action

    dispatch({
      type: actionAddCart.type,
      payload: actionAddCart.payload,
    })
  }

  return (
    <>
      <Head>
        <title>{productItem.title}</title>
      </Head>
      <div className="grid grid-cols-1 p-2 md:grid-cols-2 md:p-8">
        {state.isMobile && (
          <div className="cursor-pointer p-2">
            <Link href={'/'}>
              <a>
                <IoMdArrowBack size={20} />
              </a>
            </Link>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <div className="relative h-96 w-full rounded-lg border-4 border-double border-amber-500 dark:border-amber-100">
            <Image
              src={product.images[tab].url}
              alt={product.title}
              layout="fill"
              objectFit="fill"
              objectPosition="top"
              priority
            />
          </div>

          <div className="flex gap-2">
            {product.images.map((image, index) => {
              return (
                <div
                  key={index}
                  className={`relative h-20 w-20 rounded-lg ${isActive(
                    index
                  )} border-4 border-double`}
                >
                  <Image
                    src={image.url}
                    layout="fill"
                    alt={image.url}
                    onClick={() => setTab(index)}
                    className="cursor-pointer rounded-lg"
                    priority
                  />
                </div>
              )
            })}
          </div>
        </div>
        <div className="flex flex-col gap-4 p-2 md:ml-8 md:p-0">
          <h2 className="block text-4xl uppercase">{product.title}</h2>

          <div className="mb-4 flex items-center justify-between">
            <div>
              <h5 className="text-4xl text-emerald-600">R$ {product.price}</h5>
              <p className="flex items-center gap-1 text-sm text-slate-400">
                <FaCcPaypal size={20} /> ou até 10x de R${' '}
                {(product.price / 10).toFixed(2)}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              {product.inStock > 0 ? (
                <p className="text-sm text-amber-600">{`Em estoque: ${product.inStock}`}</p>
              ) : (
                <p className="text-sm text-rose-500">Estoque</p>
              )}
              <p className="text-sm text-rose-500">Vendidos: {product.sold}</p>
            </div>
          </div>

          <p className="text-lg">{product.content}</p>

          <p className="text-justify text-sm text-gray-800 dark:text-gray-400">
            {product.description}
          </p>

          <div className=" flex justify-center">
            <button
              type="button"
              onClick={handleCart}
              className="mx-10 flex-1 rounded-lg bg-emerald-700 px-7 py-3 text-center text-sm font-medium text-white hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
            >
              Comprar agora
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id
  if (!id) return { props: { product: {} } }

  const res = await getData(`product/${id}`)

  return {
    props: {
      product: res.product,
    },
  }
}

export default DetailsProduct
