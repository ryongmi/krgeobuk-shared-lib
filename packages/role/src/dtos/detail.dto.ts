import { ExposeUuidIdDto } from '@krgeobuk/core/dtos';
import { ExposeNested } from '@krgeobuk/core/decorators';
import { ServiceDto } from '@krgeobuk/shared/service';
import { UserDto } from '@krgeobuk/shared/user';
import { ExposeRoleName, ExposeDescription, ExposePriority } from '@krgeobuk/shared/role';

import type { RoleDetail } from '../interfaces/index.js';

export class RoleDetailDto extends ExposeUuidIdDto implements RoleDetail {
  @ExposeRoleName()
  name!: string;

  @ExposeDescription()
  description!: string | null;

  @ExposePriority()
  priority!: number;

  @ExposeNested({
    type: ServiceDto,
    typeFn: () => ServiceDto,
    description: '해당 Role이 속한 서비스',
  })
  service!: ServiceDto;

  @ExposeNested({
    type: UserDto,
    typeFn: () => UserDto,
    description: '해당 Role를 사용하는 유저 목록',
    options: { isArray: true },
  })
  users!: UserDto[];
}
