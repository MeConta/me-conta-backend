import { registerDecorator, ValidationOptions } from 'class-validator';
import * as zxcvbn from 'zxcvbn';

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
        validate(value: any) {
          return (
            zxcvbn(value).score > (minScore || +process.env.PASSWORD_STRENGTH)
          );
        },
        defaultMessage(): string {
          return `$property is too weak`;
        },
      },
    });
  };
}
