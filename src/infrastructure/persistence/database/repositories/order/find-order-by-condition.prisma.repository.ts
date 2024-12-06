import { OrderMap } from '@application/mappers'
import { FindOrderByConditionRepository } from '@application/repositories/order'
import { EmptyFiller } from '@common/constants'
import { ErrorName, StatusCode } from '@common/enums'
import { FindNotOccurredError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Order } from '@domain/entities'
import { Field } from '@domain/enums'
import { DatabaseConnection } from '@infrastructure/persistence/database'

import { OrderItemsSchema, ProductWithCategorySchema } from '../../schemas'
import { FindOrderItemByConditionPrismaRepository } from '../order-item'
import { FindProductByConditionPrismaRepository } from '../product'

export class FindOrderByConditionPrismaRepository
  implements FindOrderByConditionRepository
{
  constructor(
    private readonly prisma: DatabaseConnection,
    private readonly orderItemRepository: FindOrderItemByConditionPrismaRepository,
    private readonly productRepository: FindProductByConditionPrismaRepository
  ) {}

  async findByCondition(parameters: any): Promise<Order | null> {
    console.log(parameters)
    try {
      const findOrder = await this.prisma.order.findUnique({
        where: {
          order: parameters
        }
      })

      if (!findOrder) {
        return null
      }

      const findItems: OrderItemsSchema[] | null =
        await this.orderItemRepository.findByCondition({
          ids: [findOrder?.id]
        })

      if (!findItems) {
        return null
      }

      const findProducts: ProductWithCategorySchema[] | null =
        await this.productRepository.findByCondition({
          ids: findItems?.map((item) => item.product_id ?? EmptyFiller)
        })

      if (!findProducts) {
        return null
      }

      return OrderMap.execute(findOrder, findItems, findProducts)
    } catch (error) {
      console.log(error)
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        FindNotOccurredError(Field.Order)
      )
    }
  }
}
