import { AllOrdersMap, OrderWithItemsMap } from '@application/mappers/'
import { FindAllOrdersRepository } from '@application/repositories/order'
import { EmptyFiller } from '@common/constants'
import { ErrorName, StatusCode } from '@common/enums'
import { FindNotOccurredError } from '@common/errors'
import { PaginationAndFilter } from '@common/interfaces'
import { PaginateResponse } from '@common/types'
import { HttpException } from '@common/utils/exceptions'
import { PaginationFilter } from '@common/utils/filters'
import { Order, OrderItem, Payment, Product } from '@domain/entities'
import { Field } from '@domain/enums'
import { OrderWithItems } from '@domain/interfaces/order/order-with-items.interface'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindOrderItemByConditionPrismaRepository } from '@infrastructure/persistence/database/repositories/order-item'
import { FindPaymentByConditionPrismaRepository } from '@infrastructure/persistence/database/repositories/payment'
import { FindProductByConditionPrismaRepository } from '@infrastructure/persistence/database/repositories/product'

export class FindAllOrdersPrismaRepository implements FindAllOrdersRepository {
  constructor(
    private readonly prisma: DatabaseConnection,
    private readonly paymentRepository: FindPaymentByConditionPrismaRepository,
    private readonly orderItemRepository: FindOrderItemByConditionPrismaRepository,
    private readonly productRepository: FindProductByConditionPrismaRepository
  ) {}

  async findAll(
    queryParameters: PaginationAndFilter
  ): Promise<PaginateResponse<OrderWithItems | OrderWithItems[]> | null> {
    try {
      const findOrders = await this.prisma.order.findMany({
        ...PaginationFilter(queryParameters.page, queryParameters.limit)
      })

      const countOrders = await this.prisma.order.count()

      const findItems: OrderItem[] | null =
        await this.orderItemRepository.findByCondition({
          ids: findOrders.map((order) => order.id)
        })

      const findProducts: Product[] | null =
        await this.productRepository.findByCondition({
          ids: findItems?.map((item) => item.product_id ?? EmptyFiller)
        })

      const findedOrders = findOrders.map((order) =>
        OrderWithItemsMap.execute(order, findItems, findProducts)
      )

      return {
        total: countOrders,
        page: queryParameters.page,
        total_pages: Math.ceil(countOrders / queryParameters.limit),
        limit: queryParameters.limit,
        data: findedOrders
      }
    } catch (error) {
      console.error(error)
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        FindNotOccurredError(Field.Order)
      )
    }
  }
}
