import { IdentifierDTO } from '@application/dtos/common'
import { EmptyFiller } from '@common/constants'
import { ErrorName, StatusCode } from '@common/enums'
import { InvalidParamError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { IsValidParameterValidator } from '@presentation/validators'
import { InvalidParamStub } from '@stubs/exceptions'

jest.mock('@presentation/validators/is-valid-parameter')

describe(`[DTO's] Identifier DTO`, () => {
  it('should call with the correct id', () => {
    const input: string = '1'
    new IdentifierDTO(input)

    expect(IsValidParameterValidator).toHaveBeenCalledWith(input)
  })

  it('should throw an error if id is empty string', () => {
    const httpException: HttpException = InvalidParamStub

    expect(() => new IdentifierDTO(EmptyFiller)).toThrow(httpException)
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
    expect(httpException.name).toBe(ErrorName.InvalidParameters)
    expect(httpException.message).toBe(InvalidParamError())
  })

  it('should throw an error if id is null', () => {
    const httpException: HttpException = InvalidParamStub

    expect(() => new IdentifierDTO(null as any)).toThrow(httpException)
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
    expect(httpException.name).toBe(ErrorName.InvalidParameters)
    expect(httpException.message).toBe(InvalidParamError())
  })

  it('should throw an error if id is undefined', () => {
    const httpException: HttpException = InvalidParamStub

    expect(() => new IdentifierDTO(undefined as any)).toThrow(httpException)
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
    expect(httpException.name).toBe(ErrorName.InvalidParameters)
    expect(httpException.message).toBe(InvalidParamError())
  })
})
