import { IsValidNaverCode, IsValidNaverState } from '../../decorators/index.js';
import type { NaverOAuthCallbackQuery } from '../../interfaces/index.js';

export class NaverOAuthCallbackQueryDto implements NaverOAuthCallbackQuery {
  @IsValidNaverCode()
  code!: string;

  @IsValidNaverState()
  state!: string;
}
