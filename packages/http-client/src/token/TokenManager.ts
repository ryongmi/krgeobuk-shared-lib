import { jwtDecode } from 'jwt-decode';

import type {
  DecodedJwtPayload,
  JwtPayload,
  TokenRefreshConfig,
  TokenEvent,
  TokenRefreshResponse,
} from '../types/index.js';

export class TokenManager {
  private static instance: TokenManager;
  private accessToken: string | null = null;
  private refreshTimer: NodeJS.Timeout | null = null;
  private refreshPromise: Promise<string> | null = null;
  private refreshConfig: TokenRefreshConfig;

  constructor(refreshConfig: TokenRefreshConfig) {
    this.refreshConfig = {
      refreshBeforeExpiry: 5 * 60 * 1000, // 기본 5분
      ...refreshConfig,
    };
  }

  static getInstance(refreshConfig?: TokenRefreshConfig): TokenManager {
    if (!TokenManager.instance) {
      if (!refreshConfig) {
        throw new Error('TokenManager requires refresh configuration on first initialization');
      }
      TokenManager.instance = new TokenManager(refreshConfig);
    }
    return TokenManager.instance;
  }

  // Access Token 설정 (메모리 기반)
  setAccessToken(token: string): void {
    this.accessToken = token;
    this.scheduleTokenRefresh(token);

    // Redux 상태 업데이트를 위한 이벤트 발행
    this.dispatchTokenEvent('tokenUpdated', { accessToken: token });
  }

  // Access Token 설정 (이벤트 발행 없이)
  setAccessTokenSilent(token: string): void {
    this.accessToken = token;
    this.scheduleTokenRefresh(token);
  }

  // Access Token 가져오기 (메모리에서만)
  getAccessToken(): string | null {
    return this.accessToken;
  }

  // Access Token 삭제 (메모리에서만)
  clearAccessToken(): void {
    this.accessToken = null;
    this.clearRefreshTimer();

    // Redux 상태 클리어를 위한 이벤트 발행
    this.dispatchTokenEvent('tokenCleared');
  }

  // 토큰 만료 시간 확인
  getTokenExpiration(token: string): number {
    try {
      const decoded = jwtDecode<DecodedJwtPayload>(token);
      return decoded.exp * 1000; // 밀리초로 변환
    } catch (error) {
      console.error('토큰 디코딩 실패:', error);
      return 0;
    }
  }

  // 토큰 만료 여부 확인
  isTokenExpired(token: string): boolean {
    const expirationTime = this.getTokenExpiration(token);
    return Date.now() >= expirationTime;
  }

  // 토큰 만료까지 남은 시간 계산 (밀리초)
  private getTimeUntilExpiration(token: string): number {
    const expirationTime = this.getTokenExpiration(token);
    return expirationTime - Date.now();
  }

  // 토큰 갱신 스케줄링
  private scheduleTokenRefresh(token: string): void {
    this.clearRefreshTimer();

    const timeUntilExpiration = this.getTimeUntilExpiration(token);
    // 설정된 시간 전에 갱신 시도
    const refreshTime = Math.max(
      0,
      timeUntilExpiration - (this.refreshConfig.refreshBeforeExpiry || 5 * 60 * 1000)
    );

    if (refreshTime > 0) {
      this.refreshTimer = setTimeout(() => {
        this.refreshToken();
      }, refreshTime);
    }
  }

  // 토큰 갱신 타이머 정리
  private clearRefreshTimer(): void {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
  }

  // 토큰 갱신 (중복 요청 방지)
  async refreshToken(): Promise<string> {
    // 이미 갱신 중인 경우 기존 Promise 반환
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = this.performTokenRefresh();

    try {
      const newToken = await this.refreshPromise;
      return newToken;
    } finally {
      this.refreshPromise = null;
    }
  }

  // 실제 토큰 갱신 수행
  private async performTokenRefresh(): Promise<string> {
    try {
      const response = await fetch(this.refreshConfig.refreshUrl, {
        method: 'POST',
        credentials: 'include', // HTTP-only 쿠키 포함
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('토큰 갱신 실패');
      }

      const data: TokenRefreshResponse = await response.json();
      const newToken = data.data.accessToken;

      this.setAccessToken(newToken);

      return newToken;
    } catch (error) {
      console.error('토큰 갱신 실패:', error);
      this.clearAccessToken();

      // 로그아웃 이벤트 발행
      this.dispatchTokenEvent('tokenExpired');

      throw error;
    }
  }

  // 토큰이 곧 만료되는지 확인
  isTokenExpiringSoon(token: string): boolean {
    const timeUntilExpiration = this.getTimeUntilExpiration(token);
    return timeUntilExpiration < (this.refreshConfig.refreshBeforeExpiry || 5 * 60 * 1000);
  }

  // 토큰 유효성 검사
  isValidToken(token: string): boolean {
    try {
      const decoded = jwtDecode<DecodedJwtPayload>(token);
      return decoded.exp > Date.now() / 1000;
    } catch (error) {
      return false;
    }
  }

  // 토큰에서 사용자 정보 추출
  getUserFromToken(token: string): JwtPayload | null {
    try {
      const decoded = jwtDecode<DecodedJwtPayload>(token);
      // 비즈니스 데이터만 반환 (JWT 표준 필드 제외)
      return {
        id: decoded.id,
        tokenData: decoded.tokenData,
      };
    } catch (error) {
      console.error('토큰에서 사용자 정보 추출 실패:', error);
      return null;
    }
  }

  // 토큰 이벤트 발행
  private dispatchTokenEvent(type: TokenEvent['type'], data?: TokenEvent['data']): void {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(type, { detail: data }));
    }
  }

  // 현재 사용자 정보 가져오기
  getCurrentUser(): JwtPayload | null {
    const token = this.getAccessToken();
    if (!token) return null;
    return this.getUserFromToken(token);
  }

  // 토큰 새로고침 설정 업데이트
  updateRefreshConfig(config: Partial<TokenRefreshConfig>): void {
    this.refreshConfig = { ...this.refreshConfig, ...config };
  }

  // 정리 함수 (컴포넌트 언마운트 시 호출)
  cleanup(): void {
    this.clearRefreshTimer();
    this.refreshPromise = null;
  }

  // 인스턴스 리셋 (테스트용)
  static resetInstance(): void {
    if (TokenManager.instance) {
      TokenManager.instance.cleanup();
      // @ts-expect-error: 테스트용 인스턴스 리셋을 위한 의도적 undefined 할당
      TokenManager.instance = undefined;
    }
  }
}
