import { DeleteOrderRepository } from '@application/repositories/order'
import { ErrorName, StatusCode } from '@common/enums'
import { DeleteNotOccurredError } from '@common/errors'
import { Identifier } from '@common/interfaces'
import { HttpException } from '@common/utils/exceptions'
import { Field } from '@domain/enums'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class DeleteOrderPrismaRepository implements DeleteOrderRepository {
  constructor(private readonly prisma: DatabaseConnection) {}

  async delete(pathParameters: Identifier): Promise<void> {
    try {
      await this.prisma.order.delete({
        where: {
          id: pathParameters.id
        }
      })
    } catch (error) {
      console.log('DeleteOrderPrismaRepository', error)
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        DeleteNotOccurredError(Field.Order)
      )
    }
  }
}
