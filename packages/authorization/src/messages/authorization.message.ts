/**
 * Authorization 도메인 메시지 상수
 * TCP 통신 및 HTTP 응답에서 사용되는 메시지 정의
 */

export const AuthorizationMessage = {
  /**  =============================================================================
   *
   *        성공 응답 메시지
   *
   *   =============================================================================
   */
  /** */

  CHECK_PERMISSION_SUCCESS: '권한 확인이 성공적으로 완료되었습니다.',
  CHECK_ROLE_SUCCESS: '역할 확인이 성공적으로 완료되었습니다.',
  GET_USER_PERMISSIONS_SUCCESS: '사용자 권한 목록 조회가 성공적으로 완료되었습니다.',
  GET_USER_ROLES_SUCCESS: '사용자 역할 목록 조회가 성공적으로 완료되었습니다.',

  /**  =============================================================================
   *
   *        권한 관련 에러 메시지 (100-199)
   *
   *   =============================================================================
   */
  /** */

  PERMISSION_DENIED: '권한이 거부되었습니다.',
  ROLE_ACCESS_DENIED: '역할 접근이 거부되었습니다.',
  USER_NOT_AUTHENTICATED: '사용자 인증이 필요합니다.',

  /**  =============================================================================
   *
   *        서비스 관련 에러 메시지 (200-299)
   *
   *   =============================================================================
   */
  /** */

  SERVICE_UNAVAILABLE: '권한 서비스를 사용할 수 없습니다.',
  AUTHORIZATION_NETWORK_ERROR: '권한 서비스 통신 중 오류가 발생했습니다.',
  AUTHORIZATION_TIMEOUT_ERROR: '권한 확인 요청이 시간 초과되었습니다.',
} as const;

export type AuthorizationMessageType = typeof AuthorizationMessage[keyof typeof AuthorizationMessage];