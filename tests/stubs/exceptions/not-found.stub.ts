import { StatusCode, ErrorName, Operation } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Field } from '@domain/enums'

export const NotFoundStub: HttpException = new HttpException(
  StatusCode.NotFound,
  ErrorName.NotFoundInformation,
  NotOccurredError(Operation.Find, Field.Category)
)
