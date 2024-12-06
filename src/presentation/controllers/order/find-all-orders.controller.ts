import { FindAllOrdersDTO } from '@application/dtos/order'
import { StatusCode } from '@common/enums'
import { PaginateResponse } from '@common/types'
import { Order } from '@domain/entities'
import { FindAllOrdersUseCase } from '@domain/usecases/order'
import { Controller } from '@presentation/protocols/controller'
import { ResponseHandler, HttpRequest } from '@presentation/protocols/http'

export class FindAllOrdersController
  implements Controller<PaginateResponse<Order>>
{
  constructor(
    private readonly findAllOrdersUC: FindAllOrdersUseCase,
    private readonly findAllOrdersPresenter: ResponseHandler<
      PaginateResponse<Order>
    >
  ) {}
  async handle(request: HttpRequest) {
    const { query } = request
    const orders = await this.findAllOrdersUC.execute(
      Object.assign(new FindAllOrdersDTO(query.page, query.limit))
    )

    return this.findAllOrdersPresenter.response(orders, StatusCode.Sucess)
  }
}
