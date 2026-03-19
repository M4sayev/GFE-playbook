export default function debounce(func, wait) {
  let timeoutID, lastThis, lastArgs;

  function debounced(...args) {
    lastThis = this;
    lastArgs = args;
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  }

  debounced.cancel = () => {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
  };

  // need to store this and args
  // as flush does not have access to the context

  debounced.flush = function () {
    if (timeoutID) {
      clearTimeout(timeoutID);
      timeoutID = null;
      func.apply(lastThis, lastArgs);
    }
  };

  return debounced;
}
