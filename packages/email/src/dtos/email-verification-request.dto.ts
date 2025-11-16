import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

/**
 * 이메일 인증 요청 DTO
 * 회원가입 후 이메일 인증 메일을 재발송할 때 사용
 */
export class EmailVerificationRequestDto {
  @ApiProperty({
    description: '인증 메일을 받을 이메일 주소',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: '올바른 이메일 형식이 아닙니다' })
  @IsNotEmpty({ message: '이메일은 필수입니다' })
  email!: string;
}
