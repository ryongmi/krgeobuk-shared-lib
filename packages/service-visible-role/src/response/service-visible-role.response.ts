import { ServiceVisibleRoleCode } from '../codes/index.js';
import { ServiceVisibleRoleMessage } from '../messages/index.js';

export class ServiceVisibleRoleResponse {
  /**  =============================================================================
   *
   *        200 ~ 299	성공 응답 코드
   *
   *   =============================================================================
   */

  static readonly FETCH_SUCCESS = {
    code: ServiceVisibleRoleCode.FETCH_SUCCESS,
    message: ServiceVisibleRoleMessage.FETCH_SUCCESS,
    statusCode: 200,
  };

  static readonly ASSIGN_SUCCESS = {
    code: ServiceVisibleRoleCode.ASSIGN_SUCCESS,
    message: ServiceVisibleRoleMessage.ASSIGN_SUCCESS,
    statusCode: 201,
  };

  static readonly REVOKE_SUCCESS = {
    code: ServiceVisibleRoleCode.REVOKE_SUCCESS,
    message: ServiceVisibleRoleMessage.REVOKE_SUCCESS,
    statusCode: 204,
  };

  static readonly ASSIGN_MULTIPLE_SUCCESS = {
    code: ServiceVisibleRoleCode.ASSIGN_MULTIPLE_SUCCESS,
    message: ServiceVisibleRoleMessage.ASSIGN_MULTIPLE_SUCCESS,
    statusCode: 201,
  };

  static readonly REVOKE_MULTIPLE_SUCCESS = {
    code: ServiceVisibleRoleCode.REVOKE_MULTIPLE_SUCCESS,
    message: ServiceVisibleRoleMessage.REVOKE_MULTIPLE_SUCCESS,
    statusCode: 204,
  };

  static readonly REPLACE_SUCCESS = {
    code: ServiceVisibleRoleCode.REPLACE_SUCCESS,
    message: ServiceVisibleRoleMessage.REPLACE_SUCCESS,
    statusCode: 200,
  };
}

