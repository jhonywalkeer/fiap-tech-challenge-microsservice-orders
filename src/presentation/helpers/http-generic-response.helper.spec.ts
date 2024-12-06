import { StatusCode } from '@common/enums'
import { HttpGenericResponse } from '@presentation/helpers'

describe('HttpGenericResponse', () => {
  it('should return a response with body and status code', async () => {
    const genericResponse = new HttpGenericResponse()
    const body = {
      message: 'Hello, World!'
    }
    const statusCode = StatusCode.Sucess
    const message = 'Success'

    const response = await genericResponse.response(body, statusCode, message)

    expect(response).toEqual({
      body,
      statusCode,
      message
    })
  })
})
