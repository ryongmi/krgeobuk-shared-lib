# @krgeobuk/oauth

krgeobuk 서비스의 OAuth 소셜 로그인 기능을 제공하는 패키지입니다.

## 개요

이 패키지는 Google, Naver OAuth 인증을 위한 DTO, 인터페이스, 유효성 검증, 예외 처리를 제공합니다.

## 지원하는 OAuth 제공자

### Google OAuth
- 로그인 콜백 처리
- 액세스 토큰 관리
- 사용자 프로필 정보 조회

### Naver OAuth
- 로그인 콜백 처리
- 액세스 토큰 관리
- 사용자 프로필 정보 조회

## 주요 기능

### Codes
- `OAuthCode` - OAuth 관련 코드 상수

### Decorators
- **Google Validation**:
  - 콜백 검증 (`Code`, `State`)
  - 토큰 검증 (`AccessToken`, `ExpiresIn`, `RefreshToken`, `Scope`, `TokenId`, `TokenType`)
  - 사용자 프로필 검증 (`Email`, `EmailVerified`, `FamilyName`, `GivenName`, `Id`, `Locale`, `Name`, `Picture`)
- **Naver Validation**:
  - 콜백 검증 (`Code`, `State`)
  - 토큰 검증 (`AccessToken`, `ExpiresIn`, `RefreshToken`, `TokenType`)
  - 사용자 프로필 검증 (`Age`, `Birthday`, `Birthyear`, `Email`, `Gender`, `Id`, `Mobile`, `Name`, `Nickname`, `ProfileImage`)

### DTOs
- **Account**: `SearchResultDto`
- **Google**: `CallbackQueryDto`, `TokenResponseDto`, `UserProfileResponseDto`
- **Naver**: `CallbackQueryDto`, `TokenResponseDto`, `UserProfileResponseDto`

### Enums
- `GoogleEnum` - Google OAuth 관련 enum
- `NaverEnum` - Naver OAuth 관련 enum

### Exception Handling
- `OAuthError` - OAuth 관련 오류 코드
- `OAuthException` - OAuth 관련 예외 클래스

### Interfaces
- **Account**: 계정 필터링 및 검색 결과 인터페이스
- **Google**: 콜백, 토큰, 사용자 프로필 인터페이스
- **Naver**: 콜백, 토큰, 사용자 프로필 인터페이스

### Messages
- `OAuthMessage` - OAuth 관련 메시지

### Response
- `OAuthResponse` - OAuth 관련 응답 포맷

## 사용 방법

### Google OAuth 콜백 처리

```typescript
import { GoogleCallbackQueryDto } from '@krgeobuk/oauth';

@Controller('auth/google')
export class GoogleAuthController {
  @Get('callback')
  async handleCallback(@Query() query: GoogleCallbackQueryDto) {
    // Google OAuth 콜백 처리
    const { code, state } = query;
    // 토큰 교환 및 사용자 정보 조회
  }
}
```

### Naver OAuth 콜백 처리

```typescript
import { NaverCallbackQueryDto } from '@krgeobuk/oauth';

@Controller('auth/naver')
export class NaverAuthController {
  @Get('callback')
  async handleCallback(@Query() query: NaverCallbackQueryDto) {
    // Naver OAuth 콜백 처리
    const { code, state } = query;
    // 토큰 교환 및 사용자 정보 조회
  }
}
```

### 사용자 프로필 검증

```typescript
import { 
  GoogleUserProfileResponseDto,
  NaverUserProfileResponseDto 
} from '@krgeobuk/oauth';

// Google 사용자 프로필
class GoogleProfile extends GoogleUserProfileResponseDto {
  // 자동으로 검증 적용됨
}

// Naver 사용자 프로필
class NaverProfile extends NaverUserProfileResponseDto {
  // 자동으로 검증 적용됨
}
```

### OAuth 예외 처리

```typescript
import { OAuthException, OAuthError } from '@krgeobuk/oauth';

try {
  // OAuth 처리 로직
} catch (error) {
  throw new OAuthException(OAuthError.INVALID_TOKEN);
}
```

## 환경 변수

### Google OAuth
```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
```

### Naver OAuth
```env
NAVER_CLIENT_ID=your-naver-client-id
NAVER_CLIENT_SECRET=your-naver-client-secret
NAVER_REDIRECT_URI=http://localhost:3000/auth/naver/callback
```

## 의존성

### Peer Dependencies (호스트 프로젝트에서 설치 필요)
```bash
pnpm add @nestjs/common @nestjs/core class-validator class-transformer typescript
```

### Workspace Dependencies
- `@krgeobuk/core` - 기본 기능
- `@krgeobuk/shared` - 공유 DTO 및 인터페이스
- `@krgeobuk/swagger` - API 문서화

## 빌드

```bash
pnpm build
```

## 로컬 게시

```bash
pnpm verdaccio:publish
```