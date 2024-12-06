import { OperationIdentify } from '@common/utils/identifiers'

export const NotOccurredError = (operation: string, field: string): string => {
  return `Ao tentar ${OperationIdentify(operation)} ${field}, não foi possível realizar a operação!`
}
