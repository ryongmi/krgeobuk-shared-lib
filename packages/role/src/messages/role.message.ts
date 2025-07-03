export const RoleMessage = {
  /**  =============================================================================
   *
   *        000 ~ 099	에러 코드
   *
   *   =============================================================================
   */
  /** */

  PROFILE_FETCH_ERROR: '프로필 정보를 조회하는 중 오류가 발생했습니다.',
  PROFILE_UPDATE_ERROR: '프로필 정보를 수정하는 중 오류가 발생했습니다.',
  PASSWORD_CHANGE_ERROR: '비밀번호를 변경하는 중 오류가 발생했습니다.',
  ACCOUNT_DELETE_ERROR: '회원 탈퇴 처리 중 오류가 발생했습니다.',
  USER_SEARCH_ERROR: '유저 목록을 조회하는 중 오류가 발생했습니다.',
  USER_FETCH_ERROR: '유저 정보를 조회하는 중 오류가 발생했습니다.',

  /**  =============================================================================
   *
   *        100 ~ 199 에러 코드
   *
   *   =============================================================================
   */
  /** */

  USER_NOT_FOUND: '해당 유저를 찾을 수 없습니다.',
  PASSWORD_INCORRECT: '현재 비밀번호가 일치하지 않습니다.',
  INVALID_UPDATE_PAYLOAD: '수정 요청에 잘못된 데이터가 포함되어 있습니다.',
  UNAUTHORIZED_UPDATE: '해당 유저에 대한 수정 권한이 없습니다.',
  EMAIL_ALREADY_EXISTS: '이미 사용 중인 이메일입니다.',
  INVALID_CREDENTIALS: '아이디 또는 비밀번호가 일치하지 않습니다.',

  /**  =============================================================================
   *
   *        200 ~ 299 성공 응답 코드
   *
   *   =============================================================================
   */
  /** */

  PROFILE_FETCH_SUCCESS: '프로필 조회 성공',
  PROFILE_UPDATE_SUCCESS: '프로필 수정 성공',
  PASSWORD_CHANGE_SUCCESS: '비밀번호 변경 성공',
  ACCOUNT_DELETE_SUCCESS: '회원 탈퇴 성공',
  USER_FETCH_SUCCESS: '유저 정보 조회 성공',
  USER_SEARCH_SUCCESS: '유저 목록 조회 성공',
} as const;

export type RoleMessageType = (typeof RoleMessage)[keyof typeof RoleMessage];
