export interface LoggedInUser {
  email: string;
  name: string;
  nickname?: string | null;
  profileImage?: string | null;
}
