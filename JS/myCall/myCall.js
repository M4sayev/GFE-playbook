Function.prototype.myCall = function (thisArg, ...argArray) {
  const context = thisArg ?? globalThis;

  const symbol = Symbol();
  context[symbol] = this;

  const result = context[symbol](...argArray);
  delete context[symbol];

  return result;
};
