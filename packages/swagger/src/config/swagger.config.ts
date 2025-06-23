import { DocumentBuilder, SwaggerModule, type OpenAPIObject } from '@nestjs/swagger';
import { SWAGGER_AUTH_NAME } from '../constants/index.js';
import type { SwaggerOptions } from '../interface/index.js';

// OpenAPIObject - 추후 Swagger 문서화에 사용할 수도 있어서 정의만 해놓음
export function setupSwagger({ app, configService }: SwaggerOptions): void | OpenAPIObject {
  const swaggerTitle = configService.get<string>('swaggerTitle') || 'API Documentation';
  const swaggerDescription =
    configService.get<string>('swaggerDescription') || 'API documentation for the application';
  const swaggerVersion = configService.get<string>('swaggerVersion') || '1.0';
  const swaggerPath = configService.get<string>('swaggerPath') || 'api-docs';

  const options = new DocumentBuilder()
    .setTitle(swaggerTitle)
    .setDescription(swaggerDescription)
    .setVersion(swaggerVersion)
    .addBearerAuth(
      {
        type: 'http', // 인증 방식: HTTP
        scheme: 'bearer', // 인증 스키마: bearer
        bearerFormat: 'JWT', // 토큰 형식: JWT
        in: 'header', // 위치: 요청 헤더
      },
      SWAGGER_AUTH_NAME // 스키마 이름 (이걸로 컨트롤러에서 @ApiBearerAuth()에 사용)
    )
    .setContact('geobuk', 'https://your-portfolio.com', 'you@example.com')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  // SwaggerModule.setup('api-docs', app, document);
  SwaggerModule.setup(swaggerPath, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  // return document; // 필요하면 추후 문서 객체 반환할 수 있음
}
