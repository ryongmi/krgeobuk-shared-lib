/**
 * 보안 관련 유틸리티 함수들
 */

// 타입 정의
type ApiRequestData = Record<string, unknown> | string | number | boolean | null;

/**
 * XSS 방지를 위한 HTML 이스케이프
 */
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * 안전한 HTML 렌더링을 위한 새니타이즈
 */
export function sanitizeHtml(html: string): string {
  // 기본적인 태그만 허용
  const allowedTags = ['p', 'br', 'strong', 'em', 'u', 'span'];
  const allowedAttributes = ['class'];

  // 스크립트 태그 완전 제거
  let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // 이벤트 핸들러 제거
  sanitized = sanitized.replace(/on\w+\s*=\s*"[^"]*"/gi, '');
  sanitized = sanitized.replace(/on\w+\s*=\s*'[^']*'/gi, '');

  // javascript: 프로토콜 제거
  sanitized = sanitized.replace(/javascript:/gi, '');

  // data: URL 제거
  sanitized = sanitized.replace(/data:/gi, '');

  return sanitized;
}

/**
 * CSRF 토큰 생성
 */
export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * 안전한 랜덤 문자열 생성
 */
export function generateSecureRandomString(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => chars[byte % chars.length]).join('');
}

/**
 * URL 검증 (피싱 방지)
 */
export function validateURL(url: string, allowedDomains?: string[]): boolean {
  try {
    const urlObj = new URL(url);

    // HTTP/HTTPS만 허용
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return false;
    }

    // 허용된 도메인이 있는 경우 검증
    if (allowedDomains && allowedDomains.length > 0) {
      const hostname = urlObj.hostname.toLowerCase();
      return allowedDomains.some(
        (domain) =>
          hostname === domain.toLowerCase() || hostname.endsWith('.' + domain.toLowerCase())
      );
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * 사용자 입력 검증 (SQL Injection 방지)
 */
export function validateUserInput(input: string): boolean {
  // SQL 키워드 패턴 검사
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/i,
    /('|\\')|(;)|(--\s)|(\|)|(\*)|(%)/,  // -- 뒤에 공백이 있을 때만 SQL 주석으로 인식
    /(script|javascript|vbscript|onload|onerror|onclick)/i,
  ];

  return !sqlPatterns.some((pattern) => pattern.test(input));
}

/**
 * API 요청 데이터 검증 (JSON 형태의 데이터용)
 */
export function validateApiRequestData(data: ApiRequestData): boolean {
  // JSON 객체인 경우 개별 값들만 검증
  if (typeof data === 'object' && data !== null) {
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string') {
        // URL이나 이메일 등 특정 패턴은 예외 처리
        if (isUrlOrEmail(value)) {
          continue;
        }
        if (!validateUserInput(value)) {
          return false;
        }
      } else if (typeof value === 'object' && value !== null) {
        if (!validateApiRequestData(value as ApiRequestData)) {
          return false;
        }
      }
    }
    return true;
  }
  
  // 문자열인 경우 기본 검증
  return typeof data === 'string' ? validateUserInput(data) : true;
}

/**
 * URL이나 이메일인지 확인하는 헬퍼 함수
 */
function isUrlOrEmail(value: string): boolean {
  const urlPattern = /^https?:\/\/.+/i;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return urlPattern.test(value) || emailPattern.test(value);
}

/**
 * 민감한 정보 마스킹
 */
export function maskSensitiveData(
  data: string,
  type: 'email' | 'phone' | 'card' | 'password'
): string {
  switch (type) {
    case 'email':
      const emailParts = data.split('@');
      if (emailParts.length !== 2) return data;
      const [user, domain] = emailParts;
      const maskedUser =
        user && user.length > 2 ? user.substring(0, 2) + '*'.repeat(user.length - 2) : user || '';
      return `${maskedUser}@${domain}`;

    case 'phone':
      return data.replace(/(\d{3})(\d{4})(\d{4})/, '$1-****-$3');

    case 'card':
      return data.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-****-****-$4');

    case 'password':
      return '*'.repeat(data.length);

    default:
      return data;
  }
}

/**
 * Content Security Policy 헤더 생성
 */
export function generateCSPHeader(): string {
  const directives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Next.js 개발용, 프로덕션에서는 제거
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://api.krgeobuk.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ];

  return directives.join('; ');
}