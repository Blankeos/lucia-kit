export function existsInObject(object: Record<string, boolean>, key: string) {
  return Boolean(object[key]);
}
