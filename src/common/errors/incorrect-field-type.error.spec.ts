import { IncorrectFieldTypeError } from './incorrect-field-type.error'

describe('[Errors] Incorrect Field Type Error', () => {
  it('should return a message when field type is incorrect', () => {
    const field: string = 'test_field'
    const type: string = 'test_type'

    expect(IncorrectFieldTypeError(field, type)).toBe(
      `O campo ${field} deve ser um(a) ${type}.`
    )
  })
})
