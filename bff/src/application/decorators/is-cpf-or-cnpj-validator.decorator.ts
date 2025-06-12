import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator'
import { cpf, cnpj } from 'cpf-cnpj-validator'

export function IsCpfOrCnpj(
  documentTypeField: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isCpfOrCnpj',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [documentTypeField],
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (value.length === 11) {
            return cpf.isValid(value)
          } else if (value.length === 14) {
            return cnpj.isValid(value)
          }
          return false
        },

        defaultMessage(args: ValidationArguments) {
          const [documentTypeField] = args.constraints

          return documentTypeField ?? 'Formato de Documento Inválido'
        },
      },
    })
  }
}
