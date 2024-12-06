import { StatusCode, ErrorName } from '@common/enums'
import { IncorrectFieldTypeError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'

export const InvalidFieldTypeStub = (
  field: string,
  type: string
): HttpException => {
  return new HttpException(
    StatusCode.BadRequest,
    ErrorName.InvalidParameters,
    IncorrectFieldTypeError(field, type)
  )
}
