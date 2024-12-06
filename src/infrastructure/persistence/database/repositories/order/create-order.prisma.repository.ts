import { CreateOrderDTO } from '@application/dtos/order'
import { CreateOrderRepository } from '@application/repositories/order'
import { ErrorName, StatusCode } from '@common/enums'
import { CreateNotOccurredError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Field } from '@domain/enums'
import { DatabaseConnection } from '@infrastructure/persistence/database'
export class CreateOrderPrismaRepository implements CreateOrderRepository {
  constructor(private readonly prisma: DatabaseConnection) {}

  async create(body: CreateOrderDTO): Promise<any> {
    try {
      return await this.prisma.order.create({
        data: {
          order: body.order,
          status: body.status,
          customer: body.customer,
          user_id: body.user_id,
          observation: body.observation
        }
      })
    } catch (error) {
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        CreateNotOccurredError(Field.Order)
      )
    }
  }
}
