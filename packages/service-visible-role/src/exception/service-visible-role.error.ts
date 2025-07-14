import { ServiceVisibleRoleCode } from '../codes/index.js';
import { ServiceVisibleRoleMessage } from '../messages/index.js';

export class ServiceVisibleRoleError {
  /**  =============================================================================
   *
   *        000-099 에러 코드
   *
   *   =============================================================================
   */
  /** */

  static readonly OPERATION_ERROR = {
    code: ServiceVisibleRoleCode.FETCH_ERROR,
    message: ServiceVisibleRoleMessage.FETCH_ERROR,
    statusCode: 500,
  };

  static readonly ASSIGN_ERROR = {
    code: ServiceVisibleRoleCode.ASSIGN_ERROR,
    message: ServiceVisibleRoleMessage.ASSIGN_ERROR,
    statusCode: 500,
  };

  static readonly REVOKE_ERROR = {
    code: ServiceVisibleRoleCode.REVOKE_ERROR,
    message: ServiceVisibleRoleMessage.REVOKE_ERROR,
    statusCode: 500,
  };

  static readonly ASSIGN_MULTIPLE_ERROR = {
    code: ServiceVisibleRoleCode.ASSIGN_MULTIPLE_ERROR,
    message: ServiceVisibleRoleMessage.ASSIGN_MULTIPLE_ERROR,
    statusCode: 500,
  };

  static readonly REVOKE_MULTIPLE_ERROR = {
    code: ServiceVisibleRoleCode.REVOKE_MULTIPLE_ERROR,
    message: ServiceVisibleRoleMessage.REVOKE_MULTIPLE_ERROR,
    statusCode: 500,
  };

  static readonly REPLACE_ERROR = {
    code: ServiceVisibleRoleCode.REPLACE_ERROR,
    message: ServiceVisibleRoleMessage.REPLACE_ERROR,
    statusCode: 500,
  };

  static readonly FETCH_ERROR = {
    code: ServiceVisibleRoleCode.FETCH_ERROR,
    message: ServiceVisibleRoleMessage.FETCH_ERROR,
    statusCode: 500,
  };

  /**  =============================================================================
   *
   *        100 ~ 199 에러 코드
   *
   *   =============================================================================
   */
  /** */

  static readonly SERVICE_VISIBLE_ROLE_NOT_FOUND = {
    code: ServiceVisibleRoleCode.SERVICE_VISIBLE_ROLE_NOT_FOUND,
    message: ServiceVisibleRoleMessage.SERVICE_VISIBLE_ROLE_NOT_FOUND,
    statusCode: 404,
  };

  static readonly SERVICE_NOT_FOUND = {
    code: ServiceVisibleRoleCode.SERVICE_NOT_FOUND,
    message: ServiceVisibleRoleMessage.SERVICE_NOT_FOUND,
    statusCode: 404,
  };

  static readonly ROLE_NOT_FOUND = {
    code: ServiceVisibleRoleCode.ROLE_NOT_FOUND,
    message: ServiceVisibleRoleMessage.ROLE_NOT_FOUND,
    statusCode: 404,
  };

  /**  =============================================================================
   *
   *        200-299 에러 코드
   *
   *   =============================================================================
   */
  /** */

  static readonly SERVICE_VISIBLE_ROLE_ALREADY_EXISTS = {
    code: ServiceVisibleRoleCode.SERVICE_VISIBLE_ROLE_ALREADY_EXISTS,
    message: ServiceVisibleRoleMessage.SERVICE_VISIBLE_ROLE_ALREADY_EXISTS,
    statusCode: 409,
  };

  static readonly INVALID_SERVICE_VISIBLE_ROLE_RELATION = {
    code: ServiceVisibleRoleCode.INVALID_SERVICE_VISIBLE_ROLE_RELATION,
    message: ServiceVisibleRoleMessage.INVALID_SERVICE_VISIBLE_ROLE_RELATION,
    statusCode: 400,
  };

  /**  =============================================================================
   *
   *        300-399 에러 코드
   *
   *   =============================================================================
   */
  /** */

  static readonly BULK_OPERATION_PARTIAL_FAILURE = {
    code: ServiceVisibleRoleCode.BULK_OPERATION_PARTIAL_FAILURE,
    message: ServiceVisibleRoleMessage.BULK_OPERATION_PARTIAL_FAILURE,
    statusCode: 207, // Multi-Status
  };

  static readonly BULK_OPERATION_VALIDATION_FAILED = {
    code: ServiceVisibleRoleCode.BULK_OPERATION_VALIDATION_FAILED,
    message: ServiceVisibleRoleMessage.BULK_OPERATION_VALIDATION_FAILED,
    statusCode: 400,
  };
}

