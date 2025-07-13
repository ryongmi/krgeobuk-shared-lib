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

  static readonly CREATE_SUCCESS = {
    code: ServiceVisibleRoleCode.CREATE_SUCCESS,
    message: ServiceVisibleRoleMessage.CREATE_SUCCESS,
    statusCode: 201,
  };

  static readonly UPDATE_SUCCESS = {
    code: ServiceVisibleRoleCode.UPDATE_SUCCESS,
    message: ServiceVisibleRoleMessage.UPDATE_SUCCESS,
    statusCode: 200,
  };

  static readonly DELETE_SUCCESS = {
    code: ServiceVisibleRoleCode.DELETE_SUCCESS,
    message: ServiceVisibleRoleMessage.DELETE_SUCCESS,
    statusCode: 204,
  };

  static readonly ASSIGN_SUCCESS = {
    code: ServiceVisibleRoleCode.ASSIGN_SUCCESS,
    message: ServiceVisibleRoleMessage.ASSIGN_SUCCESS,
    statusCode: 201,
  };

  static readonly REMOVE_SUCCESS = {
    code: ServiceVisibleRoleCode.REMOVE_SUCCESS,
    message: ServiceVisibleRoleMessage.REMOVE_SUCCESS,
    statusCode: 204,
  };

  static readonly BATCH_SUCCESS = {
    code: ServiceVisibleRoleCode.BATCH_SUCCESS,
    message: ServiceVisibleRoleMessage.BATCH_SUCCESS,
    statusCode: 201,
  };

  static readonly REPLACE_SUCCESS = {
    code: ServiceVisibleRoleCode.REPLACE_SUCCESS,
    message: ServiceVisibleRoleMessage.REPLACE_SUCCESS,
    statusCode: 200,
  };
}