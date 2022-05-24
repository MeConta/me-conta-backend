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
          return /^[1-9]{2}(?:[2-8]|9[1-9])[0-9]{3}[0-9]{4}$/.test(value);
        },
        defaultMessage(): string {
          return `$property is not valid phone`;
        },
      },
    });
  };
}
