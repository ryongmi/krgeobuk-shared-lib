import { HttpException } from '@nestjs/common';

import { ServiceError } from './service.error.js';

export class ServiceException {
  /**  =============================================================================
   *
   *        000 ~ 099	에러 코드
   *
   *   =============================================================================
   */
  /** 프로필 정보를 조회하는 중 서버 오류 */
  // static profileFetchError(): HttpException {
  //   const e = UserError.PROFILE_FETCH_ERROR;
  //   return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  // }
  // /** 프로필 정보를 수정하는 중 서버 오류 */
  // static profileUpdateError(): HttpException {
  //   const e = UserError.PROFILE_UPDATE_ERROR;
  //   return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  // }
  // /** 비밀번호를 변경하는 중 서버 오류 */
  // static passwordChangeError(): HttpException {
  //   const e = UserError.PASSWORD_CHANGE_ERROR;
  //   return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  // }
  // /** 회원 탈퇴 처리 중 서버 오류 */
  // static accountDeleteError(): HttpException {
  //   const e = UserError.ACCOUNT_DELETE_ERROR;
  //   return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  // }
  // /** 유저 목록을 조회하는 중 서버 오류 */
  // static userSearchError(): HttpException {
  //   const e = UserError.USER_SEARCH_ERROR;
  //   return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  // }
  // /** 유저 정보를 조회하는 중 서버 오류 */
  // static userFetchError(): HttpException {
  //   const e = UserError.USER_FETCH_ERROR;
  //   return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  // }
  // /**  =============================================================================
  //  *
  //  *        100 ~ 199 에러 코드
  //  *
  //  *   =============================================================================
  //  */
  // /** 유저 정보 없음 */
  // static userNotFound(): HttpException {
  //   const e = UserError.USER_NOT_FOUND;
  //   return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  // }
  // /** 비밀번호 미일치 */
  // static passwordIncorrect(): HttpException {
  //   const e = UserError.PASSWORD_INCORRECT;
  //   return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  // }
  // /** 수정 요청에 잘못된 데이터 포함 -> 근데 이건 요청 들어올때 dto에서 body 검사하지않나? 필요없을지도 */
  // static invalidUpdatePavload(): HttpException {
  //   const e = UserError.INVALID_UPDATE_PAYLOAD;
  //   return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  // }
  // /** 해당 유저에 대한 수정 권한 미보유 */
  // static unauthorizedUpdate(): HttpException {
  //   const e = UserError.UNAUTHORIZED_UPDATE;
  //   return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  // }
  // /** 이미 사용 중인 이메일 */
  // static emailAlreadyExists(): HttpException {
  //   const e = UserError.EMAIL_ALREADY_EXISTS;
  //   return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  // }
  // /** ID or PW 불일치치 */
  // static invalidCredentials(): HttpException {
  //   const e = UserError.INVALID_CREDENTIALS;
  //   return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  // }
}
