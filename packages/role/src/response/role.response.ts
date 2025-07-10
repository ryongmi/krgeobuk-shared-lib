import { RoleCode } from '../codes/index.js';
import { RoleMessage } from '../messages/index.js';

export class RoleResponse {
  /**  =============================================================================
   *
   *        200 ~ 299	성공 응답 코드
   *
   *   =============================================================================
   */
  /** */

  static readonly FETCH_SUCCESS = {
    code: RoleCode.ROLE_FETCH_SUCCESS,
    message: RoleMessage.ROLE_FETCH_SUCCESS,
    statusCode: 200,
  };

  static readonly CREATE_SUCCESS = {
    code: RoleCode.ROLE_CREATE_SUCCESS,
    message: RoleMessage.ROLE_CREATE_SUCCESS,
    statusCode: 201,
  };

  static readonly UPDATE_SUCCESS = {
    code: RoleCode.ROLE_UPDATE_SUCCESS,
    message: RoleMessage.ROLE_UPDATE_SUCCESS,
    statusCode: 200,
  };

  static readonly DELETE_SUCCESS = {
    code: RoleCode.ROLE_DELETE_SUCCESS,
    message: RoleMessage.ROLE_DELETE_SUCCESS,
    statusCode: 204,
  };
}
