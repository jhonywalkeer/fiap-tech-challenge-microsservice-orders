import { PaginationFilter } from './pagination.filter'

describe('[Filters] Pagination Filter', () => {
  it('should return skip 0 and take 10 when page or limit is not provided', () => {
    const result = PaginationFilter(0, 0)
    expect(result).toEqual({ skip: 0, take: 10 })
  })

  it('should return skip 0 and take 10 when page is not provided', () => {
    const result = PaginationFilter(0, 10)
    expect(result).toEqual({ skip: 0, take: 10 })
  })

  it('should return skip 0 and take 10 when limit is not provided', () => {
    const result = PaginationFilter(1, 0)
    expect(result).toEqual({ skip: 0, take: 10 })
  })

  it('should return skip 0 and take 5 when page and limit are provided', () => {
    const result = PaginationFilter(1, 5)
    expect(result).toEqual({ skip: 0, take: 5 })
  })

  it('should return skip 5 and take 5 when page and limit are provided', () => {
    const result = PaginationFilter(2, 5)
    expect(result).toEqual({ skip: 5, take: 5 })
  })
})
