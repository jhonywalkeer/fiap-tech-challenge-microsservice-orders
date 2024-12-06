import { ErrorName, StatusCode, Type } from '@common/enums'
import { IncorrectFieldTypeError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { IsStringValidator } from '@presentation/validators'

describe('[Validators] Is String', () => {
  it('should return a string', () => {
    const value: string = '1'
    const identifier: string = 'exemple_identifier'
    const result: string = IsStringValidator(value, identifier)
    expect(result).toBe(value)
  })

  it('should throw an error when the value is not a string', () => {
    const value: number = 1
    const identifier: string = 'exemple_identifier'
    const httpException: HttpException = new HttpException(
      StatusCode.BadRequest,
      ErrorName.InvalidParameters,
      IncorrectFieldTypeError(identifier, Type.string)
    )

    expect(() => {
      IsStringValidator(value, identifier)
    }).toThrow(httpException)

    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
    expect(httpException.name).toBe(ErrorName.InvalidParameters)
    expect(httpException.message).toBe(
      IncorrectFieldTypeError(identifier, Type.string)
    )
  })
})
