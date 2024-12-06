import { SendMessagesProducer } from '@application/queues/producers'
import {
  SendMessageRequest,
  SQSClient,
  SendMessageCommand
} from '@aws-sdk/client-sqs'
import { QueueParams } from '@common/interfaces'
import { Logger } from '@common/utils/loggers'
import { ConnectQueueProvider } from '@infrastructure/providers/queues'

export class SendMessageAdapter implements SendMessagesProducer {
  private readonly client: SQSClient
  constructor() {
    this.client = ConnectQueueProvider()
  }

  async execute(params: QueueParams): Promise<boolean> {
    const input: SendMessageRequest = {
      QueueUrl: params.queue,
      MessageBody: params.message,
      MessageGroupId: params.message_group_id,
      MessageDeduplicationId: params.message_deduplication_id
    }
    const sendMessage = await this.client.send(new SendMessageCommand(input))
    Logger.info(`[SendMessageAdapter.send]: ${params.message}`)

    return !!sendMessage
  }
}
