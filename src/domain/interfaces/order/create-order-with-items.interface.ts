import { FindProductWithQuantity } from '../product'

export interface CreateOrderWithItems {
  items: FindProductWithQuantity[]
  customer: string
  observation?: string
  order_id?: string
}
