import { registerDecorator, ValidationOptions } from 'class-validator';

type Constructor = new (...args: unknown[]) => unknown;

/**
 * 지정한 도메인의 이메일인지 검사하는 validator
 */
export function IsEmailWithDomain(
  domain: string,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return function (target: object, propertyKey: string | symbol): void {
    registerDecorator({
      name: 'isEmailWithDomain',
      target: (target as { constructor: Constructor }).constructor,
      propertyName: propertyKey.toString(),
      options: validationOptions,
      validator: {
        validate(value: unknown): boolean {
          return (
            typeof value === 'string' && value.toLowerCase().endsWith(`@${domain.toLowerCase()}`)
          );
        },
        defaultMessage(): string {
          return `${domain} 도메인의 이메일만 허용됩니다`;
        },
      },
    });
  };
}
