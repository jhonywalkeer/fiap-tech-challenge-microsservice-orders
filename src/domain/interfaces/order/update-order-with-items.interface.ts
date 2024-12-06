import { Identifier } from '@common/interfaces'
import { CreateOrderWithItems } from '@domain/interfaces/order'

export interface UpdateOrderWithItems extends Identifier {
  items?: CreateOrderWithItems['items']
  customer?: CreateOrderWithItems['customer']
  observation?: CreateOrderWithItems['observation']
}
