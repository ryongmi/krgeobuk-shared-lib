import { UserRoleCode } from '../codes/index.js';
import { UserRoleMessage } from '../messages/index.js';

export class UserRoleError {
  /**  =============================================================================
   *
   *        000 ~ 099	에러 코드
   *
   *   =============================================================================
   */
  /** */

  static readonly ASSIGN_ERROR = {
    code: UserRoleCode.ASSIGN_ERROR,
    message: UserRoleMessage.ASSIGN_ERROR,
    statusCode: 500,
  };

  static readonly REVOKE_ERROR = {
    code: UserRoleCode.REVOKE_ERROR,
    message: UserRoleMessage.REVOKE_ERROR,
    statusCode: 500,
  };

  static readonly ASSIGN_MULTIPLE_ERROR = {
    code: UserRoleCode.ASSIGN_MULTIPLE_ERROR,
    message: UserRoleMessage.ASSIGN_MULTIPLE_ERROR,
    statusCode: 500,
  };

  static readonly REVOKE_MULTIPLE_ERROR = {
    code: UserRoleCode.REVOKE_MULTIPLE_ERROR,
    message: UserRoleMessage.REVOKE_MULTIPLE_ERROR,
    statusCode: 500,
  };

  static readonly REVOKE_ALL_FROM_USER_ERROR = {
    code: UserRoleCode.REVOKE_ALL_FROM_USER_ERROR,
    message: UserRoleMessage.REVOKE_ALL_FROM_USER_ERROR,
    statusCode: 500,
  };

  static readonly REVOKE_ALL_FROM_ROLE_ERROR = {
    code: UserRoleCode.REVOKE_ALL_FROM_ROLE_ERROR,
    message: UserRoleMessage.REVOKE_ALL_FROM_ROLE_ERROR,
    statusCode: 500,
  };

  static readonly FETCH_ERROR = {
    code: UserRoleCode.FETCH_ERROR,
    message: UserRoleMessage.FETCH_ERROR,
    statusCode: 500,
  };

  /**  =============================================================================
   *
   *        100 ~ 199 에러 코드
   *
   *   =============================================================================
   */
  /** */

  static readonly ALREADY_ASSIGNED = {
    code: UserRoleCode.ALREADY_ASSIGNED,
    message: UserRoleMessage.ALREADY_ASSIGNED,
    statusCode: 409,
  };

  static readonly NOT_ASSIGNED = {
    code: UserRoleCode.NOT_ASSIGNED,
    message: UserRoleMessage.NOT_ASSIGNED,
    statusCode: 404,
  };

  static readonly INVALID_USER = {
    code: UserRoleCode.INVALID_USER,
    message: UserRoleMessage.INVALID_USER,
    statusCode: 404,
  };

  static readonly INVALID_ROLE = {
    code: UserRoleCode.INVALID_ROLE,
    message: UserRoleMessage.INVALID_ROLE,
    statusCode: 404,
  };
}