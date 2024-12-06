import { FindUserByConditionDTO } from '@application/dtos/user'
import { Field } from '@domain/enums'
import { IsStringValidator } from '@presentation/validators'

export class CreateOrderDTO {
  order: string
  status: string
  customer: FindUserByConditionDTO
  payment: string
  observation: string

  constructor(
    order: string,
    status: string,
    customer: FindUserByConditionDTO,
    payment: string,
    observation: string
  ) {
    this.order = IsStringValidator(order, Field.OrderIdentifier)
    this.status = IsStringValidator(status, Field.Status)
    this.customer = customer
    this.payment = IsStringValidator(payment, Field.Payment)
    this.observation = observation
  }
}
