import { Gateway } from '@application/protocols/http'
import { SendMessagesProducer } from '@application/queues/producers'
import { QueueParams } from '@common/interfaces'
import { Logger } from '@common/utils/loggers'

export class SendEventGateway implements Gateway<any> {
  constructor(private readonly sendEvent: SendMessagesProducer) {}
  async execute(input: any, queue: string, messageGroup: string): Promise<any> {
    Logger.info(`[SendEventGateway.execute]`)

    const params: QueueParams = {
      queue: queue,
      message: JSON.stringify(input),
      message_group_id: messageGroup,
      message_deduplication_id: ''
    }

    return await this.sendEvent.execute(params)
  }
}
