/**
 * @param {Object} obj
 * @return {Object}
 */
export default function squashObject(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  const result = {};
  function traverse(obj, prefix, result) {
    for (const key in obj) {
      const val = obj[key];
      const valType = typeof val;
      const newPrefix = prefix && key ? `${prefix}.${key}` : `${prefix}${key}`;
      if (valType === "object" && val !== null) {
        if (Object.hasOwn(obj, key)) {
          traverse(val, newPrefix, result);
        }
      } else {
        result[newPrefix] = val;
      }
    }
  }

  traverse(obj, "", result);
  return result;
}
