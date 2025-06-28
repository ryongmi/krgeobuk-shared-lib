export interface IsValidOptions {
  isOptional?: boolean;
  message?: string;
  isArray?: boolean;
}

export interface IsValidAllowedOptions {
  isOptional?: boolean;
  allowed?: string[];
}

type ClassConstructor<T> = abstract new (...args: unknown[]) => T;

export interface IsValidNestedOptions<T> {
  type?: ClassConstructor<T>;
  typeFn?: () => ClassConstructor<T>;
  description?: string;
  options?: IsValidOptions;
}

export interface ExposeOptions {
  isArray?: boolean;
}

export interface ExposeAllowedOptions {
  allowed?: string[];
}

export interface ExposeNestedOptions<T> {
  type?: ClassConstructor<T>;
  typeFn?: () => ClassConstructor<T>;
  description?: string;
  options?: ExposeOptions;
}
