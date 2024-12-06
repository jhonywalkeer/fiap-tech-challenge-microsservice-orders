export const PaginationFilter = (page: number, limit: number) => {
  return !page || !limit
    ? { skip: 0, take: 10 }
    : { skip: (page - 1) * limit, take: limit }
}
