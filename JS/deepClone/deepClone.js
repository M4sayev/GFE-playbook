/**
 * @template T
 * @param {T} value
 * @return {T}
 */
export default function deepClone(value) {
  if (value === undefined || value === null) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((subval) => deepClone(subval));
  }

  if (typeof value === "object") {
    const newObj = {};

    for (const key of Reflect.ownKeys(value)) {
      if (Object.hasOwn(value, key)) {
        const descriptor = Object.getOwnPropertyDescriptor(value, key);
        if (descriptor.hasOwnProperty("value")) {
          descriptor.value = deepClone(descriptor.value);
        }
        Object.defineProperty(newObj, key, descriptor);
      }
    }
    return newObj;
  }

  return value;
}
