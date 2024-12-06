import { InvalidParamError } from './invalid-param.error'

describe('InvalidParamError', () => {
  it('should return a message when param is invalid', () => {
    const message = InvalidParamError()

    expect(message).toBe(
      'Informe os parâmetros corretamentos para a requisição!'
    )
  })
})
