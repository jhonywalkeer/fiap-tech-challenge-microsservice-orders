import { FindOrderItemByIdDTO } from '@application/dtos/order-item'
import { FindOrderItemByIdRepository } from '@application/repositories/order-item'
import { ErrorName, StatusCode } from '@common/enums'
import { FindNotOccurredError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { OrderItem } from '@domain/entities'
import { Field } from '@domain/enums'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class FindOrderItemByIdPrismaRepository
  implements FindOrderItemByIdRepository
{
  constructor(private readonly prisma: DatabaseConnection) {}

  async findById(
    pathParameters: FindOrderItemByIdDTO
  ): Promise<OrderItem[] | null> {
    try {
      return await this.prisma.order_item.findMany({
        where: {
          id: pathParameters.id
        }
      })
    } catch (error) {
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        FindNotOccurredError(Field.OrderItem)
      )
    }
  }
}
