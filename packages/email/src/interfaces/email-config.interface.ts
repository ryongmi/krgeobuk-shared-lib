/**
 * SMTP 설정 인터페이스
 */
export interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

/**
 * 이메일 인증 설정 인터페이스
 */
export interface EmailVerificationConfig {
  expiresIn: number; // 인증 토큰 만료 시간 (초)
  baseUrl: string; // 프론트엔드 인증 URL
}

/**
 * 이메일 설정 인터페이스
 */
export interface EmailConfig {
  smtp: SmtpConfig;
  from: string;
  templateDir?: string; // 템플릿 디렉토리 경로 (각 서비스에서 주입 가능)
  verification?: EmailVerificationConfig; // 이메일 인증 설정 (auth-server 등에서 사용)
}
