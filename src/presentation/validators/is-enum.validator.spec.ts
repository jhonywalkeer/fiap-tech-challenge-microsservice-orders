import { IsEnumValidator } from '@presentation/validators'

describe('[Validators] Is Enum', () => {
  it('should return the value if it is in the enum', () => {
    const value: string = 'example'
    const identifier: any = {
      example: 'example'
    }
    const property: string = 'example'
    const result: string = IsEnumValidator(value, identifier, property)
    expect(result).toBe(value)
  })
})
