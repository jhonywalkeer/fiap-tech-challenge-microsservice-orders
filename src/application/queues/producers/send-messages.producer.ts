import { Queues } from '@application/protocols/queues'

export interface SendMessagesProducer extends Queues<boolean> {}
