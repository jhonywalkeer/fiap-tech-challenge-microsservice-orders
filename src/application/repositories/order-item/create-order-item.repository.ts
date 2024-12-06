import { Repositories } from '@application/repositories/common'
import { CreateRepository } from '@common/types'
import { OrderItem } from '@domain/entities'

export interface CreateOrderItemRepository
  extends Omit<Repositories<OrderItem | OrderItem[]>, CreateRepository> {}
