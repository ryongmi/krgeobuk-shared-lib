import { ServiceCode } from '../codes/index.js';
import { ServiceMessage } from '../messages/index.js';

export class ServiceResponse {
  /**  =============================================================================
   *
   *        200 ~ 299	성공 응답 코드
   *
   *   =============================================================================
   */
  /** */
  
  static readonly CREATE_SUCCESS = {
    code: ServiceCode.SERVICE_CREATE_SUCCESS,
    message: ServiceMessage.SERVICE_CREATE_SUCCESS,
    statusCode: 201,
  };
  
  static readonly UPDATE_SUCCESS = {
    code: ServiceCode.SERVICE_UPDATE_SUCCESS,
    message: ServiceMessage.SERVICE_UPDATE_SUCCESS,
    statusCode: 200,
  };
  
  static readonly DELETE_SUCCESS = {
    code: ServiceCode.SERVICE_DELETE_SUCCESS,
    message: ServiceMessage.SERVICE_DELETE_SUCCESS,
    statusCode: 204,
  };
  
  static readonly FETCH_SUCCESS = {
    code: ServiceCode.SERVICE_FETCH_SUCCESS,
    message: ServiceMessage.SERVICE_FETCH_SUCCESS,
    statusCode: 200,
  };
  
  static readonly SEARCH_SUCCESS = {
    code: ServiceCode.SERVICE_SEARCH_SUCCESS,
    message: ServiceMessage.SERVICE_SEARCH_SUCCESS,
    statusCode: 200,
  };
  
  static readonly HEALTH_CHECK_SUCCESS = {
    code: ServiceCode.SERVICE_HEALTH_CHECK_SUCCESS,
    message: ServiceMessage.SERVICE_HEALTH_CHECK_SUCCESS,
    statusCode: 200,
  };
}
