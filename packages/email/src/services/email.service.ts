import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import type { EmailConfig } from '../interfaces/email-config.interface.js';
import type { SendEmailOptions, SendEmailResult } from '../interfaces/email-template.interface.js';
import { EmailException } from '../exception/index.js';
import { TemplateLoaderService } from '../templates/index.js';

// ESM에서 __dirname 대체
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter | null = null;

  constructor(
    private readonly configService: ConfigService,
    private readonly templateLoader: TemplateLoaderService
  ) {
    this.initializeTransporter();
  }

  /**
   * Nodemailer 트랜스포터 초기화
   */
  private initializeTransporter(): void {
    const emailConfig = this.configService.get<EmailConfig>('email');

    if (!emailConfig || !emailConfig.smtp.auth.user || !emailConfig.smtp.auth.pass) {
      this.logger.warn(
        'Email configuration not found or incomplete. Email service will be disabled.'
      );
      return;
    }

    this.transporter = nodemailer.createTransport({
      host: emailConfig.smtp.host,
      port: emailConfig.smtp.port,
      secure: emailConfig.smtp.secure,
      auth: {
        user: emailConfig.smtp.auth.user,
        pass: emailConfig.smtp.auth.pass,
      },
    });

    this.logger.log(
      `Email transporter initialized: ${emailConfig.smtp.host}:${emailConfig.smtp.port}`
    );
  }

  /**
   * 템플릿 로드 (각 서비스에서 호출)
   * @param templatePath 템플릿 파일 절대 경로
   * @param templateName 템플릿 이름
   */
  loadTemplate(templatePath: string, templateName: string): void {
    this.templateLoader.loadTemplate(templatePath, templateName);
  }

  /**
   * 공통 패키지의 모든 템플릿 자동 로드
   * templates/files/ 디렉토리에 있는 모든 .hbs 파일을 자동으로 등록
   */
  loadAllTemplates(): void {
    try {
      const templatesDir = join(__dirname, '../templates/files');

      if (!fs.existsSync(templatesDir)) {
        this.logger.warn(`Templates directory not found: ${templatesDir}`);
        return;
      }

      const templateFiles = fs.readdirSync(templatesDir).filter((file) => file.endsWith('.hbs'));

      templateFiles.forEach((file) => {
        const templateName = file.replace('.hbs', '');
        const templatePath = join(templatesDir, file);
        this.loadTemplate(templatePath, templateName);
        this.logger.log(`Template loaded: ${templateName}`);
      });

      this.logger.log(`Total ${templateFiles.length} templates loaded from shared package`);
    } catch (error) {
      this.logger.error('Failed to load all templates', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * 이메일 발송 (템플릿 사용)
   * @param options 이메일 발송 옵션
   */
  async sendEmail(options: SendEmailOptions): Promise<SendEmailResult> {
    if (!this.transporter) {
      this.logger.error('Email transporter not initialized');
      throw EmailException.smtpConfigMissing();
    }

    const emailConfig = this.configService.get<EmailConfig>('email');

    try {
      // HTML 생성: 직접 제공된 HTML 또는 템플릿 렌더링
      let html = options.html;

      if (options.templateName && options.templateData) {
        html = this.templateLoader.renderTemplate(options.templateName, options.templateData);
      }

      if (!html && !options.text) {
        throw new Error('Either html, text, or template must be provided');
      }

      // 이메일 발송
      const info = await this.transporter.sendMail({
        from: options.from || emailConfig?.from,
        to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
        subject: options.subject,
        html,
        text: options.text,
      });

      this.logger.log('Email sent successfully', {
        to: options.to,
        subject: options.subject,
        messageId: info.messageId,
      });

      return {
        messageId: info.messageId,
        accepted: info.accepted as string[],
        rejected: info.rejected as string[],
        response: info.response,
      };
    } catch (error) {
      this.logger.error('Failed to send email', {
        to: options.to,
        subject: options.subject,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw EmailException.sendFailed();
    }
  }

  /**
   * SMTP 연결 테스트
   */
  async testConnection(): Promise<boolean> {
    if (!this.transporter) {
      return false;
    }

    try {
      await this.transporter.verify();
      this.logger.log('Email connection test successful');
      return true;
    } catch (error) {
      this.logger.error('Email connection test failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      return false;
    }
  }

  /**
   * 트랜스포터 재초기화 (설정 변경 시)
   */
  reinitialize(): void {
    this.transporter = null;
    this.initializeTransporter();
  }

  /**
   * 이메일 인증 메일 발송 헬퍼 메서드
   * @param options 인증 이메일 발송 옵션
   */
  async sendVerificationEmail(options: {
    to: string;
    name: string;
    verificationUrl: string;
  }): Promise<SendEmailResult> {
    return this.sendEmail({
      to: options.to,
      subject: '[krgeobuk] 이메일 인증을 완료해주세요',
      templateName: 'verification',
      templateData: {
        name: options.name,
        verificationUrl: options.verificationUrl,
      },
    });
  }
}
