/**
 * krgeobuk 생태계 서버 서비스 상수
 * 권한 체크 및 서비스 간 통신에서 사용되는 서버 서비스 식별자
 * 
 * 참고: 클라이언트 애플리케이션은 권한 체크 대상이 아니므로 포함하지 않음
 */

export const SERVICE_CONSTANTS = {
  // 인증 & 권한 서버
  AUTH_SERVICE: {
    id: '550e8400-e29b-41d4-a716-446655440001',
    name: 'auth-service',
    displayName: '인증 서비스'
  },
  AUTHZ_SERVICE: {
    id: '550e8400-e29b-41d4-a716-446655440002', 
    name: 'authz-service',
    displayName: '권한 서비스'
  },
  
  // 포탈 서버
  PORTAL_SERVICE: {
    id: '550e8400-e29b-41d4-a716-446655440003',
    name: 'portal-service',
    displayName: '포탈 서비스'
  },

  // 애플리케이션 서버
  MYPICK_SERVICE: {
    id: '550e8400-e29b-41d4-a716-446655440004',
    name: 'my-pick-server',
    displayName: 'MyPick 서비스'
  }
} as const;

export type ServiceConstant = typeof SERVICE_CONSTANTS[keyof typeof SERVICE_CONSTANTS];
export type ServiceId = ServiceConstant['id'];
export type ServiceName = ServiceConstant['name'];

/**
 * 모든 서버 서비스 ID 배열
 * 권한 체크 시 유효한 서비스 ID 검증용
 */
export const SERVER_SERVICE_IDS = Object.values(SERVICE_CONSTANTS).map(service => service.id);

/**
 * 서비스명으로 서비스 ID 조회
 * @param serviceName - 서비스 이름 (예: 'auth-service')
 * @returns 서비스 ID 또는 undefined
 */
export const getServiceIdByName = (serviceName: string): string | undefined => {
  const service = Object.values(SERVICE_CONSTANTS).find(s => s.name === serviceName);
  return service?.id;
};

/**
 * 서비스 ID로 서비스 정보 조회
 * @param serviceId - 서비스 ID (UUID)
 * @returns 서비스 상수 객체 또는 undefined
 */
export const getServiceById = (serviceId: string): ServiceConstant | undefined => {
  return Object.values(SERVICE_CONSTANTS).find(s => s.id === serviceId);
};