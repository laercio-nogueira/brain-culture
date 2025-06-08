import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator'

export function isValidAreaTotal(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidAreaTotal',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(_: any, args: ValidationArguments) {
          const { totalArea, cultivatedArea, vegetatedArea } =
            args.object as any
          return cultivatedArea + vegetatedArea <= totalArea
        },
        defaultMessage(args: ValidationArguments) {
          const { totalArea, cultivatedArea, vegetatedArea } =
            args.object as any
          return `A soma da área cultivada (${cultivatedArea}) e da vegetação (${vegetatedArea}) excede a área total (${totalArea}).`
        },
      },
    })
  }
}
