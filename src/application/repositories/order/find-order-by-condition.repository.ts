import { Repositories } from '@application/repositories/common'
import { FindByConditionRepository } from '@common/types'
import { Order } from '@domain/entities'

export interface FindOrderByConditionRepository
  extends Omit<Repositories<Order | null>, FindByConditionRepository> {}
