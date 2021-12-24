import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsPasswordStrong(
  minScore?: number,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/.test(
            value,
          );
        },
        defaultMessage(): string {
          return `$property is too weak`;
        },
      },
    });
  };
}
