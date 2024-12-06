import { DeleteOrderUC } from '@application/usecases/order'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import {
  FindOrderByIdPrismaRepository,
  DeleteOrderPrismaRepository
} from '@infrastructure/persistence/database/repositories/order'
import {
  DeleteOrderItemPrismaRepository,
  FindOrderItemByConditionPrismaRepository
} from '@infrastructure/persistence/database/repositories/order-item'
import { FindProductByConditionPrismaRepository } from '@infrastructure/persistence/database/repositories/product'
import { DeleteOrderController } from '@presentation/controllers/order'
import { HttpGenericResponse } from '@presentation/protocols/http'

export const DeleteOrderControllerFactory = () => {
  const databaseConnection = new DatabaseConnection()
  const findProductByConditionRepository =
    new FindProductByConditionPrismaRepository(databaseConnection)
  const findOrderItemByConditionRepository =
    new FindOrderItemByConditionPrismaRepository(databaseConnection)
  const FindOrderByIdRepository = new FindOrderByIdPrismaRepository(
    databaseConnection,
    findOrderItemByConditionRepository,
    findProductByConditionRepository
  )
  const deleteOrderItemRepository = new DeleteOrderItemPrismaRepository(
    databaseConnection
  )
  const deleteOrderRepository = new DeleteOrderPrismaRepository(
    databaseConnection
  )
  const deleteOrderUseCase = new DeleteOrderUC(
    FindOrderByIdRepository,
    findOrderItemByConditionRepository,
    deleteOrderItemRepository,
    deleteOrderRepository
  )
  const genericSucessPresenter = new HttpGenericResponse<void>()
  const deleteOrderController = new DeleteOrderController(
    deleteOrderUseCase,
    genericSucessPresenter
  )

  return {
    databaseConnection,
    deleteOrderRepository,
    deleteOrderUseCase,
    deleteOrderController
  }
}
