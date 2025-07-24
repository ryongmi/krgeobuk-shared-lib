/**
 * 로그인 시도 제한을 위한 레이트 리미터
 */
export class RateLimiter {
  private attempts: Map<string, { count: number; lastAttempt: number }> = new Map();
  private maxAttempts: number;
  private windowMs: number;

  constructor(maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const record = this.attempts.get(identifier);

    if (!record) {
      this.attempts.set(identifier, { count: 1, lastAttempt: now });
      return true;
    }

    // 시간 윈도우 초과시 리셋
    if (now - record.lastAttempt > this.windowMs) {
      this.attempts.set(identifier, { count: 1, lastAttempt: now });
      return true;
    }

    // 최대 시도 횟수 초과
    if (record.count >= this.maxAttempts) {
      return false;
    }

    // 시도 횟수 증가
    record.count++;
    record.lastAttempt = now;

    return true;
  }

  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }

  getRemainingAttempts(identifier: string): number {
    const record = this.attempts.get(identifier);
    if (!record) return this.maxAttempts;

    const now = Date.now();
    if (now - record.lastAttempt > this.windowMs) {
      return this.maxAttempts;
    }

    return Math.max(0, this.maxAttempts - record.count);
  }

  getTimeUntilReset(identifier: string): number {
    const record = this.attempts.get(identifier);
    if (!record) return 0;

    const now = Date.now();
    const timePassed = now - record.lastAttempt;
    
    if (timePassed >= this.windowMs) {
      return 0;
    }

    return this.windowMs - timePassed;
  }

  // 전체 기록 정리 (메모리 관리용)
  cleanup(): void {
    const now = Date.now();
    for (const [identifier, record] of this.attempts.entries()) {
      if (now - record.lastAttempt > this.windowMs) {
        this.attempts.delete(identifier);
      }
    }
  }

  // 설정 업데이트
  updateConfig(maxAttempts?: number, windowMs?: number): void {
    if (maxAttempts !== undefined) {
      this.maxAttempts = maxAttempts;
    }
    if (windowMs !== undefined) {
      this.windowMs = windowMs;
    }
  }
}