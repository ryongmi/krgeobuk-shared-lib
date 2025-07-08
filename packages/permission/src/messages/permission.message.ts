export const PermissionMessage = {
  // 에러 메시지
  PERMISSION_FETCH_ERROR: '권한 조회 중 오류가 발생했습니다.',
  PERMISSION_CREATE_ERROR: '권한 생성 중 오류가 발생했습니다.',
  PERMISSION_UPDATE_ERROR: '권한 수정 중 오류가 발생했습니다.',
  PERMISSION_DELETE_ERROR: '권한 삭제 중 오류가 발생했습니다.',
  PERMISSION_NOT_FOUND: '해당 권한을 찾을 수 없습니다.',
  PERMISSION_ALREADY_EXISTS: '이미 존재하는 권한입니다.',
  PERMISSION_INVALID_ACTION: '유효하지 않은 권한 액션입니다.',
  PERMISSION_INVALID_SERVICE: '유효하지 않은 서비스입니다.',

  // 성공 메시지
  PERMISSION_FETCH_SUCCESS: '권한 조회 성공',
  PERMISSION_CREATE_SUCCESS: '권한 생성 성공',
  PERMISSION_UPDATE_SUCCESS: '권한 수정 성공',
  PERMISSION_DELETE_SUCCESS: '권한 삭제 성공',
} as const;

export type PermissionMessageType = (typeof PermissionMessage)[keyof typeof PermissionMessage];