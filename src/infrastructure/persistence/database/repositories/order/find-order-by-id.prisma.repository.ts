import { FindOrderByIdDTO } from '@application/dtos/order'
import { OrderMap } from '@application/mappers/order.map'
import { FindOrderByIdRepository } from '@application/repositories/order'
import { EmptyFiller } from '@common/constants'
import { ErrorName, StatusCode } from '@common/enums'
import { NotFoundByIdError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Order, OrderItem, Product } from '@domain/entities'
import { Field } from '@domain/enums'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindOrderItemByConditionPrismaRepository } from '@infrastructure/persistence/database/repositories/order-item'
import { FindProductByConditionPrismaRepository } from '@infrastructure/persistence/database/repositories/product'

export class FindOrderByIdPrismaRepository implements FindOrderByIdRepository {
  constructor(
    private readonly prisma: DatabaseConnection,
    private readonly orderItemRepository: FindOrderItemByConditionPrismaRepository,
    private readonly productRepository: FindProductByConditionPrismaRepository
  ) {}

  async findById(pathParameters: FindOrderByIdDTO): Promise<Order | null> {
    try {
      const findOrder = await this.prisma.order.findUnique({
        where: {
          id: pathParameters.id
        }
      })

      if (!findOrder) {
        return null
      }

      const findItems: OrderItem[] | null =
        await this.orderItemRepository.findByCondition({
          ids: [findOrder?.id]
        })

      if (!findItems) {
        return null
      }

      const findProducts: Product[] | null =
        await this.productRepository.findByCondition({
          ids: findItems?.map((item) => item.product_id ?? EmptyFiller)
        })

      if (!findProducts) {
        return null
      }

      return OrderMap.execute(findOrder, findItems, findProducts)
    } catch (error) {
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        NotFoundByIdError(Field.Order)
      )
    }
  }
}
