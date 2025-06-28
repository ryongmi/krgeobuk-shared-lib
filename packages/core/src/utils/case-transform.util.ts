import { snakeCase } from 'lodash-es';

export function toSnakeCase(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map(toSnakeCase);
  }

  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 순회 제외할 타입들
  if (
    obj instanceof Date ||
    obj instanceof RegExp ||
    obj instanceof Set ||
    obj instanceof Map ||
    typeof obj === 'bigint' ||
    typeof obj === 'symbol'
  ) {
    return obj;
  }

  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [snakeCase(key), toSnakeCase(value)])
  );
}
