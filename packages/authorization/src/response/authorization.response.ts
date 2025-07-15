/**
 * Authorization 응답 클래스
 */
import { AuthorizationCode } from '../codes/index.js';
import { AuthorizationMessage } from '../messages/index.js';

export class AuthorizationResponse {
  /**  =============================================================================
   *
   *        성공 응답 코드
   *
   *   =============================================================================
   */
  /** */

  static readonly CHECK_PERMISSION_SUCCESS = {
    code: AuthorizationCode.CHECK_PERMISSION_SUCCESS,
    message: AuthorizationMessage.CHECK_PERMISSION_SUCCESS,
    statusCode: 200,
  };

  static readonly CHECK_ROLE_SUCCESS = {
    code: AuthorizationCode.CHECK_ROLE_SUCCESS,
    message: AuthorizationMessage.CHECK_ROLE_SUCCESS,
    statusCode: 200,
  };

  static readonly GET_USER_PERMISSIONS_SUCCESS = {
    code: AuthorizationCode.GET_USER_PERMISSIONS_SUCCESS,
    message: AuthorizationMessage.GET_USER_PERMISSIONS_SUCCESS,
    statusCode: 200,
  };

  static readonly GET_USER_ROLES_SUCCESS = {
    code: AuthorizationCode.GET_USER_ROLES_SUCCESS,
    message: AuthorizationMessage.GET_USER_ROLES_SUCCESS,
    statusCode: 200,
  };
}