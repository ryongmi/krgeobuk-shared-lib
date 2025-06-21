import { IsValidNaverCode, IsValidNaverState } from '@krgeobuk/oauth/src/decorators';
import type { NaverOAuthCallbackQuery } from '@krgeobuk/oauth/src/interfaces';

export class NaverOAuthCallbackQueryDto implements NaverOAuthCallbackQuery {
  @IsValidNaverCode()
  code!: string;

  @IsValidNaverState()
  state!: string;
}
