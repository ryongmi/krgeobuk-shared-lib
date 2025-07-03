import type { PaginateBaseOptions } from '@krgeobuk/core/interfaces';

export interface ServiceSearchQuery extends PaginateBaseOptions {
  name?: string;
  isVisible?: boolean;
  // isVisibleByRole?: boolean;
  // displayName?: string;
}
