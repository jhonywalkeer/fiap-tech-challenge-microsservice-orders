import { CapitalizeFirstLetterFormat } from './capitalize-first-letter.format'

describe('[Formaters] Capitalize First Letter Format', () => {
  it('should capitalize the first letter of a word', () => {
    expect(CapitalizeFirstLetterFormat('word')).toBe('Word')
  })
})
