import { Schema, model, models } from 'mongoose'

import { ProductModelProps } from '../types/ProductModel'

const productSchema = new Schema<ProductModelProps>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    images: {
      type: [{ url: String, public_id: String }],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    inStock: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const productModel =
  models.product || model<ProductModelProps>('product', productSchema)

export const Product = productModel
