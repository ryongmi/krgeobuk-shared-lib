# @krgeobuk/authz-relations

KRGeobuk Authorization Relations - 권한 관계 관리를 위한 공통 라이브러리

## 개요

이 패키지는 권한 시스템 내의 관계형 데이터 관리를 위한 공통 컴포넌트를 제공합니다.

## 포함 관계

- **role-permission**: 역할-권한 관계 관리
- **user-role**: 사용자-역할 관계 관리 (향후 추가 예정)
- **service-permission**: 서비스-권한 관계 관리 (향후 추가 예정)

## 사용법

### Role-Permission 관계

```typescript
import {
  AssignMultiplePermissionsDto,
  RevokeMultiplePermissionsDto,
  ReplaceRolePermissionsDto,
  RolePermissionDetailDto,
} from '@krgeobuk/authz-relations/role-permission/dtos';

import {
  AssignMultiplePermissions,
  RevokeMultiplePermissions,
  ReplaceRolePermissions,
  RolePermissionDetail,
} from '@krgeobuk/authz-relations/role-permission/interfaces';

import { RolePermissionResponse } from '@krgeobuk/authz-relations/role-permission/response';
import { RolePermissionError } from '@krgeobuk/authz-relations/role-permission/exception';
```

## 설치

```bash
npm install @krgeobuk/authz-relations
```

## 패키지 빌드

```bash
npm run build
```

## 로컬 배포

```bash
npm run verdaccio:publish
```