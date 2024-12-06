import { CapitalizeFirstLetterFormat } from '@common/utils/formaters'

export const ExistsError = (field: string): string => {
  return `${CapitalizeFirstLetterFormat(field)} já existente!`
}
