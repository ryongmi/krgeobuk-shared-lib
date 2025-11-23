export const OauthStateMode = {
  LINK: 'link',
  LOGIN: 'login',
} as const;

export type OauthStateMode = (typeof OauthStateMode)[keyof typeof OauthStateMode];

export const OAUTH_STATE_MODE_KEYS = Object.keys(OauthStateMode) as OauthStateMode[];
export const OAUTH_STATE_MODE_VALUES = Object.values(OauthStateMode) as OauthStateMode[];
