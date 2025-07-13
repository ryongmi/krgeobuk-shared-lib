import { ServiceVisibleRoleCode } from '../codes/index.js';
import { ServiceVisibleRoleMessage } from '../messages/index.js';

export class ServiceVisibleRoleError {
  /**  =============================================================================
   *
   *        000 ~ 099	에러 코드
   *
   *   =============================================================================
   */

  static readonly OPERATION_ERROR = {
    code: ServiceVisibleRoleCode.OPERATION_ERROR,
    message: ServiceVisibleRoleMessage.OPERATION_ERROR,
    statusCode: 500,
  };

  static readonly VALIDATION_ERROR = {
    code: ServiceVisibleRoleCode.VALIDATION_ERROR,
    message: ServiceVisibleRoleMessage.VALIDATION_ERROR,
    statusCode: 400,
  };

  static readonly NETWORK_ERROR = {
    code: ServiceVisibleRoleCode.NETWORK_ERROR,
    message: ServiceVisibleRoleMessage.NETWORK_ERROR,
    statusCode: 503,
  };

  /**  =============================================================================
   *
   *        100 ~ 199 에러 코드
   *
   *   =============================================================================
   */

  static readonly SERVICE_VISIBLE_ROLE_NOT_FOUND = {
    code: ServiceVisibleRoleCode.SERVICE_VISIBLE_ROLE_NOT_FOUND,
    message: ServiceVisibleRoleMessage.SERVICE_VISIBLE_ROLE_NOT_FOUND,
    statusCode: 404,
  };

  static readonly SERVICE_VISIBLE_ROLE_ALREADY_EXISTS = {
    code: ServiceVisibleRoleCode.SERVICE_VISIBLE_ROLE_ALREADY_EXISTS,
    message: ServiceVisibleRoleMessage.SERVICE_VISIBLE_ROLE_ALREADY_EXISTS,
    statusCode: 409,
  };

  static readonly INVALID_SERVICE_ID = {
    code: ServiceVisibleRoleCode.INVALID_SERVICE_ID,
    message: ServiceVisibleRoleMessage.INVALID_SERVICE_ID,
    statusCode: 400,
  };

  static readonly INVALID_ROLE_ID = {
    code: ServiceVisibleRoleCode.INVALID_ROLE_ID,
    message: ServiceVisibleRoleMessage.INVALID_ROLE_ID,
    statusCode: 400,
  };
}