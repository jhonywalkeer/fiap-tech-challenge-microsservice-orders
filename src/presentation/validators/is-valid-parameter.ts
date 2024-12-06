import { DangerousPatterns } from '@common/constants'
import { StatusCode, ErrorName } from '@common/enums'
import { InvalidParamError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'

export const IsValidParameterValidator = (value: string): string => {
  for (const pattern of DangerousPatterns) {
    if (pattern.test(value)) {
      throw new HttpException(
        StatusCode.BadRequest,
        ErrorName.InvalidParameters,
        InvalidParamError()
      )
    }
  }

  return value
}
