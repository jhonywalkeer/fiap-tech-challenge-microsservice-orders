import { FindAllOrdersUC } from '@application/usecases/order'
import { Order } from '@domain/entities'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindAllOrdersPrismaRepository } from '@infrastructure/persistence/database/repositories/order'
import { FindOrderItemByConditionPrismaRepository } from '@infrastructure/persistence/database/repositories/order-item'
import { FindPaymentByConditionPrismaRepository } from '@infrastructure/persistence/database/repositories/payment'
import { FindProductByConditionPrismaRepository } from '@infrastructure/persistence/database/repositories/product'
import { FindAllOrdersController } from '@presentation/controllers/order'
import { HttpGenericResponse } from '@presentation/protocols/http'

export const FindAllOrdersControllerFactory = () => {
  const databaseConnection = new DatabaseConnection()
  const paymentRepository = new FindPaymentByConditionPrismaRepository(
    databaseConnection
  )
  const orderItemRepository = new FindOrderItemByConditionPrismaRepository(
    databaseConnection
  )
  const productRepository = new FindProductByConditionPrismaRepository(
    databaseConnection
  )
  const orderRepository = new FindAllOrdersPrismaRepository(
    databaseConnection,
    paymentRepository,
    orderItemRepository,
    productRepository
  )
  const findAllOrdersUseCase = new FindAllOrdersUC(orderRepository)
  const genericSucessPresenter = new HttpGenericResponse<Order[]>()
  const findAllOrdersController = new FindAllOrdersController(
    findAllOrdersUseCase,
    genericSucessPresenter
  )

  return {
    databaseConnection,
    orderRepository,
    findAllOrdersUseCase,
    findAllOrdersController
  }
}
