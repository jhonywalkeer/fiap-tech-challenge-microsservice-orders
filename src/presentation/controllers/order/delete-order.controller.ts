import { DeleteOrderDTO } from '@application/dtos/order'
import { StatusCode } from '@common/enums'
import { DeleteOrderUseCase } from '@domain/usecases/order'
import { Controller } from '@presentation/protocols/controller'
import { ResponseHandler, HttpRequest } from '@presentation/protocols/http'

export class DeleteOrderController implements Controller<void> {
  constructor(
    private readonly deleteOrderUC: DeleteOrderUseCase,
    private readonly deleteOrderPresenter: ResponseHandler<void>
  ) {}
  async handle(request: HttpRequest) {
    const { id } = request.params
    const payload: DeleteOrderDTO = Object.assign(new DeleteOrderDTO(id))

    const product: void = await this.deleteOrderUC.execute(payload)
    Promise.resolve(product)

    return this.deleteOrderPresenter.response(product, StatusCode.Accepted)
  }
}
