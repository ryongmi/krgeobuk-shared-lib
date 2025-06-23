import { IsValidGoogleCode, IsValidGoogleState } from '../../decorators/index.js';
import type { GoogleOAuthCallbackQuery } from '../../interfaces/index.js';

export class GoogleOAuthCallbackQueryDto implements GoogleOAuthCallbackQuery {
  @IsValidGoogleCode()
  code!: string;

  @IsValidGoogleState()
  state!: string;
}
