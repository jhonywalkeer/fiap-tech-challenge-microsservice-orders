export type PaginateResponse<T> = {
  total: number
  page: number
  total_pages: number
  limit: number
  data: T[]
}
