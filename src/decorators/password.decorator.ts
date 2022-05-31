import { isEmpty, registerDecorator, ValidationOptions } from 'class-validator';

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
          if (isEmpty(value)) {
            return false;
          }
          return new RegExp(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#!])[0-9a-zA-Z$*&@#!]{8,20}$/,
          ).test(value);
        },
        defaultMessage(): string {
          return `$property is too weak`;
        },
      },
    });
  };
}
