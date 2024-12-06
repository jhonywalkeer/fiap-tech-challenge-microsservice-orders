import { FindOrderItemByConditionDTO } from '@application/dtos/order-item'
import { FindOrderItemByConditionRepository } from '@application/repositories/order-item'
import { ErrorName, StatusCode } from '@common/enums'
import { NotFoundByIdError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { OrderItem } from '@domain/entities'
import { Field } from '@domain/enums'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class FindOrderItemByConditionPrismaRepository
  implements FindOrderItemByConditionRepository
{
  constructor(private readonly prisma: DatabaseConnection) {}

  async findByCondition(
    pathParameters: FindOrderItemByConditionDTO
  ): Promise<OrderItem[] | null> {
    try {
      const findOrderItems = await this.prisma.order_item.findMany({
        where: {
          order_id: {
            in: pathParameters.ids
          }
        }
      })

      if (!findOrderItems || findOrderItems.length === 0) {
        return null
      }

      return findOrderItems
    } catch (error) {
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        NotFoundByIdError(Field.OrderItem)
      )
    }
  }
}
