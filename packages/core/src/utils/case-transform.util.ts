import { snakeCase } from 'lodash-es';

export function toSnakeCase(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map(toSnakeCase);
  } else if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [snakeCase(key), toSnakeCase(value)])
    );
  } else {
    return obj;
  }
}
