/**
 * @param {...(any|Object|Array<any|Object|Array>)} args
 * @return {string}
 */
export default function classNames(
  ...args: any | Object | Array<any | Object | Array<any>>
): string {
  let classes = [];

  for (const arg of args) {
    if (!arg) continue;

    const argType = typeof arg;

    if (argType === "string" || argType === "number") {
      classes.push(arg);
      continue;
    }

    if (Array.isArray(arg)) {
      classes.push(classNames(...arg));
      continue;
    }

    if (typeof arg === "object") {
      for (const key in arg) {
        if (Object.hasOwn(arg, key) && arg[key]) {
          classes.push(key);
        }
      }
      continue;
    }
  }

  return classes.join(" ");
}
