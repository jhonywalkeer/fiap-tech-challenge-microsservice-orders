import { SQSClient } from '@aws-sdk/client-sqs'
import { ErrorName, InternalErrorMessages, StatusCode } from '@common/enums'
import { InternalServerError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'

export const ConnectQueueProvider = (): SQSClient => {
  const region = process.env.AWS_REGION
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID!
  const secretAccessKey = process.env.AWS_SECRET_KEY!

  if (!region || !accessKeyId || !secretAccessKey) {
    throw new HttpException(
      StatusCode.InternalServerError,
      ErrorName.InternalError,
      InternalServerError(InternalErrorMessages.AWSClientError)
    )
  }

  return new SQSClient({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY!,
      secretAccessKey: process.env.AWS_SECRET_KEY!
    }
  })
}
