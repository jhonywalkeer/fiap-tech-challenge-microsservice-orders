import { ErrorName, StatusCode } from '@common/enums'
import { InvalidBodyError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Field } from '@domain/enums'
import { IsStringValidator } from '@presentation/validators'

export class FindUserByConditionDTO {
  id: string
  name: string

  constructor(id: string, name: string) {
    if (!name) {
      throw new HttpException(
        StatusCode.BadRequest,
        ErrorName.InvalidBody,
        InvalidBodyError()
      )
    }

    this.id = IsStringValidator(id, Field.CustomerIdentifier)
    this.name = IsStringValidator(name, Field.Name)
  }
}
