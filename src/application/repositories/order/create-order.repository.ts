import { Repositories } from '@application/repositories/common'
import { CreateRepository } from '@common/types'
import { Order } from '@domain/entities'

export interface CreateOrderRepository
  extends Omit<Repositories<Order>, CreateRepository> {}
