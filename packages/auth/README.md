# @krgeobuk/auth

krgeobuk 서비스의 인증 관련 기능을 제공하는 패키지입니다.

## 개요

이 패키지는 사용자 인증 (로그인, 회원가입) 관련 DTO, 인터페이스, 예외 처리, 응답 포맷을 제공합니다.

## 주요 기능

### DTOs (Data Transfer Objects)
- `LoginRequestDto` - 로그인 요청 데이터
- `LoginResponseDto` - 로그인 응답 데이터  
- `SignupRequestDto` - 회원가입 요청 데이터
- `RefreshResponseDto` - 토큰 갱신 응답 데이터

### Interfaces
- `ILoginRequest` - 로그인 요청 인터페이스
- `ILoginResponse` - 로그인 응답 인터페이스
- `ISignupRequest` - 회원가입 요청 인터페이스
- `IRefreshResponse` - 토큰 갱신 응답 인터페이스

### Exception Handling
- `AuthError` - 인증 관련 오류 코드
- `AuthException` - 인증 관련 예외 클래스

### Response
- `AuthResponse` - 인증 관련 응답 포맷

## 사용 방법

```typescript
import { 
  LoginRequestDto, 
  LoginResponseDto,
  SignupRequestDto,
  AuthException,
  AuthResponse 
} from '@krgeobuk/auth';

// 로그인 요청 DTO 사용
const loginRequest = new LoginRequestDto();
loginRequest.email = 'user@example.com';
loginRequest.password = 'password123';

// 인증 예외 처리
try {
  // 인증 로직
} catch (error) {
  throw new AuthException('로그인에 실패했습니다.');
}
```

## 의존성

### Peer Dependencies (호스트 프로젝트에서 설치 필요)
```bash
pnpm add @nestjs/common @nestjs/core class-validator class-transformer typescript
```

### Workspace Dependencies
- `@krgeobuk/core` - 기본 기능
- `@krgeobuk/shared` - 공유 DTO 및 인터페이스
- `@krgeobuk/jwt` - JWT 관련 기능

## 빌드

```bash
pnpm build
```

## 로컬 게시

```bash
pnpm verdaccio:publish
```