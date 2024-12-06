import { Gateway } from '@application/protocols/http'
import { QueuePoll } from '@application/queues/pollers'
import { QueueParams } from '@common/interfaces'
import { Logger } from '@common/utils/loggers'

export class PollEventGateway implements Gateway<any> {
  constructor(private readonly readEvent: QueuePoll) {}
  async execute(queue: string): Promise<any> {
    Logger.info(`[PollEventGateway.execute]: ${queue}`)

    const params: QueueParams = {
      queue: queue,
      message: JSON.stringify(''),
      message_group_id: '',
      message_deduplication_id: ''
    }

    return await this.readEvent.execute(params)
  }
}
