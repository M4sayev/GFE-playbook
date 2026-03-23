/**
 * @param {Array<*|Array>} value
 * @return {Array}
 */


// iterative - stack
export default function flatten(value) {
  const stack = [...value];
  let res = [];

  while (stack.length) {
    const item = stack.pop();
    if (Array.isArray(item)) {
      stack.push(...item);
    } else {
      res.unshift(item);
    }
  }

  return res;
}

// recursive - array methods

export default function flatten2(value) {
  return value.reduce(
    (acc, item) =>
      Array.isArray(item) ? acc.concat(flatten(item)) : acc.concat(item),
    [],
  );
}

// recursive
export default function flatten(value) {
  let result = [];

  for (const item of value) {
    if (Array.isArray(item)) {
      result = result.concat(flatten(item));
    } else {
      result.push(item);
    }
  }

  return result;
}
