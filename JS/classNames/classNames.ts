/**
 * @param {...(any|Object|Array<any|Object|Array>)} args
 * @return {string}
 */
export default function classNames(
  ...args: any | Object | Array<any | Object | Array<any>>
): string {
  let classes: string[] = [];

  function traverse(
    args: any | Object | Array<any | Object | Array<any>>,
    classes: string[],
  ) {
    for (const arg of args) {
      if (!arg) continue;

      if (Array.isArray(arg)) {
        traverse(arg, classes);
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

      classes.push(arg);
    }
  }

  traverse(args, classes);

  return classes.join(" ");
}
