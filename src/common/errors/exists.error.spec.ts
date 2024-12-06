import { ExistsError } from '@common/errors'
import { CapitalizeFirstLetterFormat } from '@common/utils/formaters'

describe('[Errors] Exists Error', () => {
  it('should return a message with the capitalized field', () => {
    const input: string = 'field'
    const formattedInput: string = CapitalizeFirstLetterFormat(input)

    expect(ExistsError(input)).toBe(`${formattedInput} já existente!`)
  })
})
