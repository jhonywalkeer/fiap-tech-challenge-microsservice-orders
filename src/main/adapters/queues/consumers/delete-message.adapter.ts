import { DeleteMessagesConsumer } from '@application/queues/consumers'
import {
  DeleteMessageCommand,
  DeleteMessageRequest,
  SQSClient
} from '@aws-sdk/client-sqs'
import { QueueParams } from '@common/interfaces'
import { Logger } from '@common/utils/loggers'
import { ConnectQueueProvider } from '@infrastructure/providers/queues'

export class DeleteMessageAdapter implements DeleteMessagesConsumer {
  private readonly client: SQSClient
  constructor() {
    this.client = ConnectQueueProvider()
  }

  async execute(params: QueueParams): Promise<void> {
    const input: DeleteMessageRequest = {
      QueueUrl: params.queue,
      ReceiptHandle: params.receipt_handle
    }

    const command = new DeleteMessageCommand(input)
    Logger.info(`[DeleteMessageAdapter.delete]: ${params.message_id}`)

    await this.client.send(command)
  }
}
