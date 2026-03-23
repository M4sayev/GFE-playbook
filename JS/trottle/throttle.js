/**
 * @callback func
 * @param {number} wait
 * @return {Function}
 */

export default function throttle(func, wait) {
  let isExpired = true;

  return function (...args) {
    if (!isExpired) return;

    isExpired = false;
    setTimeout(() => {
      isExpired = true;
    }, wait);

    return func.apply(this, args);
  };
}

// export default function throttle(func, wait) {
//   let lastCalledTime = null;

//   return function (...args) {
//     const now = Date.now();
//     const diff = now - lastCalledTime;
//     if (lastCalledTime === null || diff >= wait) {
//       lastCalledTime = now;
//       return func.apply(this, args);
//     }
//   };
// }
