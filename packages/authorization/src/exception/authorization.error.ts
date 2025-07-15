/**
 * Authorization 에러 응답 정의
 */
import { AuthorizationCode } from '../codes/index.js';
import { AuthorizationMessage } from '../messages/index.js';

export class AuthorizationError {
  /**  =============================================================================
   *
   *        성공 응답
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

  /**  =============================================================================
   *
   *        권한 관련 에러 (100-199)
   *
   *   =============================================================================
   */
  /** */

  static readonly PERMISSION_DENIED = {
    code: AuthorizationCode.PERMISSION_DENIED,
    message: AuthorizationMessage.PERMISSION_DENIED,
    statusCode: 403,
  };

  static readonly ROLE_ACCESS_DENIED = {
    code: AuthorizationCode.ROLE_ACCESS_DENIED,
    message: AuthorizationMessage.ROLE_ACCESS_DENIED,
    statusCode: 403,
  };

  static readonly USER_NOT_AUTHENTICATED = {
    code: AuthorizationCode.USER_NOT_AUTHENTICATED,
    message: AuthorizationMessage.USER_NOT_AUTHENTICATED,
    statusCode: 401,
  };

  /**  =============================================================================
   *
   *        서비스 관련 에러 (200-299)
   *
   *   =============================================================================
   */
  /** */

  static readonly SERVICE_UNAVAILABLE = {
    code: AuthorizationCode.SERVICE_UNAVAILABLE,
    message: AuthorizationMessage.SERVICE_UNAVAILABLE,
    statusCode: 503,
  };

  static readonly AUTHORIZATION_NETWORK_ERROR = {
    code: AuthorizationCode.AUTHORIZATION_NETWORK_ERROR,
    message: AuthorizationMessage.AUTHORIZATION_NETWORK_ERROR,
    statusCode: 503,
  };

  static readonly AUTHORIZATION_TIMEOUT_ERROR = {
    code: AuthorizationCode.AUTHORIZATION_TIMEOUT_ERROR,
    message: AuthorizationMessage.AUTHORIZATION_TIMEOUT_ERROR,
    statusCode: 504,
  };
}