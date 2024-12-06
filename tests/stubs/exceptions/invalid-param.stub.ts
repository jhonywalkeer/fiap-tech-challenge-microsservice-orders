import { StatusCode, ErrorName } from '@common/enums'
import { InvalidParamError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'

export const InvalidParamStub: HttpException = new HttpException(
  StatusCode.BadRequest,
  ErrorName.InvalidParameters,
  InvalidParamError()
)
