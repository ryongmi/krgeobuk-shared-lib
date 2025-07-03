export interface ServiceSearchResult {
  id: string;
  name: string;
  baseUrl: string | null;
  isVisible: boolean;
  isVisibleByRole: boolean;
  displayName: string | null;
  visibleRoleCount: number;
}
