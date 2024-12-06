import { PaginateDTO } from '@application/dtos/common'
import { Pagination } from '@common/constants'
import { Ordenation } from '@common/enums'
import { PageMock, LimitMock, SortMock, OrderMock } from '@mocks/pagination'

export const PaginationValuesAssert = [
  {
    description: 'default values if no value is provided',
    input: new PaginateDTO(),
    expected: {
      page: Pagination.Default.Page,
      limit: Pagination.Default.Limit,
      sort: undefined,
      order: Ordenation.ASC
    }
  },
  {
    description: 'provided values when they are valid',
    input: new PaginateDTO(PageMock, LimitMock, SortMock, OrderMock),
    expected: {
      page: PageMock,
      limit: LimitMock,
      sort: SortMock,
      order: OrderMock
    }
  },
  {
    description: 'default values if no page is informed',
    input: new PaginateDTO(undefined, LimitMock, undefined, OrderMock),
    expected: {
      page: Pagination.Default.Page,
      limit: Pagination.Default.Limit,
      sort: undefined,
      order: Ordenation.ASC
    }
  },
  {
    description: 'default values if no limit is informed',
    input: new PaginateDTO(PageMock, undefined, undefined, OrderMock),
    expected: {
      page: Pagination.Default.Page,
      limit: Pagination.Default.Limit,
      sort: undefined,
      order: Ordenation.ASC
    }
  }
]
