import { FieldIncorrectError } from './field-incorrect.error'

describe('[Errors] Field Incorrect Error', () => {
  it('should return a message when field is incorrect', () => {
    const input: string = 'field'

    expect(FieldIncorrectError(input)).toBe(
      `Campo ${input} precisa ser informado corretamente.`
    )
  })
})
