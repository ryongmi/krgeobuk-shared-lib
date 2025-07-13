import { UserRoleCode } from '../codes/index.js';
import { UserRoleMessage } from '../messages/index.js';

export class UserRoleResponse {
  /**  =============================================================================
   *
   *        200 ~ 299	성공 응답 코드
   *
   *   =============================================================================
   */
  /** */

  static readonly ASSIGN_SUCCESS = {
    code: UserRoleCode.ASSIGN_SUCCESS,
    message: UserRoleMessage.ASSIGN_SUCCESS,
    statusCode: 201,
  };

  static readonly REVOKE_SUCCESS = {
    code: UserRoleCode.REVOKE_SUCCESS,
    message: UserRoleMessage.REVOKE_SUCCESS,
    statusCode: 204,
  };

  static readonly ASSIGN_MULTIPLE_SUCCESS = {
    code: UserRoleCode.ASSIGN_MULTIPLE_SUCCESS,
    message: UserRoleMessage.ASSIGN_MULTIPLE_SUCCESS,
    statusCode: 201,
  };

  static readonly REVOKE_MULTIPLE_SUCCESS = {
    code: UserRoleCode.REVOKE_MULTIPLE_SUCCESS,
    message: UserRoleMessage.REVOKE_MULTIPLE_SUCCESS,
    statusCode: 204,
  };

  static readonly REVOKE_ALL_FROM_USER_SUCCESS = {
    code: UserRoleCode.REVOKE_ALL_FROM_USER_SUCCESS,
    message: UserRoleMessage.REVOKE_ALL_FROM_USER_SUCCESS,
    statusCode: 204,
  };

  static readonly REVOKE_ALL_FROM_ROLE_SUCCESS = {
    code: UserRoleCode.REVOKE_ALL_FROM_ROLE_SUCCESS,
    message: UserRoleMessage.REVOKE_ALL_FROM_ROLE_SUCCESS,
    statusCode: 204,
  };

  static readonly FETCH_SUCCESS = {
    code: UserRoleCode.FETCH_SUCCESS,
    message: UserRoleMessage.FETCH_SUCCESS,
    statusCode: 200,
  };
}