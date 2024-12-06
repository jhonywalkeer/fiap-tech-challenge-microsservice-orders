import { SQSClient } from '@aws-sdk/client-sqs'
import { StatusCode, ErrorName, InternalErrorMessages } from '@common/enums'
import { HttpException } from '@common/utils/exceptions'
import { ConnectQueueProvider } from '@infrastructure/providers/queues'

jest.mock('@aws-sdk/client-sqs')

describe('Connect Queue Provider', () => {
  const TEST_ENV = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...TEST_ENV }
  })

  afterAll(() => {
    process.env = TEST_ENV
  })

  it('should return an instance of SQSClient when environment variables are set', () => {
    process.env.AWS_REGION = 'us-east-1'
    process.env.AWS_ACCESS_KEY = 'testAccessKey'
    process.env.AWS_SECRET_KEY = 'testSecretKey'

    const client = ConnectQueueProvider()

    expect(client).toBeInstanceOf(SQSClient)
    expect(SQSClient).toHaveBeenCalledWith({
      region: 'us-east-1',
      credentials: {
        accessKeyId: 'testAccessKey',
        secretAccessKey: 'testSecretKey'
      }
    })
  })

  it('should throw HttpException when AWS_REGION is not set', () => {
    process.env.AWS_REGION = ''
    process.env.AWS_ACCESS_KEY = 'testAccessKey'
    process.env.AWS_SECRET_KEY = 'testSecretKey'

    expect(() => ConnectQueueProvider()).toThrow(HttpException)
    expect(() => ConnectQueueProvider()).toThrowError(
      new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        InternalErrorMessages.AWSClientError
      )
    )
  })

  it('should throw HttpException when AWS_ACCESS_KEY is not set', () => {
    process.env.AWS_REGION = 'us-east-1'
    process.env.AWS_ACCESS_KEY = ''
    process.env.AWS_SECRET_KEY = 'testSecretKey'

    expect(() => ConnectQueueProvider()).toThrow(HttpException)
    expect(() => ConnectQueueProvider()).toThrowError(
      new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        InternalErrorMessages.AWSClientError
      )
    )
  })

  it('should throw HttpException when AWS_SECRET_KEY is not set', () => {
    process.env.AWS_REGION = 'us-east-1'
    process.env.AWS_ACCESS_KEY = 'testAccessKey'
    process.env.AWS_SECRET_KEY = ''

    expect(() => ConnectQueueProvider()).toThrow(HttpException)
    expect(() => ConnectQueueProvider()).toThrowError(
      new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        InternalErrorMessages.AWSClientError
      )
    )
  })
})
