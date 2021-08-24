import {
  buildMessage,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

export function IsValidProperty(
  validatorFn: (value) => boolean,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isValidProperty',
      target: object,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return validatorFn(value);
        },
        defaultMessage: buildMessage(
          () => `$property is not valid`,
          validationOptions,
        ),
      },
    });
  };
}
