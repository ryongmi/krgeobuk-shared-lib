import {
  // BadRequestException,
  HttpException,
  // HttpStatus,
  NotFoundException,
  UnauthorizedException,
  // InternalServerErrorException,
  // ForbiddenException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';

export class UserException {
  static userNotFound(): HttpException {
    return new NotFoundException('사용자를 찾을 수 없습니다.');
  }

  static emailAlreadyInUse(): HttpException {
    return new ConflictException('이메일이 사용중입니다.');
  }

  static idOrEmailAlreadyInUse(): HttpException {
    return new ConflictException('아이디나 이메일이 사용중입니다.');
  }

  static invalidLoginInfo(): HttpException {
    return new UnauthorizedException('로그인 정보가 일치하지 않습니다.');
  }

  static forbidden(): HttpException {
    return new ForbiddenException('해당 유저에 권한이 없습니다.');
  }
}
