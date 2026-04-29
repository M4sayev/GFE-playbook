/**
 * @param {Array<any>} iterable
 * @param {Function} callbackFn
 * @param {number} size
 *
 * @return {Promise}
 */
export default function mapAsyncLimit(iterable, callbackFn, size) {
  const results = new Array(iterable.length);
  const workers = [];
  let i = 0;
  const limit = size ?? iterable.length;

  async function worker() {
    while (i < iterable.length) {
      const currentIndex = i;
      const item = iterable[currentIndex];
      const result = await callbackFn(item);
      results[currentIndex] = result;
      i++;
    }
  } 
  for (let j = 0; j < limit; j++) {
    workers.push(worker());
  }

  return Promise.all(workers).then(() => results)
}