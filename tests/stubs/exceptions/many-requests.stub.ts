import { StatusCode, ErrorName } from '@common/enums'
import { ManyRequestsError } from '@common/errors'

export const ManyRequestsStub = () => {
  return {
    status_code: StatusCode.TooManyRequests,
    name: ErrorName.TooManyRequests,
    message: ManyRequestsError()
  }
}
