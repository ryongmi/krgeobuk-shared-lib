import { HttpException } from '@nestjs/common';

import { RolePermissionError } from './role-permission.error.js';

export class RolePermissionException {
  /**  =============================================================================
   *
   *        000 ~ 099	서버 에러 코드
   *
   *   =============================================================================
   */
  /** */

  /** 역할에 권한 할당 중 서버 오류 */
  static assignError(): HttpException {
    const e = RolePermissionError.ASSIGN_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 역할에서 권한 해제 중 서버 오류 */
  static revokeError(): HttpException {
    const e = RolePermissionError.REVOKE_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 역할에 여러 권한 할당 중 서버 오류 */
  static assignMultipleError(): HttpException {
    const e = RolePermissionError.ASSIGN_MULTIPLE_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 역할에서 여러 권한 해제 중 서버 오류 */
  static revokeMultipleError(): HttpException {
    const e = RolePermissionError.REVOKE_MULTIPLE_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 역할의 권한 교체 중 서버 오류 */
  static replaceError(): HttpException {
    const e = RolePermissionError.REPLACE_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 역할-권한 관계 조회 중 서버 오류 */
  static fetchError(): HttpException {
    const e = RolePermissionError.FETCH_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /**  =============================================================================
   *
   *        100 ~ 199 관계 조회 에러 코드
   *
   *   =============================================================================
   */
  /** */

  /** 역할-권한 관계를 찾을 수 없음 */
  static rolePermissionNotFound(): HttpException {
    const e = RolePermissionError.ROLE_PERMISSION_NOT_FOUND;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 역할을 찾을 수 없음 */
  static roleNotFound(): HttpException {
    const e = RolePermissionError.ROLE_NOT_FOUND;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 권한을 찾을 수 없음 */
  static permissionNotFound(): HttpException {
    const e = RolePermissionError.PERMISSION_NOT_FOUND;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /**  =============================================================================
   *
   *        200 ~ 299 관계 할당 에러 코드
   *
   *   =============================================================================
   */
  /** */

  /** 역할에 이미 할당된 권한 */
  static rolePermissionAlreadyExists(): HttpException {
    const e = RolePermissionError.ROLE_PERMISSION_ALREADY_EXISTS;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 유효하지 않은 역할-권한 관계 */
  static invalidRolePermissionRelation(): HttpException {
    const e = RolePermissionError.INVALID_ROLE_PERMISSION_RELATION;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /**  =============================================================================
   *
   *        300 ~ 399 배치 처리 에러 코드
   *
   *   =============================================================================
   */
  /** */

  /** 배치 작업 부분 실패 */
  static bulkOperationPartialFailure(): HttpException {
    const e = RolePermissionError.BULK_OPERATION_PARTIAL_FAILURE;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 배치 작업 유효성 검사 실패 */
  static bulkOperationValidationFailed(): HttpException {
    const e = RolePermissionError.BULK_OPERATION_VALIDATION_FAILED;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }
}