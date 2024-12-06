import {
  DeleteMessagesConsumer,
  ReadMessagesConsumer
} from '@application/queues/consumers'
import { QueuePoll } from '@application/queues/pollers'
import { QueueParams } from '@common/interfaces'

export class PollQueueAdapter implements QueuePoll {
  private readonly readMessages: ReadMessagesConsumer
  private readonly deleteMessages: DeleteMessagesConsumer

  async execute(params: QueueParams): Promise<void> {
    const value = true

    while (value) {
      const messages = await this.readMessages.execute(params)

      if (messages && messages.Messages && messages.Messages.length > 0) {
        const message = JSON.parse(messages.Messages[0].Body)
        console.log(`[PollQueueAdapter.execute]: ${message}`)

        await this.deleteMessages.execute({
          queue: params.queue,
          receipt_handle: messages.Messages[0].ReceiptHandle
        })

        if (message.action === 'FindByIdCategory') {
          return message
        }
      }
    }
  }
}

// export class PollQueueAdapter implements QueuePoll {
//   private readonly readMessages: ReadMessagesConsumer
//   private readonly deleteMessages: DeleteMessagesConsumer
//   private readonly maxRetries: number = 10

//   async execute(params: QueueParams): Promise<void> {
//     let attempts = 0

//     while (attempts < this.maxRetries) {
//       try {
//         const messages = await this.readMessages.execute(params)

//         if (messages && messages.Messages && messages.Messages.length > 0) {
//           const message = JSON.parse(messages.Messages[0].Body)
//           console.log(
//             `[PollQueueAdapter.execute]: Received message: ${message}`
//           )

//           await this.deleteMessages.execute({
//             queue: params.queue,
//             receipt_handle: messages.Messages[0].ReceiptHandle
//           })
//           console.log(
//             `[PollQueueAdapter.execute]: Deleted message with receipt handle: ${messages.Messages[0].ReceiptHandle}`
//           )

//           if (message.action === 'FindByIdCategory') {
//             return message
//           }
//         } else {
//           console.log(`[PollQueueAdapter.execute]: No messages received`)
//         }
//       } catch (error) {
//         console.error(
//           `[PollQueueAdapter.execute]: Error processing message: ${error}`
//         )
//       }

//       attempts++
//       console.log(
//         `[PollQueueAdapter.execute]: Attempt ${attempts} of ${this.maxRetries}`
//       )
//     }

//     console.warn(
//       `[PollQueueAdapter.execute]: Exceeded maximum retries (${this.maxRetries})`
//     )
//   }
// }
