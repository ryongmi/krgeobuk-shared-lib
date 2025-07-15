# Authorization 기능 이전 안내

⚠️ **중요 공지**: Authorization 관련 기능이 `@krgeobuk/authorization` 패키지로 이전되었습니다.

## 이전된 기능들

기존에 `@krgeobuk/core`에 포함되어 있던 다음 기능들이 독립 패키지로 분리되었습니다:

- **`@RequirePermission`**: 특정 권한(action)이 필요한 엔드포인트 표시
- **`@RequireRole`**: 특정 역할이 필요한 엔드포인트 표시  
- **`AuthorizationGuard`**: 실제 권한 체크를 수행하는 가드
- **`AuthorizationService`**: 권한 체크 로직을 구현해야 하는 인터페이스

## 마이그레이션 가이드

### 기존 import 문 변경

```typescript
// Before - 기존 방식
import { 
  AuthorizationGuard, 
  RequirePermission, 
  RequireRole 
} from '@krgeobuk/core';

// After - 새로운 방식
import { AuthorizationGuard } from '@krgeobuk/authorization/guards';
import { RequirePermission, RequireRole } from '@krgeobuk/authorization/decorators';
```

### 새로운 패키지 설치

```bash
pnpm add @krgeobuk/authorization
```

## 새로운 Authorization 패키지의 개선사항

- **마이크로서비스 아키텍처 지원**: TCP 기반 권한 검증 서비스 통신
- **향상된 에러 처리**: 구체적인 에러 분류 및 메시지
- **성능 최적화**: 캐싱, 타임아웃, 배치 처리 지원
- **환경별 설정**: 개발/프로덕션 환경 구분
- **개발자 친화적**: 상세한 로깅 및 디버깅 정보

## 자세한 사용법

새로운 `@krgeobuk/authorization` 패키지의 자세한 사용법은 해당 패키지의 README.md를 참조하세요:

```bash
# 패키지 문서 확인
cat shared-lib/packages/authorization/README.md
```

## 기술 지원

마이그레이션 과정에서 문제가 발생하면 개발팀에 문의하세요.