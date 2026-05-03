/**
 * @param {Array} iterable
 * @return {Promise<Array>}
 */

// promise version
export default function promiseAll(iterable) {
  const result = new Array(iterable.length);
  let resolved = 0;
  const len = iterable.length;

  if (!len) return Promise.resolve(iterable);

  return new Promise((resolve, reject) => {
    for (let i = 0; i < len; i++) {
      const promise = Promise.resolve(iterable[i]);
      promise
        .then((val) => {
          result[i] = val;
          resolved++;
          if (resolved === len) {
            resolve(result);
          }
        })
        .catch(reject);
    }
  });
}

// async/await version
export default function promiseAllSecond(iterable) {
  const result = new Array(iterable.length);
  let resolved = 0;

  if (!iterable.length) return Promise.resolve(iterable);

  return new Promise((resolve, reject) => {
    iterable.forEach(async (item, index) => {
      try {
        const value = await item;
        result[index] = value;
        resolved++;
        if (resolved === iterable.length) {
          resolve(result);
        }
      } catch (error) {
        reject(error);
      }
    });
  });
}
