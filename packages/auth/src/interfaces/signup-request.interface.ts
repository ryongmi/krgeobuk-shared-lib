export interface AuthSignupRequest {
  email: string;
  password: string;
  name: string;
  nickname?: string;
  profileImageUrl?: string;
}
