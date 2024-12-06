import { Repositories } from '@application/repositories/common'
import { FindByIdRepository } from '@common/types/repositories.type'
import { Order } from '@domain/entities'

export interface FindOrderByIdRepository
  extends Omit<Repositories<Order | null>, FindByIdRepository> {}
