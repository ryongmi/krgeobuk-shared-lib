import { ExposeRoleId } from '../../role/validation/index.js';
import { ExposeServiceId } from '../../service/validation/index.js';
import { ServiceVisibleRole } from '../interfaces/index.js';

export class ServiceVisibleRoleDto implements ServiceVisibleRole {
  @ExposeServiceId()
  serviceId?: string;

  @ExposeRoleId()
  roleId?: string;
}