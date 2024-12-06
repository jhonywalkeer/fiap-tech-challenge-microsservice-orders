import { LimitDefault, PageDefault } from '@common/constants'
import { Ordenation } from '@common/enums/ordenation.enum'
import { Field } from '@domain/enums'
import { IsEnumValidator } from '@presentation/validators'

export class PaginateDTO {
  page: number
  limit: number
  sort?: string
  order?: string

  constructor(
    page: number = PageDefault,
    limit: number = LimitDefault,
    sort?: string,
    order?: string
  ) {
    this.page = Number(page)
    this.limit = Number(limit)
    this.sort = sort
    this.order = order
      ? IsEnumValidator(order, Ordenation, Field.Order)
      : Ordenation.ASC
  }
}
