# @krgeobuk/jwt

krgeobuk 서비스의 JWT 토큰 관리 기능을 제공하는 패키지입니다.

## 개요

이 패키지는 JWT 토큰 생성, 검증, 디코딩 및 관련 가드, 데코레이터를 제공합니다.

## 주요 기능

### Codes
- `JwtCode` - JWT 관련 코드 상수

### Decorators
- `CurrentJwt` - 현재 JWT 토큰 정보 추출
- **Validation**:
  - `AccessToken` - 액세스 토큰 검증
  - `RefreshToken` - 리프레시 토큰 검증

### Exception Handling
- `JwtError` - JWT 관련 오류 코드
- `JwtException` - JWT 관련 예외 클래스

### Guards
- `AccessTokenGuard` - 액세스 토큰 가드

### Interfaces
- `IJwtPayload` - JWT 페이로드 인터페이스
- `ITokenPair` - 토큰 쌍 인터페이스
- `IDecodeTokenOption` - 토큰 디코딩 옵션 인터페이스

### Messages
- `JwtMessage` - JWT 관련 메시지

### Response
- `JwtResponse` - JWT 관련 응답 포맷

### Types
- `Token` - 토큰 타입 정의

### Utils
- `decodeAccessToken` - 액세스 토큰 디코딩 유틸리티

## 사용 방법

### 가드 적용

```typescript
import { AccessTokenGuard } from '@krgeobuk/jwt';

@Controller('protected')
@UseGuards(AccessTokenGuard)
export class ProtectedController {
  @Get()
  getProtectedData() {
    return { message: '보호된 데이터' };
  }
}
```

### 현재 JWT 정보 추출

```typescript
import { CurrentJwt } from '@krgeobuk/jwt';

@Controller('user')
export class UserController {
  @Get('profile')
  @UseGuards(AccessTokenGuard)
  getProfile(@CurrentJwt() payload: IJwtPayload) {
    return { userId: payload.userId, email: payload.email };
  }
}
```

### 토큰 디코딩

```typescript
import { decodeAccessToken } from '@krgeobuk/jwt';

const token = 'your-jwt-token';
const payload = decodeAccessToken(token);
console.log(payload.userId, payload.email);
```

### 검증 데코레이터

```typescript
import { AccessToken, RefreshToken } from '@krgeobuk/jwt';

class TokenDto {
  @AccessToken()
  accessToken: string;

  @RefreshToken()
  refreshToken: string;
}
```

## 환경 변수

```env
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1h
JWT_REFRESH_SECRET=your-refresh-secret
JWT_REFRESH_EXPIRES_IN=7d
```

## 의존성

### Runtime Dependencies
- `jsonwebtoken` - JWT 토큰 생성/검증 라이브러리

### Peer Dependencies (호스트 프로젝트에서 설치 필요)
```bash
pnpm add @nestjs/common @nestjs/core @types/express class-validator class-transformer typescript
```

### Workspace Dependencies
- `@krgeobuk/core` - 기본 기능
- `@krgeobuk/swagger` - API 문서화

## 빌드

```bash
pnpm build
```

## 로컬 게시

```bash
pnpm verdaccio:publish
```