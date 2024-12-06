import { Repositories } from '@application/repositories/common'
import { FindByIdRepository } from '@common/types/repositories.type'
import { OrderItem } from '@domain/entities'

export interface FindOrderItemByIdRepository
  extends Omit<Repositories<OrderItem[] | null>, FindByIdRepository> {}
