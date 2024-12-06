import { InvalidBodyError } from '@common/errors'

describe('[Errors] Incorrect Body Error', () => {
  it('should return a message for incorrect body', () => {
    expect(InvalidBodyError()).toBe(
      'Informe as propriedades corretas do body para a requisição!'
    )
  })
})
