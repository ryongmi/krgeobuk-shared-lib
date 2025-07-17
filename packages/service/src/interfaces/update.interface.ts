export interface UpdateService {
  name?: string;
  description?: string | null;
  baseUrl?: string | null;
  isVisible?: boolean;
  isVisibleByRole?: boolean;
  displayName?: string | null;
  iconUrl?: string | null;
}
