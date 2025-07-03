export interface LoggedInUser {
  email: string;
  name: string;
  nickname?: string | null;
  profileImageUrl?: string | null;
}
