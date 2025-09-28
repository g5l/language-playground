export function identity<T>(value: T): T {
  return value;
}

export function wrapInArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}

// Merge two objects with inferred intersection type
export function merge<T extends object, U extends object>(a: T, b: U): T & U {
  return { ...(a as object), ...(b as object) } as T & U;
}

// Safe property accessor that narrows the return type to the specific key
export function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}


