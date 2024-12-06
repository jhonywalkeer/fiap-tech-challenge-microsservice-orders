import { QueueParams } from '@common/interfaces'

export interface Queues<T> {
  execute(params: QueueParams): Promise<T>
}
