Array.prototype.myReduce = function (callbackFn, initialValue) {
  if (typeof callbackFn !== "function") {
    throw new TypeError("Callback must be a function.");
  }

  const hasInitialValue = arguments.length > 1;

  if (!this.length && !hasInitialValue) {
    throw new TypeError("Cannot reduce an empty array with no initial value.");
  }

  let accumulator = hasInitialValue ? initialValue : this[0];
  let startingIndex = hasInitialValue ? 0 : 1;

  for (let i = startingIndex; i < this.length; i++) {
    if (!Object.hasOwn(this, i)) continue;
    accumulator = callbackFn(result, this[i], i, this);
  }

  return accumulator;
};
