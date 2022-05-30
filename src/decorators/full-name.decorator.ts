import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsFullName(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return new RegExp(/^((\w|[à-ú]){3,} (\w|[à-ú]|'){3,})/, 'si').test(
            value,
          );
        },
        defaultMessage(): string {
          return `$property must be a full name`;
        },
      },
    });
  };
}
