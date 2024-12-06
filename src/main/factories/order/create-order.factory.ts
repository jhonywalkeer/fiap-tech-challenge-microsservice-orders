import { CreateOrderUC } from '@application/usecases/order'
import { Order } from '@domain/entities'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { CreateOrderPrismaRepository } from '@infrastructure/persistence/database/repositories/order'
import { CreateOrderItemPrismaRepository } from '@infrastructure/persistence/database/repositories/order-item'
import { FindProductByConditionPrismaRepository } from '@infrastructure/persistence/database/repositories/product'
import { FindUserByIdPrismaRepository } from '@infrastructure/persistence/database/repositories/user'
import { CreateOrderController } from '@presentation/controllers/order'
import { HttpGenericResponse } from '@presentation/protocols/http'

export const CreateOrderControllerFactory = () => {
  const databaseConnection = new DatabaseConnection()
  const findUserByIdRepository = new FindUserByIdPrismaRepository(
    databaseConnection
  )
  const findProductByConditionRepository =
    new FindProductByConditionPrismaRepository(databaseConnection)
  const createOrderItemRepository = new CreateOrderItemPrismaRepository(
    databaseConnection
  )

  const createOrderRepository = new CreateOrderPrismaRepository(
    databaseConnection
  )

  const createOrderUseCase = new CreateOrderUC(
    findUserByIdRepository,
    findProductByConditionRepository,
    createOrderRepository,
    createOrderItemRepository
  )
  const genericSucessPresenter = new HttpGenericResponse<Order>()
  const createOrderController = new CreateOrderController(
    createOrderUseCase,
    genericSucessPresenter
  )

  return {
    databaseConnection,
    createOrderRepository,
    createOrderUseCase,
    createOrderController
  }
}
