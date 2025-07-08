# @krgeobuk/swagger

krgeobuk 서비스의 OpenAPI/Swagger 문서화 기능을 제공하는 패키지입니다.

## 개요

이 패키지는 NestJS 애플리케이션에서 일관된 API 문서화를 위한 Swagger 설정, 데코레이터, 유틸리티를 제공합니다.

## 주요 기능

### Config
- `SwaggerConfig` - Swagger 기본 설정 및 옵션

### Constants
- Swagger 관련 상수 정의

### Decorators
- `ApiBearer` - Bearer 토큰 인증 문서화
- `ApiBody` - 요청 본문 문서화
- `ApiOperation` - API 작업 설명
- `ApiParam` - 경로 매개변수 문서화
- `ApiProperty` - DTO 속성 문서화
- `ApiQuery` - 쿼리 매개변수 문서화
- `ApiResponse` - 응답 형태 문서화
- `ApiTags` - API 태그 그룹화

### Interfaces
- Swagger 데코레이터 옵션 인터페이스들
- `SwaggerOptions` - Swagger 설정 옵션 인터페이스

## 사용 방법

### Swagger 설정

```typescript
import { SwaggerConfig } from '@krgeobuk/swagger';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger 설정
  const config = SwaggerConfig.createDocumentBuilder()
    .setTitle('krgeobuk API')
    .setDescription('krgeobuk 서비스 API 문서')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
```

### 컨트롤러 문서화

```typescript
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse,
  ApiBearer,
  ApiParam,
  ApiQuery 
} from '@krgeobuk/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  @ApiOperation({
    summary: '사용자 목록 조회',
    description: '페이지네이션을 지원하는 사용자 목록을 조회합니다.'
  })
  @ApiQuery({
    name: 'page',
    description: '페이지 번호',
    required: false,
    type: Number
  })
  @ApiQuery({
    name: 'limit', 
    description: '페이지당 항목 수',
    required: false,
    type: Number
  })
  @ApiResponse({
    status: 200,
    description: '사용자 목록 조회 성공',
    type: UserListResponseDto
  })
  @Get()
  async getUsers(@Query() query: SearchQueryDto) {
    return this.usersService.findAll(query);
  }

  @ApiOperation({
    summary: '사용자 상세 조회',
    description: 'ID로 특정 사용자의 상세 정보를 조회합니다.'
  })
  @ApiParam({
    name: 'id',
    description: '사용자 ID',
    type: Number
  })
  @ApiResponse({
    status: 200,
    description: '사용자 조회 성공',
    type: UserDetailResponseDto
  })
  @ApiResponse({
    status: 404,
    description: '사용자를 찾을 수 없음'
  })
  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return this.usersService.findById(id);
  }

  @ApiOperation({
    summary: '사용자 생성',
    description: '새로운 사용자를 생성합니다.'
  })
  @ApiBearer()
  @ApiBody({
    type: CreateUserDto,
    description: '사용자 생성 데이터'
  })
  @ApiResponse({
    status: 201,
    description: '사용자 생성 성공',
    type: UserDetailResponseDto
  })
  @Post()
  @UseGuards(AccessTokenGuard)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
```

### DTO 문서화

```typescript
import { ApiProperty } from '@krgeobuk/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: '사용자 이메일',
    example: 'user@example.com',
    format: 'email'
  })
  email: string;

  @ApiProperty({
    description: '사용자 이름',
    example: '홍길동',
    minLength: 2,
    maxLength: 50
  })
  name: string;

  @ApiProperty({
    description: '비밀번호',
    example: 'password123!',
    minLength: 8,
    format: 'password'
  })
  password: string;

  @ApiProperty({
    description: '프로필 이미지 URL',
    example: 'https://example.com/profile.jpg',
    required: false
  })
  profileImageUrl?: string;
}

export class UserDetailResponseDto {
  @ApiProperty({
    description: '사용자 ID',
    example: 1
  })
  id: number;

  @ApiProperty({
    description: '사용자 이메일',
    example: 'user@example.com'
  })
  email: string;

  @ApiProperty({
    description: '사용자 이름',
    example: '홍길동'
  })
  name: string;

  @ApiProperty({
    description: '이메일 인증 여부',
    example: true
  })
  isEmailVerified: boolean;

  @ApiProperty({
    description: '생성일시',
    example: '2024-01-01T00:00:00Z'
  })
  createdAt: Date;
}
```

### 에러 응답 문서화

```typescript
import { ApiResponse } from '@krgeobuk/swagger';

@Controller('auth')
export class AuthController {
  @ApiOperation({
    summary: '로그인',
    description: '이메일과 비밀번호로 로그인합니다.'
  })
  @ApiResponse({
    status: 200,
    description: '로그인 성공',
    schema: {
      properties: {
        accessToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
        refreshToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
      }
    }
  })
  @ApiResponse({
    status: 401,
    description: '인증 실패',
    schema: {
      properties: {
        statusCode: { type: 'number', example: 401 },
        message: { type: 'string', example: '이메일 또는 비밀번호가 올바르지 않습니다.' },
        error: { type: 'string', example: 'Unauthorized' }
      }
    }
  })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
```

## 의존성

### Peer Dependencies (호스트 프로젝트에서 설치 필요)
```bash
pnpm add @nestjs/common @nestjs/core @nestjs/swagger class-validator class-transformer typescript
```

### Workspace Dependencies
- `@krgeobuk/core` - 기본 기능

## 빌드

```bash
pnpm build
```

## 로컬 게시

```bash
pnpm verdaccio:publish
```