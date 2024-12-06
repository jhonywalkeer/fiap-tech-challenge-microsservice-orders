import { IsNumberValidator } from './is-number.validator'

describe('[Validators] Is Number', () => {
  it('should return a number', () => {
    const value = 1
    const identifier = 'exemple_identifier'
    const result = IsNumberValidator(value, identifier)
    expect(result).toBe(value)
  })

  it('should throw an error when the value is not a number', () => {
    const value = '1'
    const identifier = 'exemple_identifier'
    expect(() => IsNumberValidator(value, identifier)).toThrow()
  })
})
