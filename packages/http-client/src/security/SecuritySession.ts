import { generateSecureRandomString, generateCSRFToken } from './utils.js';
import type { SessionData, BrowserFingerprint } from '../types/index.js';

/**
 * 세션 관리
 */
export class SecuritySession {
  private static readonly SESSION_KEY = 'krgeobuk_session';
  private static readonly CSRF_KEY = 'krgeobuk_csrf';

  static generateSession(): string {
    const sessionId = generateSecureRandomString(64);
    const csrf = generateCSRFToken();

    // 세션 정보를 안전하게 저장
    const sessionData: SessionData = {
      id: sessionId,
      csrf,
      timestamp: Date.now(),
      fingerprint: this.generateFingerprint(),
    };

    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionData));
      sessionStorage.setItem(this.CSRF_KEY, csrf);
    }

    return sessionId;
  }

  static getCSRFToken(): string | null {
    if (typeof sessionStorage === 'undefined') return null;
    return sessionStorage.getItem(this.CSRF_KEY);
  }

  static validateSession(): boolean {
    if (typeof sessionStorage === 'undefined') return false;
    
    try {
      const sessionData = sessionStorage.getItem(this.SESSION_KEY);
      if (!sessionData) return false;

      const parsed: SessionData = JSON.parse(sessionData);
      const now = Date.now();

      // 세션 만료 확인 (24시간)
      if (now - parsed.timestamp > 24 * 60 * 60 * 1000) {
        this.clearSession();
        return false;
      }

      // 브라우저 핑거프린트 검증
      if (parsed.fingerprint !== this.generateFingerprint()) {
        this.clearSession();
        return false;
      }

      return true;
    } catch {
      this.clearSession();
      return false;
    }
  }

  static clearSession(): void {
    if (typeof sessionStorage === 'undefined') return;
    
    sessionStorage.removeItem(this.SESSION_KEY);
    sessionStorage.removeItem(this.CSRF_KEY);
  }

  static getSessionId(): string | null {
    if (typeof sessionStorage === 'undefined') return null;
    
    try {
      const sessionData = sessionStorage.getItem(this.SESSION_KEY);
      if (!sessionData) return null;

      const parsed: SessionData = JSON.parse(sessionData);
      return parsed.id || null;
    } catch {
      return null;
    }
  }

  static refreshSession(): void {
    if (!this.validateSession()) {
      this.generateSession();
    } else {
      // 기존 세션의 타임스탬프만 갱신
      try {
        const sessionData = sessionStorage.getItem(this.SESSION_KEY);
        if (sessionData) {
          const parsed: SessionData = JSON.parse(sessionData);
          parsed.timestamp = Date.now();
          sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(parsed));
        }
      } catch {
        this.generateSession();
      }
    }
  }

  private static generateFingerprint(): string {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return 'server-side';
    }

    const fingerprintData: BrowserFingerprint = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      screenResolution: screen.width + 'x' + screen.height,
      timezoneOffset: new Date().getTimezoneOffset().toString(),
    };

    const data = Object.values(fingerprintData).join('|');

    // 간단한 해시 함수
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // 32bit 정수로 변환
    }

    return hash.toString(36);
  }
}