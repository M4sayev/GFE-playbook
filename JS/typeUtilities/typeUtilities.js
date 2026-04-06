export function isArray(value) {
  return value instanceof Array;
}

export function isFunction(value) {
  return typeof value === "function";
}

export function isObject(value) {
  return value instanceof Object;
}

export function isPlainObject(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const proto = Object.getPrototypeOf(value);

  if (proto === null) return true;

  return proto === Object.prototype;
}
