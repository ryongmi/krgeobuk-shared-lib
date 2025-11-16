import { Injectable, Logger } from '@nestjs/common';

import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

import { EmailException } from '../exception/index.js';
import type { EmailTemplateData } from '../interfaces/index.js';

@Injectable()
export class TemplateLoaderService {
  private readonly logger = new Logger(TemplateLoaderService.name);
  private readonly templates: Map<string, handlebars.TemplateDelegate> = new Map();

  /**
   * 템플릿 파일 로드 및 컴파일
   * @param templatePath 템플릿 파일 경로
   * @param templateName 템플릿 이름 (캐싱 키)
   */
  loadTemplate(templatePath: string, templateName: string): handlebars.TemplateDelegate {
    // 캐시된 템플릿 확인
    if (this.templates.has(templateName)) {
      return this.templates.get(templateName)!;
    }

    try {
      // 템플릿 파일 읽기
      if (!fs.existsSync(templatePath)) {
        this.logger.error(`Template file not found: ${templatePath}`);
        throw EmailException.templateNotFound();
      }

      const templateSource = fs.readFileSync(templatePath, 'utf-8');

      // Handlebars 컴파일
      const template = handlebars.compile(templateSource);

      // 캐싱
      this.templates.set(templateName, template);

      this.logger.log(`Template loaded and compiled: ${templateName}`);
      return template;
    } catch (error) {
      if (error instanceof Error && error.message.includes('EMAIL_')) {
        throw error; // EmailException은 그대로 전파
      }

      this.logger.error(`Failed to compile template: ${templateName}`, {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw EmailException.templateCompileError();
    }
  }

  /**
   * 템플릿 렌더링
   * @param templateName 템플릿 이름
   * @param data 템플릿 데이터
   */
  renderTemplate(templateName: string, data: EmailTemplateData): string {
    const template = this.templates.get(templateName);

    if (!template) {
      this.logger.error(`Template not found in cache: ${templateName}`);
      throw EmailException.templateNotFound();
    }

    try {
      return template(data);
    } catch (error) {
      this.logger.error(`Failed to render template: ${templateName}`, {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw EmailException.templateRenderError();
    }
  }

  /**
   * 캐시 클리어
   */
  clearCache(): void {
    this.templates.clear();
    this.logger.log('Template cache cleared');
  }

  /**
   * 특정 템플릿 캐시 삭제
   * @param templateName 템플릿 이름
   */
  removeTemplate(templateName: string): void {
    this.templates.delete(templateName);
    this.logger.log(`Template removed from cache: ${templateName}`);
  }
}
