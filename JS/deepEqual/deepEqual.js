function isObject(item) {
  return (
    Object.getPrototypeOf(item) === Object.prototype && typeof item === "object"
  );
}

function deepEqual(valueA, valueB) {
  if (typeof valueA !== typeof valueB) {
    return false;
  }

  if (Array.isArray(valueA)) {
    if (!Array.isArray(valueB) || valueB.length !== valueA.length) {
      return false;
    }

    for (let i = 0; i < valueA.length; i++) {
      if (!deepEqual(valueA[i], valueB[i])) {
        return false;
      }
    }
    return true;
  }

  if (isObject(valueA)) {
    if (!isObject(valueB)) {
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

const obj = {
  1: 211,
  2: 142,
  3: [
    124,
    123,
    {
      123: 34,
    },
  ],
};

console.log(
  deepEqual(
    {
      1: 211,
      2: 142,
      3: [
        124,
        123,
        {
          123: 34,
        },
      ],
    },
    {
      1: 211,
      2: 142,
      3: [
        124,
        123,
        {
          123: 3,
        },
      ],
    },
  ),
);
