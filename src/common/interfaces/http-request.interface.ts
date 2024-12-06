export interface HttpRequest<
  Body = any,
  Params = any,
  Query = any,
  Headers = any
> {
  body?: Body
  params?: Params
  query?: Query
  headers?: Headers
}
