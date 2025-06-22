import { IsValidGoogleCode, IsValidGoogleState } from '@krgeobuk/oauth/src/decorators';
import type { GoogleOAuthCallbackQuery } from '@krgeobuk/oauth/src/interfaces';

export class GoogleOAuthCallbackQueryDto implements GoogleOAuthCallbackQuery {
  @IsValidGoogleCode()
  code!: string;

  @IsValidGoogleState()
  state!: string;
}
