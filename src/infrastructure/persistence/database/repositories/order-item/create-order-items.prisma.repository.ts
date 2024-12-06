import { CreateOrderItemDTO } from '@application/dtos/order-item'
import { CreateOrderItemRepository } from '@application/repositories/order-item'
import { ErrorName, StatusCode } from '@common/enums'
import { CreateNotOccurredError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { OrderItem } from '@domain/entities'
import { Field } from '@domain/enums'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { Prisma } from '@prisma/client'

export class CreateOrderItemPrismaRepository
  implements CreateOrderItemRepository
{
  constructor(private readonly prisma: DatabaseConnection) {}

  async create(
    body: CreateOrderItemDTO | CreateOrderItemDTO[]
  ): Promise<OrderItem[]> {
    try {
      const bodyArray = Array.isArray(body) ? body : [body]

      const createOrderItems: Prisma.BatchPayload =
        await this.prisma.order_item.createMany({
          data: bodyArray
        })

      console.info(createOrderItems)

      const findOrderItems: OrderItem[] = await this.prisma.order_item.findMany(
        {
          where: {
            order_id: {
              in: bodyArray.map((item) => item.order_id)
            }
          }
        }
      )

      return findOrderItems
    } catch (error) {
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        CreateNotOccurredError(Field.OrderItem)
      )
    }
  }
}
