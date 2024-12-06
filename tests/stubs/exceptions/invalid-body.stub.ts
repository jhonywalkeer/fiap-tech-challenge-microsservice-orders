import { StatusCode, ErrorName } from '@common/enums'
import { InvalidBodyError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'

export const InvalidBodyStub: HttpException = new HttpException(
  StatusCode.BadRequest,
  ErrorName.InvalidBody,
  InvalidBodyError()
)
