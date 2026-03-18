export default function deepEqual(valueA, valueB) {
  if (valueA === null || valueB === null) {
    return valueA === valueB;
  }
  if (typeof valueA !== typeof valueB) {
    return false;
  }

  if (Array.isArray(valueA) !== Array.isArray(valueB)) {
    return false;
  }

  if (Array.isArray(valueA) && Array.isArray(valueB)) {
    if (valueB.length !== valueA.length) {
      return false;
    }

    for (let i = 0; i < valueA.length; i++) {
      if (!deepEqual(valueA[i], valueB[i])) {
        return false;
      }
    }
    return true;
  }

  if (typeof valueA === "object") {
    if (typeof valueB !== "object") {
      return false;
    }

    const keys = Object.keys(valueA);

    if (keys.length !== Object.keys(valueB).length) {
      return false;
    }

    for (let i = 0; i < keys.length; i++) {
      if (!Object.hasOwn(valueB, keys[i])) {
        return false;
      }

      if (!deepEqual(valueA[keys[i]], valueB[keys[i]])) {
        return false;
      }
    }

    return true;
  }

  return valueA === valueB;
}
