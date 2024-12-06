import { Base, OrderItem } from '@domain/entities'

export type Order = Base & {
  order: string
  status: string
  items: OrderItem[]
  customer: string
  observation: string
  user_id?: string
}
