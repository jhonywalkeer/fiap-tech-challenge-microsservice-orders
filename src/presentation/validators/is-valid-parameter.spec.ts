import { IsValidParameterValidator } from './is-valid-parameter'

describe('[Validators] Is Valid Parameter', () => {
  it('should return the value if it is valid', () => {
    const value: string = '1'
    const result: string = IsValidParameterValidator(value)
    expect(result).toBe(value)
  })

  it('should throw an error when the value is not valid', () => {
    const value: string = '1<script>'
    expect(() => IsValidParameterValidator(value)).toThrow()
  })
})
