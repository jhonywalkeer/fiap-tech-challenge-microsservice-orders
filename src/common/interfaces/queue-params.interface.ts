export interface QueueParams {
  queue: string
  message?: string
  message_group_id?: string
  message_deduplication_id?: string
  message_id?: string
  receipt_handle?: string
  max_number_of_messages?: number
  wait_time_seconds?: number
}
