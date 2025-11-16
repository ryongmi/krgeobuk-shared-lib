export const EmailMessage = {
  /**  =============================================================================
   *
   *        000 ~ 099	에러 코드
   *
   *   =============================================================================
   */
  /** */

  SEND_FAILED: '이메일 발송에 실패했습니다.',
  TEMPLATE_NOT_FOUND: '이메일 템플릿을 찾을 수 없습니다.',
  TEMPLATE_COMPILE_ERROR: '이메일 템플릿 컴파일 중 오류가 발생했습니다.',
  TEMPLATE_RENDER_ERROR: '이메일 템플릿 렌더링 중 오류가 발생했습니다.',
  CONNECTION_FAILED: 'SMTP 서버 연결에 실패했습니다.',
  INVALID_RECIPIENT: '유효하지 않은 수신자 이메일 주소입니다.',
  INVALID_SENDER: '유효하지 않은 발신자 이메일 주소입니다.',
  SMTP_CONFIG_MISSING: 'SMTP 설정이 누락되었습니다.',
  VERIFICATION_TOKEN_INVALID: '유효하지 않은 이메일 인증 토큰입니다.',
  ALREADY_VERIFIED: '이미 인증 완료된 이메일입니다.',

  /**  =============================================================================
   *
   *        200 ~ 299	성공 응답 코드
   *
   *   =============================================================================
   */
  /** */

  SEND_SUCCESS: '이메일 발송 성공',
  TEMPLATE_LOADED: '템플릿 로드 성공',
  TEMPLATE_COMPILED: '템플릿 컴파일 성공',
  CONNECTION_SUCCESS: 'SMTP 연결 성공',
  VERIFICATION_REQUEST_SUCCESS: '인증 이메일 발송 성공',
  VERIFICATION_SUCCESS: '이메일 인증 완료',
} as const;

export type EmailMessageType = (typeof EmailMessage)[keyof typeof EmailMessage];
