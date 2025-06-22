import { IsValidNaverCode, IsValidNaverState } from '../../decorators';
import type { NaverOAuthCallbackQuery } from '../../interfaces';

export class NaverOAuthCallbackQueryDto implements NaverOAuthCallbackQuery {
  @IsValidNaverCode()
  code!: string;

  @IsValidNaverState()
  state!: string;
}
