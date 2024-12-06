import { Operation } from '@common/enums'
import { OperationIdentify } from '@common/utils/identifiers'

describe('[Utils] Operation Identify', () => {
  it('should return "buscar" when the operation is "find"', () => {
    const operation = Operation.Find

    expect(OperationIdentify(operation)).toBe('buscar')
  })

  it('should return "criar" when the operation is "create"', () => {
    const operation = Operation.Create

    expect(OperationIdentify(operation)).toBe('criar')
  })

  it('should return "atualizar" when the operation is "update"', () => {
    const operation = Operation.Update

    expect(OperationIdentify(operation)).toBe('atualizar')
  })

  it('should return "deletar" when the operation is "delete"', () => {
    const operation = Operation.Delete

    expect(OperationIdentify(operation)).toBe('deletar')
  })

  it('should return the operation when the operation is not recognized', () => {
    const operation = 'operation'

    expect(OperationIdentify(operation)).toBe(operation)
  })
})
