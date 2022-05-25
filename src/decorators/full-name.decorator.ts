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
          return /^(([a-zA-Zà-úÀ-Ú][',.-áãàâéêèēeëíîìïóõôòúüùûū]*){2,})+\s+(([a-zA-Zà-úÀ-Ú\s][',.-áãàâéêèēeëíîìïóõôòúüùûū]*){2,})+$/.test(
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
