import { IdentifierDTO } from '@application/dtos/common'
import { CreateOrderItemDTO } from '@application/dtos/order-item'

export class UpdateOrderDTO extends IdentifierDTO {
  items: CreateOrderItemDTO[]
  customer?: string
  observation?: string

  constructor(
    id: string,
    items: CreateOrderItemDTO[],
    observation?: string,
    customer?: string
  ) {
    super(id)
    this.items = items
    this.observation = observation
    this.customer = customer
  }
}
