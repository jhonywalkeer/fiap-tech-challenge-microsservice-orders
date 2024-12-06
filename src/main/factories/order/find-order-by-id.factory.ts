import { FindOrderByIdUC } from '@application/usecases/order'
import { Order } from '@domain/entities'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindOrderByIdPrismaRepository } from '@infrastructure/persistence/database/repositories/order'
import { FindOrderItemByConditionPrismaRepository } from '@infrastructure/persistence/database/repositories/order-item'
import { FindPaymentByConditionPrismaRepository } from '@infrastructure/persistence/database/repositories/payment'
import { FindProductByConditionPrismaRepository } from '@infrastructure/persistence/database/repositories/product'
import { FindOrderByIdController } from '@presentation/controllers/order'
import { HttpGenericResponse } from '@presentation/protocols/http'

export const FindOrderByIdControllerFactory = () => {
  const databaseConnection = new DatabaseConnection()
  const paymentRepository = new FindPaymentByConditionPrismaRepository(
    databaseConnection
  )
  const orderItemRepository = new FindOrderItemByConditionPrismaRepository(
    databaseConnection
  )
  const findproductRepository = new FindProductByConditionPrismaRepository(
    databaseConnection
  )
  const productRepository = new FindOrderByIdPrismaRepository(
    databaseConnection,
    paymentRepository,
    orderItemRepository,
    findproductRepository
  )
  const findOrderByIdUseCase = new FindOrderByIdUC(productRepository)
  const genericSucessPresenter = new HttpGenericResponse<Order>()
  const findOrderByIdController = new FindOrderByIdController(
    findOrderByIdUseCase,
    genericSucessPresenter
  )

  return {
    databaseConnection,
    productRepository,
    findOrderByIdUseCase,
    findOrderByIdController
  }
}
