import { Repositories } from '@application/repositories/common'
import { DeleteRepository } from '@common/types'

export interface DeleteOrderRepository
  extends Omit<Repositories<void>, DeleteRepository> {}
