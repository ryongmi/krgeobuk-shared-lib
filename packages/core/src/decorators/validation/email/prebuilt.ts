import { IsEmailWithDomain } from './is-email-with-domain.validator.js';

export const IsNaverEmail = (
  options?: Parameters<typeof IsEmailWithDomain>[1]
): PropertyDecorator => IsEmailWithDomain('naver.com', options);

export const IsGoogleEmail = (
  options?: Parameters<typeof IsEmailWithDomain>[1]
): PropertyDecorator => IsEmailWithDomain('gmail.com', options);

export const IsDaumEmail = (options?: Parameters<typeof IsEmailWithDomain>[1]): PropertyDecorator =>
  IsEmailWithDomain('daum.net', options);
