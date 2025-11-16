/**
 * 이메일 템플릿 데이터 인터페이스
 */
export interface EmailTemplateData {
  [key: string]: unknown;
}

/**
 * 이메일 발송 옵션 인터페이스
 */
export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  templateName?: string;
  templateData?: EmailTemplateData;
  from?: string; // 개별 발신자 오버라이드 가능
}

/**
 * 이메일 발송 결과 인터페이스
 */
export interface SendEmailResult {
  messageId: string;
  accepted: string[];
  rejected: string[];
  response: string;
}
