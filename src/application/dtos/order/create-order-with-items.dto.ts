import { ErrorName, StatusCode } from '@common/enums'
import { InvalidBodyError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Field } from '@domain/enums'
import { IsStringValidator } from '@presentation/validators'

export class CreateOrderWithItemsDTO {
  items: any[]
  customer: string
  observation?: string

  constructor(
    items: any[],
    customer: string,
    field: Partial<{ observation: string }>
  ) {
    if (!items || !customer) {
      throw new HttpException(
        StatusCode.BadRequest,
        ErrorName.InvalidBody,
        InvalidBodyError()
      )
    }

    if (field.observation) {
      this.observation = IsStringValidator(field.observation, Field.Observation)
    }
    this.items = items
    this.customer = IsStringValidator(customer, Field.CustomerIdentifier)
  }
}
