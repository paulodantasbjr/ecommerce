export type CartProps = {
  _id: string
  title: string
  description: string
  price: number
  images: [{ url: string; public_id: string }]
  content: string
  category: string
  inStock: number
  sold: number
  quantity?: number
  checked: boolean
}
