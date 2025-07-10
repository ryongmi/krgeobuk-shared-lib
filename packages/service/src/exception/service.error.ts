import { ServiceCode } from '../codes/index.js';
import { ServiceMessage } from '../messages/index.js';

export class ServiceError {
  /**  =============================================================================
   *
   *        000 ~ 099	에러 코드
   *
   *   =============================================================================
   */
  /** */
  
  static readonly SERVICE_CREATE_ERROR = {
    code: ServiceCode.SERVICE_CREATE_ERROR,
    message: ServiceMessage.SERVICE_CREATE_ERROR,
    statusCode: 500,
  };
  
  static readonly SERVICE_UPDATE_ERROR = {
    code: ServiceCode.SERVICE_UPDATE_ERROR,
    message: ServiceMessage.SERVICE_UPDATE_ERROR,
    statusCode: 500,
  };
  
  static readonly SERVICE_DELETE_ERROR = {
    code: ServiceCode.SERVICE_DELETE_ERROR,
    message: ServiceMessage.SERVICE_DELETE_ERROR,
    statusCode: 500,
  };
  
  static readonly SERVICE_SEARCH_ERROR = {
    code: ServiceCode.SERVICE_SEARCH_ERROR,
    message: ServiceMessage.SERVICE_SEARCH_ERROR,
    statusCode: 500,
  };
  
  static readonly SERVICE_FETCH_ERROR = {
    code: ServiceCode.SERVICE_FETCH_ERROR,
    message: ServiceMessage.SERVICE_FETCH_ERROR,
    statusCode: 500,
  };
  
  static readonly SERVICE_HEALTH_CHECK_ERROR = {
    code: ServiceCode.SERVICE_HEALTH_CHECK_ERROR,
    message: ServiceMessage.SERVICE_HEALTH_CHECK_ERROR,
    statusCode: 500,
  };

  /**  =============================================================================
   *
   *        100 ~ 199 에러 코드
   *
   *   =============================================================================
   */
  /** */
  
  static readonly SERVICE_NOT_FOUND = {
    code: ServiceCode.SERVICE_NOT_FOUND,
    message: ServiceMessage.SERVICE_NOT_FOUND,
    statusCode: 404,
  };
  
  static readonly SERVICE_ALREADY_EXISTS = {
    code: ServiceCode.SERVICE_ALREADY_EXISTS,
    message: ServiceMessage.SERVICE_ALREADY_EXISTS,
    statusCode: 409,
  };
  
  static readonly INVALID_SERVICE_NAME = {
    code: ServiceCode.INVALID_SERVICE_NAME,
    message: ServiceMessage.INVALID_SERVICE_NAME,
    statusCode: 400,
  };
  
  static readonly INVALID_SERVICE_URL = {
    code: ServiceCode.INVALID_SERVICE_URL,
    message: ServiceMessage.INVALID_SERVICE_URL,
    statusCode: 400,
  };
  
  static readonly SERVICE_UNAVAILABLE = {
    code: ServiceCode.SERVICE_UNAVAILABLE,
    message: ServiceMessage.SERVICE_UNAVAILABLE,
    statusCode: 503,
  };
  
  static readonly UNAUTHORIZED_SERVICE_ACCESS = {
    code: ServiceCode.UNAUTHORIZED_SERVICE_ACCESS,
    message: ServiceMessage.UNAUTHORIZED_SERVICE_ACCESS,
    statusCode: 403,
  };
}
