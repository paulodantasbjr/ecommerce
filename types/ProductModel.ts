export type ProductModelProps = {
  _id: string
  title: string
  description: string
  price: number
  images: [{ url: string; public_id: string }]
  content: string
  category: string
  inStock: number
  sold: number
  checked: boolean
}
