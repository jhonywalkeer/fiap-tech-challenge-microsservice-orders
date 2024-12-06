import { Repositories } from '@application/repositories/common'
import { DeleteRepository } from '@common/types'

export interface DeleteOrderItemRepository
  extends Omit<Repositories<void>, DeleteRepository> {}
