import { registerDecorator, ValidationOptions } from 'class-validator';
import { Regex } from '../config/constants';

export function IsPhone(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return new RegExp(Regex.TELEFONE).test(value);
        },
        defaultMessage(): string {
          return `$property is not valid phone`;
        },
      },
    });
  };
}
