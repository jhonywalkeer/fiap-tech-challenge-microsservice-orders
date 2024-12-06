import { StatusCode } from '@common/enums'
import { HttpException } from '@common/utils/exceptions'

describe('[Exceptions] Http Exception', () => {
  it('should create an instance of HttpException', () => {
    const httpException = new HttpException(
      StatusCode.BadRequest,
      'BadRequest',
      'Bad Request'
    )

    expect(httpException).toBeInstanceOf(HttpException)
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
    expect(httpException.name).toBe('BadRequest')
    expect(httpException.message).toBe('Bad Request')
  })

  it('should create an instance of HttpException with stack', () => {
    const httpException = new HttpException(
      StatusCode.InternalServerError,
      'InternalServerError',
      'Internal Server Error',
      'stack'
    )

    expect(httpException).toBeInstanceOf(HttpException)
    expect(httpException.statusCode).toBe(StatusCode.InternalServerError)
    expect(httpException.name).toBe('InternalServerError')
    expect(httpException.message).toBe('Internal Server Error')
    expect(httpException.stack).toBe('stack')
  })
})
