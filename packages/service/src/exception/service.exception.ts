import { HttpException } from '@nestjs/common';

import { ServiceError } from './service.error.js';

export class ServiceException {
  /**  =============================================================================
   *
   *        000 ~ 099	에러 코드
   *
   *   =============================================================================
   */
  
  /** 서비스 생성 중 서버 오류 */
  static serviceCreateError(): HttpException {
    const e = ServiceError.SERVICE_CREATE_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }
  
  /** 서비스 정보 수정 중 서버 오류 */
  static serviceUpdateError(): HttpException {
    const e = ServiceError.SERVICE_UPDATE_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }
  
  /** 서비스 삭제 중 서버 오류 */
  static serviceDeleteError(): HttpException {
    const e = ServiceError.SERVICE_DELETE_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }
  
  /** 서비스 목록 조회 중 서버 오류 */
  static serviceSearchError(): HttpException {
    const e = ServiceError.SERVICE_SEARCH_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }
  
  /** 서비스 정보 조회 중 서버 오류 */
  static serviceFetchError(): HttpException {
    const e = ServiceError.SERVICE_FETCH_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }
  
  /** 서비스 상태 확인 중 서버 오류 */
  static serviceHealthCheckError(): HttpException {
    const e = ServiceError.SERVICE_HEALTH_CHECK_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /**  =============================================================================
   *
   *        100 ~ 199 에러 코드
   *
   *   =============================================================================
   */
   
  /** 서비스 정보 없음 */
  static serviceNotFound(): HttpException {
    const e = ServiceError.SERVICE_NOT_FOUND;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }
  
  /** 이미 존재하는 서비스명 */
  static serviceAlreadyExists(): HttpException {
    const e = ServiceError.SERVICE_ALREADY_EXISTS;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }
  
  /** 유효하지 않은 서비스명 */
  static invalidServiceName(): HttpException {
    const e = ServiceError.INVALID_SERVICE_NAME;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }
  
  /** 유효하지 않은 서비스 URL */
  static invalidServiceUrl(): HttpException {
    const e = ServiceError.INVALID_SERVICE_URL;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }
  
  /** 서비스 사용 불가 */
  static serviceUnavailable(): HttpException {
    const e = ServiceError.SERVICE_UNAVAILABLE;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }
  
  /** 서비스 접근 권한 없음 */
  static unauthorizedServiceAccess(): HttpException {
    const e = ServiceError.UNAUTHORIZED_SERVICE_ACCESS;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }
}
