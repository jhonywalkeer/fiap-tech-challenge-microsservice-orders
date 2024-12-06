import { CreateOrderWithItemsDTO } from '@application/dtos/order'
import { StatusCode } from '@common/enums'
import { Order } from '@domain/entities'
import { CreateOrderUseCase } from '@domain/usecases/order'
import { Controller } from '@presentation/protocols/controller'
import { ResponseHandler, HttpRequest } from '@presentation/protocols/http'

export class CreateOrderController implements Controller<Order> {
  constructor(
    private readonly createOrderUC: CreateOrderUseCase,
    private readonly createOrderPresenter: ResponseHandler<Order>
  ) {}
  async handle(request: HttpRequest) {
    const { items, customer, observation } = request.body
    const payload: CreateOrderWithItemsDTO = Object.assign(
      new CreateOrderWithItemsDTO(items, customer, { observation })
    )
    const order: Order = await this.createOrderUC.execute(payload)
    return this.createOrderPresenter.response(order, StatusCode.Created)
  }
}
