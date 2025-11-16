import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

/**
 * 이메일 인증 완료 DTO
 * 이메일에서 받은 인증 토큰으로 이메일 인증을 완료할 때 사용
 */
export class EmailVerificationConfirmDto {
  @ApiProperty({
    description: '이메일로 받은 인증 토큰 (UUID v4)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsString({ message: '토큰은 문자열이어야 합니다' })
  @IsNotEmpty({ message: '토큰은 필수입니다' })
  token!: string;
}
