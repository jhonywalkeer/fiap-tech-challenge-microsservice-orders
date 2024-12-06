export class Payment {
  id?: string
  order_id?: string
  user_id?: string | null
  payment_method?: string
  amount?: number
  payment_date?: Date | null
  status?: string
  qr_code?: string | null

  constructor(
    order_id?: string,
    user_id?: string | null,
    payment_method?: string,
    amount?: number,
    payment_date?: Date | null,
    status?: string,
    qr_code?: string | null,
    id?: string
  ) {
    this.id = id
    this.order_id = order_id
    this.user_id = user_id
    this.payment_method = payment_method
    this.amount = amount
    this.payment_date = payment_date
    this.status = status
    this.qr_code = qr_code
  }
}
