import { ManyRequestsError } from './many-requests.error'

describe('[Errors] Many Requests Error', () => {
  it('should return the correct error message', () => {
    const result = ManyRequestsError()
    expect(result).toBe('Muitas solicitações, tente novamente mais tarde!')
  })
})
