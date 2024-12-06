import { DeleteOrderItemRepository } from '@application/repositories/order-item/delete-order-item.repository'
import { ErrorName, StatusCode } from '@common/enums'
import { DeleteNotOccurredError } from '@common/errors'
import { Identifier } from '@common/interfaces'
import { HttpException } from '@common/utils/exceptions'
import { Field } from '@domain/enums'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class DeleteOrderItemPrismaRepository
  implements DeleteOrderItemRepository
{
  constructor(private readonly prisma: DatabaseConnection) {}

  async delete(pathParameters: Identifier): Promise<void> {
    try {
      await this.prisma.order_item.deleteMany({
        where: {
          id: {
            in: pathParameters.ids
          }
        }
      })
    } catch (error) {
      console.log(' DeleteOrderItemPrismaRepository', error)
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        DeleteNotOccurredError(Field.OrderItem)
      )
    }
  }
}
