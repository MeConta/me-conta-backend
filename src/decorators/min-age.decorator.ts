import { registerDecorator, ValidationOptions } from 'class-validator';
import * as dayjs from 'dayjs';

export function MinAge(age: number, validationOptions?: ValidationOptions) {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      name: 'isNotEmptyString',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate: (value: Date): boolean =>
          dayjs(value).isBefore(dayjs().subtract(age, 'years')),
        defaultMessage: (): string =>
          `$property must be greater or equal than ${age} years`,
      },
    });
  };
}
