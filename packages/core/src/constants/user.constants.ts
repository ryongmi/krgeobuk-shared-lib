/**
 * krgeobuk 생태계 초기 사용자 상수
 * migration seed 및 서비스 간 cross-DB 참조에서 사용되는 고정 UUID
 *
 * 참고: service.constants.ts와 동일하게 DB 간 참조 문제 해결을 위해 UUID를 미리 지정
 */

export const USER_CONSTANTS = {
  SUPER_ADMIN: {
    id: '550e8400-e29b-41d4-a716-446655440010',
    email: 'superAdmin@krgeobuk.com',
    name: '관리자',
  },
} as const;

export type UserConstant = (typeof USER_CONSTANTS)[keyof typeof USER_CONSTANTS];
export type UserId = UserConstant['id'];
