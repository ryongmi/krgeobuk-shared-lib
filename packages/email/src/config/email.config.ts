import { registerAs } from '@nestjs/config';

import type { EmailConfig } from '../interfaces/index.js';

export default registerAs(
  'email',
  (): EmailConfig => ({
    smtp: {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
      },
    },
    from: process.env.SMTP_FROM || 'krgeobuk <noreply@krgeobuk.com>',
    templateDir: process.env.EMAIL_TEMPLATE_DIR, // 각 서비스에서 설정 가능
    verification: process.env.EMAIL_VERIFICATION_BASE_URL
      ? {
          expiresIn: parseInt(process.env.EMAIL_VERIFICATION_EXPIRES || '86400', 10),
          baseUrl: process.env.EMAIL_VERIFICATION_BASE_URL,
        }
      : undefined, // 각 서비스가 환경변수로 설정 (auth-server 등)
    passwordReset: process.env.EMAIL_PASSWORD_RESET_BASE_URL
      ? {
          expiresIn: parseInt(process.env.EMAIL_PASSWORD_RESET_EXPIRES || '3600', 10),
          baseUrl: process.env.EMAIL_PASSWORD_RESET_BASE_URL,
        }
      : undefined, // 각 서비스가 환경변수로 설정 (auth-server 등)
  })
);
