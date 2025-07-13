export const ServiceVisibleRoleCode = {
  /**  =============================================================================
   *
   *        000 ~ 099	에러 코드
   *
   *   =============================================================================
   */

  OPERATION_ERROR: 'SVR_000',
  VALIDATION_ERROR: 'SVR_001',
  NETWORK_ERROR: 'SVR_002',

  /**  =============================================================================
   *
   *        100 ~ 199 에러 코드
   *
   *   =============================================================================
   */

  SERVICE_VISIBLE_ROLE_NOT_FOUND: 'SVR_100',
  SERVICE_VISIBLE_ROLE_ALREADY_EXISTS: 'SVR_101',
  INVALID_SERVICE_ID: 'SVR_102',
  INVALID_ROLE_ID: 'SVR_103',

  /**  =============================================================================
   *
   *        200 ~ 299 성공 응답 코드
   *
   *   =============================================================================
   */

  FETCH_SUCCESS: 'SVR_200',
  CREATE_SUCCESS: 'SVR_201',
  UPDATE_SUCCESS: 'SVR_202',
  DELETE_SUCCESS: 'SVR_203',
  ASSIGN_SUCCESS: 'SVR_204',
  REMOVE_SUCCESS: 'SVR_205',
  BATCH_SUCCESS: 'SVR_206',
  REPLACE_SUCCESS: 'SVR_207',
} as const;

export type ServiceVisibleRoleCodeType = typeof ServiceVisibleRoleCode[keyof typeof ServiceVisibleRoleCode];