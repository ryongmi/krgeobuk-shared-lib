import { IsValidRoleIdParams } from '../../role/validation/params.decorator.js';
import { IsValidServiceIdParams } from '../../service/validation/params.decorator.js';
import { ServiceVisibleRoleParams } from '../interfaces/index.js';

export class ServiceVisibleRoleParamsDto implements ServiceVisibleRoleParams {
  @IsValidServiceIdParams()
  serviceId!: string;

  @IsValidRoleIdParams()
  roleId!: string;
}