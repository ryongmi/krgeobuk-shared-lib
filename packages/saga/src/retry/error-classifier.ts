/**
 * 오류 분류기
 * 일시적 오류와 영구적 오류를 구분하여 재시도 여부를 결정합니다.
 */
export class ErrorClassifier {
  /**
   * 재시도 가능한 일시적 오류 코드 목록
   */
  private static readonly RETRYABLE_ERROR_CODES = new Set([
    // 네트워크 오류
    'ETIMEDOUT',
    'ECONNREFUSED',
    'ECONNRESET',
    'EPIPE',
    'ENOTFOUND',
    'ENETUNREACH',

    // Database 락 오류
    'ER_LOCK_WAIT_TIMEOUT',
    'ER_LOCK_DEADLOCK',

    // NestJS TCP 오류
    'TimeoutError',
  ]);

  /**
   * 재시도 가능한 HTTP 상태 코드 목록
   */
  private static readonly RETRYABLE_HTTP_STATUS_CODES = new Set([
    408, // Request Timeout
    429, // Too Many Requests
    500, // Internal Server Error (일부 케이스)
    502, // Bad Gateway
    503, // Service Unavailable
    504, // Gateway Timeout
  ]);

  /**
   * 재시도 불가능한 영구적 오류 코드 목록
   */
  private static readonly PERMANENT_ERROR_CODES = new Set([
    // Database 제약조건 오류
    'ER_DUP_ENTRY',
    'ER_NO_REFERENCED_ROW',
    'ER_NO_REFERENCED_ROW_2',
    'ER_ROW_IS_REFERENCED',
    'ER_ROW_IS_REFERENCED_2',
    'ER_DATA_TOO_LONG',
    'ER_TRUNCATED_WRONG_VALUE',
    'ER_BAD_NULL_ERROR',
  ]);

  /**
   * 재시도 불가능한 HTTP 상태 코드 목록
   */
  private static readonly PERMANENT_HTTP_STATUS_CODES = new Set([
    400, // Bad Request
    401, // Unauthorized
    403, // Forbidden
    404, // Not Found
    405, // Method Not Allowed
    409, // Conflict
    422, // Unprocessable Entity
  ]);

  /**
   * 오류가 재시도 가능한지 판단합니다.
   *
   * @param error - 발생한 오류
   * @returns 재시도 가능 여부
   */
  static isRetryable(error: any): boolean {
    if (!error) {
      return false;
    }

    // 1. 명시적인 영구 오류 체크 (우선순위 높음)
    if (this.isPermanentError(error)) {
      return false;
    }

    // 2. Error code 체크
    if (error.code && this.RETRYABLE_ERROR_CODES.has(error.code)) {
      return true;
    }

    // 3. HTTP 상태 코드 체크
    const statusCode = error.statusCode || error.status;
    if (statusCode && this.RETRYABLE_HTTP_STATUS_CODES.has(statusCode)) {
      return true;
    }

    // 4. Error name 체크 (NestJS TimeoutError)
    if (error.name === 'TimeoutError') {
      return true;
    }

    // 5. Error message 패턴 매칭
    if (error.message) {
      const message = error.message.toLowerCase();

      // Database 락 타임아웃
      if (message.includes('lock wait timeout')) {
        return true;
      }

      // 네트워크 타임아웃
      if (message.includes('timeout')) {
        return true;
      }

      // 연결 거부
      if (message.includes('connection refused')) {
        return true;
      }

      // 연결 리셋
      if (message.includes('connection reset')) {
        return true;
      }
    }

    // 6. 기본값: 재시도 불가 (보수적 접근)
    return false;
  }

  /**
   * 오류가 영구적인지 판단합니다.
   *
   * @param error - 발생한 오류
   * @returns 영구적 오류 여부
   */
  static isPermanentError(error: any): boolean {
    if (!error) {
      return false;
    }

    // 1. Error code 체크
    if (error.code && this.PERMANENT_ERROR_CODES.has(error.code)) {
      return true;
    }

    // 2. HTTP 상태 코드 체크
    const statusCode = error.statusCode || error.status;
    if (statusCode && this.PERMANENT_HTTP_STATUS_CODES.has(statusCode)) {
      return true;
    }

    // 3. Database 제약조건 오류 메시지 패턴
    if (error.message) {
      const message = error.message.toLowerCase();

      if (message.includes('duplicate entry')) {
        return true;
      }

      if (message.includes('foreign key constraint')) {
        return true;
      }

      if (message.includes('data too long')) {
        return true;
      }

      if (message.includes('cannot be null')) {
        return true;
      }
    }

    return false;
  }

  /**
   * 오류의 분류 정보를 반환합니다.
   *
   * @param error - 발생한 오류
   * @returns 오류 분류 정보
   */
  static classify(error: any): {
    isRetryable: boolean;
    isPermanent: boolean;
    category: 'network' | 'database' | 'http' | 'unknown';
    reason: string;
  } {
    const isRetryable = this.isRetryable(error);
    const isPermanent = this.isPermanentError(error);

    let category: 'network' | 'database' | 'http' | 'unknown' = 'unknown';
    let reason = 'Unknown error';

    // Category 판단
    if (error.code && this.RETRYABLE_ERROR_CODES.has(error.code)) {
      if (error.code.startsWith('E')) {
        category = 'network';
        reason = `Network error: ${error.code}`;
      } else if (error.code.startsWith('ER_')) {
        category = 'database';
        reason = `Database error: ${error.code}`;
      }
    } else if (error.statusCode || error.status) {
      category = 'http';
      reason = `HTTP ${error.statusCode || error.status}: ${error.message}`;
    } else if (error.message) {
      if (error.message.includes('timeout')) {
        category = 'network';
        reason = 'Timeout error';
      } else if (error.message.includes('lock')) {
        category = 'database';
        reason = 'Database lock error';
      }
    }

    return {
      isRetryable,
      isPermanent,
      category,
      reason,
    };
  }
}
