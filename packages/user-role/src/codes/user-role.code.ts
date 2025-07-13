export const UserRoleCode = {
  /**  =============================================================================
   *
   *        000 ~ 099	에러 코드
   *
   *   =============================================================================
   */
  /** */

  ASSIGN_ERROR: 'USER_ROLE_001',
  REVOKE_ERROR: 'USER_ROLE_002',
  ASSIGN_MULTIPLE_ERROR: 'USER_ROLE_003',
  REVOKE_MULTIPLE_ERROR: 'USER_ROLE_004',
  REVOKE_ALL_FROM_USER_ERROR: 'USER_ROLE_005',
  REVOKE_ALL_FROM_ROLE_ERROR: 'USER_ROLE_006',
  FETCH_ERROR: 'USER_ROLE_007',

  /**  =============================================================================
   *
   *        100 ~ 199 에러 코드
   *
   *   =============================================================================
   */
  /** */

  ALREADY_ASSIGNED: 'USER_ROLE_101',
  NOT_ASSIGNED: 'USER_ROLE_102',
  INVALID_USER: 'USER_ROLE_103',
  INVALID_ROLE: 'USER_ROLE_104',

  /**  =============================================================================
   *
   *        200 ~ 299 성공 응답 코드
   *
   *   =============================================================================
   */
  /** */

  ASSIGN_SUCCESS: 'USER_ROLE_201',
  REVOKE_SUCCESS: 'USER_ROLE_202',
  ASSIGN_MULTIPLE_SUCCESS: 'USER_ROLE_203',
  REVOKE_MULTIPLE_SUCCESS: 'USER_ROLE_204',
  REVOKE_ALL_FROM_USER_SUCCESS: 'USER_ROLE_205',
  REVOKE_ALL_FROM_ROLE_SUCCESS: 'USER_ROLE_206',
  FETCH_SUCCESS: 'USER_ROLE_207',
} as const;

export type UserRoleCodeType = typeof UserRoleCode[keyof typeof UserRoleCode];