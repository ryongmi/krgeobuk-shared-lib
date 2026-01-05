# @krgeobuk/account-merge

계정 병합 워크플로우를 위한 TCP 통신 인터페이스 및 패턴

## 개요

krgeobuk 생태계에서 여러 마이크로서비스에 걸친 계정 병합 분산 트랜잭션 처리를 위한 공통 패키지입니다.

## 아키텍처

```
auth-server (Orchestrator)
    ├─> authz-server  (user-role.merge-user-roles)
    └─> my-pick-server (account-merge.merge-user-data)
```

## 설치

```bash
pnpm add @krgeobuk/account-merge
```

## 사용 예시

### auth-server (Orchestrator)

```typescript
import { AccountMergeTcpPatterns } from '@krgeobuk/account-merge/tcp/patterns';

// my-pick-server 호출
await this.myPickClient.send(
  AccountMergeTcpPatterns.MERGE_USER_DATA,
  { sourceUserId, targetUserId }
);
```

### my-pick-server (TCP Controller)

```typescript
import {
  AccountMergeTcpPatterns,
  TcpMergeUserData
} from '@krgeobuk/account-merge/tcp';

@Controller()
export class AccountMergeTcpController {
  @MessagePattern(AccountMergeTcpPatterns.MERGE_USER_DATA)
  async mergeUserData(@Payload() data: TcpMergeUserData): Promise<void> {
    await this.accountMergeService.mergeUserData(
      data.sourceUserId,
      data.targetUserId
    );
  }
}
```

## TCP 패턴

| 패턴 | 서비스 | 설명 |
|------|--------|------|
| `MERGE_USER_DATA` | my-pick-server | 사용자 구독, 인터랙션 데이터 병합 |

## 향후 확장

계정 병합 외 다른 분산 워크플로우:
- `@krgeobuk/account-deletion` - 계정 삭제
- `@krgeobuk/data-migration` - 데이터 마이그레이션
- `@krgeobuk/user-sync` - 사용자 동기화
