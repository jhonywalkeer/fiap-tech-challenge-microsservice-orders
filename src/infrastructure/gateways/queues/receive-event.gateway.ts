import { Gateway } from '@application/protocols/http'
import { ReadMessagesConsumer } from '@application/queues/consumers'
import { QueueParams } from '@common/interfaces'
import { Logger } from '@common/utils/loggers'

export class ReceiveEventGateway implements Gateway<any> {
  constructor(private readonly readEvent: ReadMessagesConsumer) {}
  async execute(input: any, queue: string, messageGroup: string): Promise<any> {
    Logger.info(`[SendEventGateway.execute]`)

    const params: QueueParams = {
      queue: queue,
      max_number_of_messages: 1,
      message_group_id: messageGroup,
      wait_time_seconds: 20
    }

    return await this.readEvent.execute(params)
  }
}
