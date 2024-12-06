export const IncorrectFieldTypeError = (
  field: string,
  type: string
): string => {
  return `O campo ${field} deve ser um(a) ${type}.`
}
