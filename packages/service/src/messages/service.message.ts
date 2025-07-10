export const ServiceMessage = {
  /**  =============================================================================
   *
   *        000 ~ 099	에러 코드
   *
   *   =============================================================================
   */
  /** */

  SERVICE_CREATE_ERROR: '서비스를 생성하는 중 오류가 발생했습니다.',
  SERVICE_UPDATE_ERROR: '서비스 정보를 수정하는 중 오류가 발생했습니다.',
  SERVICE_DELETE_ERROR: '서비스를 삭제하는 중 오류가 발생했습니다.',
  SERVICE_SEARCH_ERROR: '서비스 목록을 조회하는 중 오류가 발생했습니다.',
  SERVICE_FETCH_ERROR: '서비스 정보를 조회하는 중 오류가 발생했습니다.',
  SERVICE_HEALTH_CHECK_ERROR: '서비스 상태를 확인하는 중 오류가 발생했습니다.',

  /**  =============================================================================
   *
   *        100 ~ 199 에러 코드
   *
   *   =============================================================================
   */
  /** */

  SERVICE_NOT_FOUND: '해당 서비스를 찾을 수 없습니다.',
  SERVICE_ALREADY_EXISTS: '이미 존재하는 서비스명입니다.',
  INVALID_SERVICE_NAME: '서비스명이 유효하지 않습니다.',
  INVALID_SERVICE_URL: '서비스 URL이 유효하지 않습니다.',
  SERVICE_UNAVAILABLE: '서비스가 현재 사용할 수 없습니다.',
  UNAUTHORIZED_SERVICE_ACCESS: '해당 서비스에 대한 접근 권한이 없습니다.',

  /**  =============================================================================
   *
   *        200 ~ 299 성공 응답 코드
   *
   *   =============================================================================
   */
  /** */

  SERVICE_CREATE_SUCCESS: '서비스 생성 성공',
  SERVICE_UPDATE_SUCCESS: '서비스 정보 수정 성공',
  SERVICE_DELETE_SUCCESS: '서비스 삭제 성공',
  SERVICE_FETCH_SUCCESS: '서비스 정보 조회 성공',
  SERVICE_SEARCH_SUCCESS: '서비스 목록 조회 성공',
  SERVICE_HEALTH_CHECK_SUCCESS: '서비스 상태 확인 성공',
} as const;

export type ServiceMessageType = (typeof ServiceMessage)[keyof typeof ServiceMessage];
