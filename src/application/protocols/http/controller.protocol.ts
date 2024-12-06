import { HttpRequest, HttpResponse } from '@common/interfaces'

export interface Controller<T = unknown> {
  handle(request: HttpRequest): Promise<HttpResponse<T>>
}
