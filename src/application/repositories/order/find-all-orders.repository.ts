import { Repositories } from '@application/repositories/common'
import { FindAllRepository, PaginateResponse } from '@common/types'
import { OrderWithItems } from '@domain/interfaces/order/order-with-items.interface'

export interface FindAllOrdersRepository
  extends Omit<
    Repositories<PaginateResponse<OrderWithItems | OrderWithItems[]> | null>,
    FindAllRepository
  > {}
