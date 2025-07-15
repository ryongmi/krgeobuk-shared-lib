import { IsValidRoleId } from '../../role/validation/role-id.decorator.js';
import { IsValidServiceId } from '../../service/validation/service-id.decorator.js';
import { ServiceVisibleRoleParams } from '../interfaces/index.js';

export class ServiceVisibleRoleParamsDto implements ServiceVisibleRoleParams {
  @IsValidServiceId()
  serviceId!: string;

  @IsValidRoleId()
  roleId!: string;
}
