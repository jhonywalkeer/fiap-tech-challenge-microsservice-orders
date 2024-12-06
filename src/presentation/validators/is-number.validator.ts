import { ErrorName, StatusCode, Type } from '@common/enums'
import { IncorrectFieldTypeError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'

export const IsNumberValidator = (value: any, identifier: string): number => {
  if (typeof value !== Type.number) {
    throw new HttpException(
      StatusCode.BadRequest,
      ErrorName.InvalidParameters,
      IncorrectFieldTypeError(identifier, Type.number)
    )
  }
  return value
}
