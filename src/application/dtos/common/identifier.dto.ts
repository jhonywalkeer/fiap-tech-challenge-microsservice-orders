import { StatusCode, ErrorName } from '@common/enums'
import { InvalidParamError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { IsValidParameterValidator } from '@presentation/validators/is-valid-parameter'

export class IdentifierDTO {
  id: string

  constructor(id: string) {
    if (!id)
      throw new HttpException(
        StatusCode.BadRequest,
        ErrorName.InvalidParameters,
        InvalidParamError()
      )

    this.id = IsValidParameterValidator(id)
  }
}
