import { ErrorName, StatusCode, Type } from '@common/enums'
import { IncorrectFieldTypeError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'

export const IsStringValidator = (value: any, identifier: string): string => {
  if (typeof value !== Type.string) {
    throw new HttpException(
      StatusCode.BadRequest,
      ErrorName.InvalidParameters,
      IncorrectFieldTypeError(identifier, Type.string)
    )
  }

  return value
}
