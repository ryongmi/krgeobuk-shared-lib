import { ExposeCreatedAt } from '@krgeobuk/core/decorators';
import { ExposeProvider } from '@krgeobuk/oauth/decorators';
import type { ProviderType } from '@krgeobuk/oauth/enum';

import {
  ExposeEmail,
  ExposeEmailVerified,
  ExposeIsIntegrated,
  ExposeNickname,
  ExposeProfileImage,
  ExposeUsername,
} from '../decorators/index.js';
import type { Detail } from '../interfaces/index.js';

export class DetailDto implements Detail {
  @ExposeEmail()
  email!: string;

  @ExposeUsername()
  name!: string;

  @ExposeNickname()
  nickname!: string | null;

  @ExposeProfileImage()
  profileImage!: string | null;

  @ExposeProvider()
  provider!: ProviderType;

  @ExposeIsIntegrated()
  isIntegrated!: boolean;

  @ExposeEmailVerified()
  isEmailVerified!: boolean;

  @ExposeCreatedAt()
  createdAt!: Date;
}
