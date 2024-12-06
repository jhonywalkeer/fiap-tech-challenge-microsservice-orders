import { Controller } from '@application/protocols/http'
import { StatusCode } from '@common/enums'

export const ControllerMock = {
  handle: jest.fn().mockResolvedValue({
    statusCode: StatusCode.Sucess,
    body: { data: {} }
  })
} as Controller<any>
