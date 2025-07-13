import { HttpException } from '@nestjs/common';

import { RolePermissionError } from './role-permission.error.js';

export class RolePermissionException {
  /**  =============================================================================
   *
   *        000 ~ 099	에러 코드
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
   *        100 ~ 199 에러 코드
   *
   *   =============================================================================
   */
  /** */

  /** 이미 할당된 권한 */
  static alreadyAssigned(): HttpException {
    const e = RolePermissionError.ALREADY_ASSIGNED;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 할당되지 않은 권한 */
  static notAssigned(): HttpException {
    const e = RolePermissionError.NOT_ASSIGNED;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 유효하지 않은 역할 */
  static invalidRole(): HttpException {
    const e = RolePermissionError.INVALID_ROLE;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 유효하지 않은 권한 */
  static invalidPermission(): HttpException {
    const e = RolePermissionError.INVALID_PERMISSION;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }
}