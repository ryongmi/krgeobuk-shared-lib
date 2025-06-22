import { IsValidGoogleCode, IsValidGoogleState } from '../../decorators';
import type { GoogleOAuthCallbackQuery } from '../../interfaces';

export class GoogleOAuthCallbackQueryDto implements GoogleOAuthCallbackQuery {
  @IsValidGoogleCode()
  code!: string;

  @IsValidGoogleState()
  state!: string;
}
