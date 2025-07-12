import { HttpException } from '@nestjs/common';

import { UserRoleError } from './user-role.error.js';

export class UserRoleException {
  /**  =============================================================================
   *
   *        000 ~ 099	에러 코드
   *
   *   =============================================================================
   */
  /** */

  /** 사용자에게 역할 할당 중 서버 오류 */
  static assignError(): HttpException {
    const e = UserRoleError.ASSIGN_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 사용자로부터 역할 해제 중 서버 오류 */
  static revokeError(): HttpException {
    const e = UserRoleError.REVOKE_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 사용자에게 여러 역할 할당 중 서버 오류 */
  static assignMultipleError(): HttpException {
    const e = UserRoleError.ASSIGN_MULTIPLE_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 사용자로부터 여러 역할 해제 중 서버 오류 */
  static revokeMultipleError(): HttpException {
    const e = UserRoleError.REVOKE_MULTIPLE_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 사용자의 모든 역할 해제 중 서버 오류 */
  static revokeAllFromUserError(): HttpException {
    const e = UserRoleError.REVOKE_ALL_FROM_USER_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 역할의 모든 사용자 해제 중 서버 오류 */
  static revokeAllFromRoleError(): HttpException {
    const e = UserRoleError.REVOKE_ALL_FROM_ROLE_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 사용자-역할 관계 조회 중 서버 오류 */
  static fetchError(): HttpException {
    const e = UserRoleError.FETCH_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /**  =============================================================================
   *
   *        100 ~ 199 에러 코드
   *
   *   =============================================================================
   */
  /** */

  /** 이미 할당된 사용자-역할 */
  static alreadyAssigned(): HttpException {
    const e = UserRoleError.ALREADY_ASSIGNED;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 할당되지 않은 사용자-역할 */
  static notAssigned(): HttpException {
    const e = UserRoleError.NOT_ASSIGNED;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 유효하지 않은 사용자 */
  static invalidUser(): HttpException {
    const e = UserRoleError.INVALID_USER;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 유효하지 않은 역할 */
  static invalidRole(): HttpException {
    const e = UserRoleError.INVALID_ROLE;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }
}