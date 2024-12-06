import { ValueIncorrectError } from '@common/errors'

describe('[Errors] Value Incorrect Error', () => {
  it('should return a message with the field and value', () => {
    const input: string = 'property'

    expect(ValueIncorrectError(input)).toBe(
      `Valor da propriedade ${input} informado não é válido`
    )
  })
})
