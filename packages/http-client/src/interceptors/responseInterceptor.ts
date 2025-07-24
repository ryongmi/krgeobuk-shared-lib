import type { AxiosResponse } from 'axios';
import { SecurityLogger } from '../security/index.js';
import type { TokenManager } from '../token/TokenManager.js';
import type { ApiResponse, ApiError } from '../types/index.js';

/**
 * 응답 인터셉터 생성 함수
 */
export function createResponseInterceptor(tokenManager: TokenManager) {
  return (response: AxiosResponse<ApiResponse>): AxiosResponse<ApiResponse> => {
    // 새로운 토큰이 응답에 포함된 경우 업데이트
    const newToken = response.headers['x-new-access-token'];
    if (newToken) {
      tokenManager.setAccessTokenSilent(newToken);
    }

    // API 응답 구조 검증
    if (response.data && typeof response.data === 'object') {
      const apiResponse = response.data as ApiResponse;
      
      // 표준 응답 형식 확인
      if (!apiResponse.code || typeof apiResponse.statusCode !== 'number') {
        SecurityLogger.logSecurityEvent('INVALID_RESPONSE_FORMAT', {
          url: response.config.url,
          status: response.status,
        });
      }

      // 로그인 상태 확인
      if (apiResponse.isLogin === false && tokenManager.getAccessToken()) {
        SecurityLogger.logAuthenticationEvent('login_failure', {
          reason: 'server_reported_logout',
          url: response.config.url,
        });
        tokenManager.clearAccessToken();
      }
    }

    return response;
  };
}

/**
 * 응답 에러 인터셉터 생성 함수
 */
export function createResponseErrorInterceptor(tokenManager: TokenManager) {
  return async (error: unknown): Promise<never> => {
    const axiosError = error as ApiError;

    // 401 오류 처리 (토큰 만료)
    if (axiosError.response?.status === 401) {
      SecurityLogger.logAuthenticationEvent('login_failure', {
        reason: 'token_expired',
        url: axiosError.config?.url,
      });

      try {
        // 토큰 갱신 시도
        const newToken = await tokenManager.refreshToken();
        
        // 원래 요청 재시도
        if (axiosError.config && newToken) {
          const axios = (await import('axios')).default;
          axiosError.config.headers = axiosError.config.headers || {};
          axiosError.config.headers.Authorization = `Bearer ${newToken}`;
          return axios.request(axiosError.config);
        }
      } catch (refreshError) {
        // 토큰 갱신 실패 시 로그아웃 처리
        tokenManager.clearAccessToken();
        SecurityLogger.logAuthenticationEvent('logout', {
          reason: 'token_refresh_failed',
        });
      }
    }

    // 403 오류 처리 (권한 없음)
    if (axiosError.response?.status === 403) {
      SecurityLogger.logAccessControlEvent('access_denied', {
        url: axiosError.config?.url,
        method: axiosError.config?.method,
      });
    }

    // 429 오류 처리 (Rate Limit)
    if (axiosError.response?.status === 429) {
      SecurityLogger.logNetworkSecurityEvent('rate_limit_exceeded', {
        url: axiosError.config?.url,
      });
    }

    // 5xx 서버 오류
    if (axiosError.response?.status && axiosError.response.status >= 500) {
      SecurityLogger.logSecurityEvent('SERVER_ERROR', {
        status: axiosError.response.status,
        url: axiosError.config?.url,
      });
    }

    // 네트워크 오류
    if (!axiosError.response && axiosError.code) {
      SecurityLogger.logNetworkSecurityEvent('network_error', {
        code: axiosError.code,
        message: axiosError.message,
        url: axiosError.config?.url,
      });
    }

    return Promise.reject(error);
  };
}