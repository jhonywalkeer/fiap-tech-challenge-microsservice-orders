import { HttpResponse } from '@common/interfaces'

export interface ResponseHandler<T = any> {
  response(
    body: T,
    statusCode?: number,
    message?: string
  ): Promise<HttpResponse<T>>
}
