import type { SecurityLogEntry } from '../types/index.js';
import { SecuritySession } from './SecuritySession.js';

/**
 * 보안 로깅
 */
export class SecurityLogger {
  static logSecurityEvent(event: string, details: Record<string, unknown> = {}): void {
    const logEntry: SecurityLogEntry = {
      timestamp: new Date().toISOString(),
      event,
      details,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      sessionId: SecuritySession.validateSession() ? 'valid' : 'invalid',
    };

    // 개발 환경에서는 콘솔에 출력
    if (process.env.NODE_ENV === 'development') {
      console.warn('Security Event:', logEntry);
    }

    // 프로덕션에서는 서버로 전송
    if (process.env.NODE_ENV === 'production') {
      this.sendToSecurityEndpoint(logEntry);
    }
  }

  private static async sendToSecurityEndpoint(logEntry: SecurityLogEntry): Promise<void> {
    try {
      const response = await fetch('/api/security/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': SecuritySession.getCSRFToken() || '',
        },
        body: JSON.stringify(logEntry),
      });

      if (!response.ok) {
        throw new Error(`Security logging failed: ${response.status}`);
      }
    } catch (error) {
      // 보안 로깅 실패는 사용자에게 노출하지 않음
      console.error('Failed to log security event:', error);
    }
  }

  // 특정 이벤트 타입별 로깅 메서드
  static logAuthenticationEvent(event: 'login_attempt' | 'login_success' | 'login_failure' | 'logout', details: Record<string, unknown> = {}): void {
    this.logSecurityEvent(`AUTH_${event.toUpperCase()}`, details);
  }

  static logAccessControlEvent(event: 'access_denied' | 'permission_check' | 'role_change', details: Record<string, unknown> = {}): void {
    this.logSecurityEvent(`ACCESS_${event.toUpperCase()}`, details);
  }

  static logDataSecurityEvent(event: 'data_access' | 'data_modification' | 'sensitive_data_access', details: Record<string, unknown> = {}): void {
    this.logSecurityEvent(`DATA_${event.toUpperCase()}`, details);
  }

  static logNetworkSecurityEvent(event: 'suspicious_request' | 'rate_limit_exceeded' | 'invalid_origin', details: Record<string, unknown> = {}): void {
    this.logSecurityEvent(`NETWORK_${event.toUpperCase()}`, details);
  }

  // 보안 이벤트 일괄 로깅
  static logMultipleEvents(events: Array<{ event: string; details?: Record<string, unknown> }>): void {
    events.forEach(({ event, details = {} }) => {
      this.logSecurityEvent(event, details);
    });
  }

  // 로깅 레벨 설정
  static setLogLevel(level: 'debug' | 'info' | 'warn' | 'error'): void {
    // 환경 변수나 로컬 스토리지에 저장
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('krgeobuk_log_level', level);
    }
  }

  static getLogLevel(): 'debug' | 'info' | 'warn' | 'error' {
    if (typeof localStorage !== 'undefined') {
      const level = localStorage.getItem('krgeobuk_log_level');
      if (level && ['debug', 'info', 'warn', 'error'].includes(level)) {
        return level as 'debug' | 'info' | 'warn' | 'error';
      }
    }
    return 'info'; // 기본값
  }
}