export const ServiceVisibleRoleMessage = {
  // 성공 응답
  ASSIGN_SUCCESS: '서비스에 역할이 성공적으로 할당되었습니다.',
  REVOKE_SUCCESS: '서비스로부터 역할이 성공적으로 해제되었습니다.',
  ASSIGN_MULTIPLE_SUCCESS: '서비스에 여러 역할이 성공적으로 할당되었습니다.',
  REVOKE_MULTIPLE_SUCCESS: '서비스로부터 여러 역할이 성공적으로 해제되었습니다.',
  REPLACE_SUCCESS: '서비스의 역할이 성공적으로 교체되었습니다.',
  FETCH_SUCCESS: '서비스-역할 관계 조회가 성공적으로 완료되었습니다.',

  // 서버 에러 (000-099)
  ASSIGN_ERROR: '서비스에 역할 할당 중 서버 오류가 발생했습니다.',
  REVOKE_ERROR: '서비스로부터 역할 해제 중 서버 오류가 발생했습니다.',
  ASSIGN_MULTIPLE_ERROR: '서비스에 여러 역할 할당 중 서버 오류가 발생했습니다.',
  REVOKE_MULTIPLE_ERROR: '서비스로부터 여러 역할 해제 중 서버 오류가 발생했습니다.',
  REPLACE_ERROR: '서비스의 역할 교체 중 서버 오류가 발생했습니다.',
  FETCH_ERROR: '서비스-역할 관계 조회 중 서버 오류가 발생했습니다.',

  // 관계 조회 에러 (100-199)
  SERVICE_VISIBLE_ROLE_NOT_FOUND: '서비스-역할 관계를 찾을 수 없습니다.',
  SERVICE_NOT_FOUND: '서비스를 찾을 수 없습니다.',
  ROLE_NOT_FOUND: '역할을 찾을 수 없습니다.',

  // 관계 할당 에러 (200-299)
  SERVICE_VISIBLE_ROLE_ALREADY_EXISTS: '서비스에 이미 할당된 역할입니다.',
  INVALID_SERVICE_VISIBLE_ROLE_RELATION: '유효하지 않은 서비스-역할 관계입니다.',

  // 배치 처리 에러 (300-399)
  BULK_OPERATION_PARTIAL_FAILURE: '배치 작업이 부분적으로 실패했습니다.',
  BULK_OPERATION_VALIDATION_FAILED: '배치 작업 유효성 검사에 실패했습니다.',
} as const;

export type ServiceVisibleRoleMessageType = typeof ServiceVisibleRoleMessage[keyof typeof ServiceVisibleRoleMessage];