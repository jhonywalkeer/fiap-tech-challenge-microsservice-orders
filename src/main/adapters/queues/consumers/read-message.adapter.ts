import { ReadMessagesConsumer } from '@application/queues/consumers'
import {
  ReceiveMessageCommand,
  ReceiveMessageRequest,
  SQSClient
} from '@aws-sdk/client-sqs'
import { QueueAttributeName } from '@common/constants'
import { QueueParams } from '@common/interfaces'
import { Logger } from '@common/utils/loggers'
import { ConnectQueueProvider } from '@infrastructure/providers/queues'

export class ReadMessageAdapter implements ReadMessagesConsumer {
  private readonly client: SQSClient
  constructor() {
    this.client = ConnectQueueProvider()
  }

  async execute(params: QueueParams): Promise<any> {
    const input: ReceiveMessageRequest = {
      QueueUrl: params.queue,
      MaxNumberOfMessages: params.max_number_of_messages,
      WaitTimeSeconds: params.wait_time_seconds,
      AttributeNames: [QueueAttributeName]
    }
    const command = new ReceiveMessageCommand(input)
    const messages = await this.client.send(command)

    if (messages?.Messages) {
      Logger.info(`[ReadMessageAdapter.read] ${messages.Messages[0].Body}`)
      return messages.Messages
    }

    return null
  }
}
