import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsPhone(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return /(^\d{10}$)|(^\d{11}$)/.test(value);
        },
        defaultMessage(): string {
          return `$property is not valid phone`;
        },
      },
    });
  };
}
