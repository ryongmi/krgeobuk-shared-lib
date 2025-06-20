export interface IsValidOptions {
  isOptional?: boolean;
  message?: string;
}

export interface IsValidAllowedOptions {
  isOptional?: boolean;
  allowed?: string[];
}

type ClassConstructor<T> = abstract new (...args: unknown[]) => T;

export interface IsValidNestedOptions<T> {
  typeFn?: () => ClassConstructor<T>;
  description?: string;
  options?: IsValidOptions;
}

export interface ExposeOptions {
  message?: string;
}

export interface ExposeAllowedOptions {
  allowed?: string[];
}

export interface ExposeNestedOptions<T> {
  typeFn?: () => ClassConstructor<T>;
  description?: string;
  options?: ExposeOptions;
}
