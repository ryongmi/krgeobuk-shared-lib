import { IsValidServiceId } from '../validation/index.js';
import { ServiceIdParams } from '../interfaces/index.js';
/**
 * 서비스 URL 파라미터 DTO
 */
export class ServiceIdParamsDto implements ServiceIdParams {
  @IsValidServiceId()
  serviceId!: string;
}
