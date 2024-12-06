export interface HttpResponse<T> {
  body: T
  statusCode: number
  message?: string
}
