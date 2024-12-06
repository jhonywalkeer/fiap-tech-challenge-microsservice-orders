import { FindOrderByIdDTO } from '@application/dtos/order'
import { StatusCode } from '@common/enums'
import { Order } from '@domain/entities'
import { FindOrderByIdUseCase } from '@domain/usecases/order'
import { Controller } from '@presentation/protocols/controller'
import { ResponseHandler, HttpRequest } from '@presentation/protocols/http'

export class FindOrderByIdController implements Controller<Order> {
  constructor(
    private readonly findOrderByIdUC: FindOrderByIdUseCase,
    private readonly findOrderByIdPresenter: ResponseHandler<Order>
  ) {}
  async handle(request: HttpRequest) {
    const { id } = request.params
    const parameters: FindOrderByIdDTO = Object.assign(new FindOrderByIdDTO(id))
    const order: Order = await this.findOrderByIdUC.execute(parameters)

    return this.findOrderByIdPresenter.response(order, StatusCode.Sucess)
  }
}
