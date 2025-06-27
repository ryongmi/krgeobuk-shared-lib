export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  nickname?: string;
  profileImageUrl?: string;
}
