import { UpdateOrderDTO } from '@application/dtos/order'
import { StatusCode } from '@common/enums'
import { Order } from '@domain/entities'
import { UpdateOrderUseCase } from '@domain/usecases/order'
import { Controller } from '@presentation/protocols/controller'
import { ResponseHandler, HttpRequest } from '@presentation/protocols/http'

export class UpdateOrderController implements Controller<Order> {
  constructor(
    private readonly updateOrderUC: UpdateOrderUseCase,
    private readonly updateOrderPresenter: ResponseHandler<Order>
  ) {}
  async handle(request: HttpRequest) {
    const { id } = request.params
    const { items, observation, customer } = request.body
    const parameters: UpdateOrderDTO = Object.assign(
      new UpdateOrderDTO(id, items, observation, customer)
    )
    const order: Order = await this.updateOrderUC.execute(parameters)

    return this.updateOrderPresenter.response(order, StatusCode.Sucess)
  }
}
