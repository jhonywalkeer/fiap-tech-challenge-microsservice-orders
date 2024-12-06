import { StatusCode, ErrorName } from '@common/enums'
import { ValueIncorrectError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'

export const InvalidValueStub = (property: string): HttpException => {
  return new HttpException(
    StatusCode.BadRequest,
    ErrorName.InvalidParameters,
    ValueIncorrectError(property)
  )
}
