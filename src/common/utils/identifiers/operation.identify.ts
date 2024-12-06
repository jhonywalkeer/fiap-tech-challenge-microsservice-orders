import { Operation } from '@common/enums'

export const OperationIdentify = (operation: string): string => {
  switch (operation) {
    case Operation.Find:
      return 'buscar'
    case Operation.Create:
      return 'criar'
    case Operation.Update:
      return 'atualizar'
    case Operation.Delete:
      return 'deletar'
    default:
      return operation
  }
}
