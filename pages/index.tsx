import { useState } from 'react'

import type { NextPage, GetServerSideProps } from 'next'

import Head from 'next/head'

import { getData } from '../service'
import { ProductItem } from '../components/ProductItem'

import { ProductsProps } from '../types/Products'

const Home: NextPage<ProductsProps> = ({ products, result }: ProductsProps) => {
  const [productsItems, setProductsItems] = useState(products)

  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <div className="flex flex-col items-center">
        <div>Filtro</div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {result < 1 ? (
            <h2>Sem produtos</h2>
          ) : (
            productsItems.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))
          )}
        </div>
        <div>botao de mais</div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await getData('product')

  return {
    props: {
      products: res.products,
      result: res.result,
    },
  }
}

export default Home
