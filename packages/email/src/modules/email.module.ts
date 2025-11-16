import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { emailConfig } from '../config/index.js';
import { EmailService } from '../services/index.js';
import { TemplateLoaderService } from '../templates/index.js';

@Module({
  imports: [ConfigModule.forFeature(emailConfig)],
  providers: [EmailService, TemplateLoaderService],
  exports: [EmailService, TemplateLoaderService],
})
export class EmailModule implements OnModuleInit {
  constructor(private readonly emailService: EmailService) {}

  /**
   * 모듈 초기화 시 공통 패키지의 모든 템플릿 자동 로드
   */
  onModuleInit(): void {
    this.emailService.loadAllTemplates();
  }
}
