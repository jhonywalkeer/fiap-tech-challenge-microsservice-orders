import { Base, Category } from '@domain/entities'

export type Product = Base & {
  name: string
  description: string
  category: Category
  price: number
  size: string
}
