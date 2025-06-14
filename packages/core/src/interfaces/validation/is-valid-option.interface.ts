export interface IsValidOptions {
  isOptional?: boolean;
  isExpose?: boolean;
  message?: string;
}

type ClassConstructor<T> = abstract new (...args: unknown[]) => T;

export interface IsValidNestedOptions<T> {
  typeFn?: () => ClassConstructor<T>;
  description?: string;
  options?: IsValidOptions;
}
