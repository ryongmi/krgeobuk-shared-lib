# @krgeobuk/database-config

NestJS 프로젝트에서 TypeORM(MySQL)과 Redis를 손쉽게 설정하고 사용할 수 있도록 도와주는 공통 데이터베이스 패키지입니다.

---

## 주요 특징

- **TypeORM(MySQL) 설정 팩토리 제공**  
  환경변수 기반의 유연한 DB 연결 설정, SnakeNamingStrategy, 마이그레이션, 타임존 등 실무 옵션 지원
- **Redis 모듈/Provider 및 토큰 상수 제공**  
  DI 기반의 Redis 클라이언트 주입, 커스텀 토큰 지원, 토큰 상수(`REDIS_CLIENT_TOKEN`) 제공
- **NestJS 친화적 구조**  
  forRootAsync 패턴, 모듈화된 구조, 환경변수 연동

---

## 설치 방법

```sh
pnpm add @krgeobuk/database-config
pnpm add @nestjs/common @nestjs/config @nestjs/typeorm typeorm ioredis
```

> **참고:**
>
> - 이 패키지는 NestJS, TypeORM, ioredis 등과 함께 사용해야 하므로 peerDependencies에 명시된 패키지도 반드시 설치해야 합니다.

---

## 사용법 (다른 프로젝트에서의 예시)

### 1. DB 모듈 생성 및 AppModule에서 사용

```typescript
// db.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createTypeOrmConfig } from '@krgeobuk/database-config';

@Module({
  imports: [TypeOrmModule.forRootAsync(createTypeOrmConfig([__dirname + '/**/*.entity{.ts,.js}']))],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
```

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { DatabaseModule } from './db.module';

@Module({
  imports: [
    DatabaseModule,
    // ...다른 모듈
  ],
})
export class AppModule {}
```

---

### 2. Redis 모듈 생성 및 AppModule에서 사용 (토큰 상수 활용)

```typescript
// redis.constants.ts (공통 패키지에서 export됨)
export const REDIS_CLIENT_TOKEN = 'REDIS_CLIENT';

// redis.module.ts (실제 프로젝트)
import { Module } from '@nestjs/common';
import { SharedRedisModule, REDIS_CLIENT_TOKEN } from '@krgeobuk/database-config';
import { RedisService } from './redis.service';

@Module({
  imports: [SharedRedisModule.register(REDIS_CLIENT_TOKEN)],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
```

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { RedisModule } from './redis.module';

@Module({
  imports: [
    RedisModule,
    // ...다른 모듈
  ],
})
export class AppModule {}
```

- `register()`의 인자로 커스텀 토큰을 지정할 수 있습니다(기본값: `'REDIS_CLIENT'`).
- 토큰 상수는 `@krgeobuk/database-config`에서 import하여 일관되게 관리할 수 있습니다.

#### RedisService 사용 예시

```typescript
import { Injectable, Inject } from '@nestjs/common';
import { Redis } from 'ioredis';
import { REDIS_CLIENT_TOKEN } from '@krgeobuk/database-config';

@Injectable()
export class RedisService {
  constructor(@Inject(REDIS_CLIENT_TOKEN) private readonly redisClient: Redis) {}

  // state 값 저장, 지정한 초(expire) 동안 만료
  async setExValue(state: string, expire: number, value: string | number | Buffer): Promise<void> {
    await this.redisClient.setex(state, expire, value);
  }

  async setValue(key: string, value: string): Promise<void> {
    await this.redisClient.set(key, value);
  }

  async getValue(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }

  async deleteValue(key: string): Promise<void> {
    await this.redisClient.del(key);
  }
}
```

- `@Inject(REDIS_CLIENT_TOKEN)`로 Redis 클라이언트를 주입받아 사용합니다.
- 다양한 Redis 명령을 메서드로 래핑하여 서비스에서 활용할 수 있습니다.

---

## 환경변수 예시

### [DB - MySQL(TypeORM) 환경변수]

```env
DB_MYSQL_HOST=localhost
DB_MYSQL_PORT=3306
DB_MYSQL_USERNAME=root
DB_MYSQL_PASSWORD=secret
DB_MYSQL_NAME=mydb
DB_MYSQL_SYNCHRONIZE=false
DB_MYSQL_LOGGING=true
DB_MYSQL_MIGRATIONS=dist/migrations/*.js
DB_MYSQL_TIMEZONE=+09:00
DB_MYSQL_CHARSET=utf8mb4
```

### [Redis 환경변수]

```env
DB_REDIS_HOST=localhost
DB_REDIS_PORT=6379
DB_REDIS_PASSWORD=yourpassword
DB_REDIS_DB=0
```

- 실제 사용하는 환경변수 키는 프로젝트의 `ConfigService` 설정에 따라 다를 수 있습니다.
- 필요에 따라 추가 옵션(예: TLS, 클러스터 등)도 환경변수로 확장 가능합니다.

---

## 기타 안내

- TypeORM, Redis 외에 추가 DB/캐시 모듈이 필요하다면 확장 가능합니다.
- 환경변수 키는 프로젝트 정책에 맞게 커스터마이즈할 수 있습니다.
- 실무에서 자주 쓰는 옵션(entities, migrations, timezone, charset 등)이 기본 적용되어 있습니다.

---

> 궁금한 점이나 개선 요청은 언제든 이슈로 남겨주세요!
