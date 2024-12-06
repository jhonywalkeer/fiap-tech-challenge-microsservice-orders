import { StatusCode, ErrorName } from '@common/enums'
import { ExistsError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Field } from '@domain/enums'

export const ExistsResourceStub: HttpException = new HttpException(
  StatusCode.Conflict,
  ErrorName.ResourceAlreadyExists,
  ExistsError(Field.Product)
)
