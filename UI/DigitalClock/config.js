export const mapper = {
  0: {
    top: ["top", "left", "right"],
    bottom: ["bottom", "left", "right"],
  },
  1: { top: ["right"], bottom: ["right"] },
  2: {
    top: ["top", "right", "bottom"],
    bottom: ["left", "bottom"],
  },
  3: {
    top: ["top", "right", "bottom"],
    bottom: ["right", "bottom"],
  },
  4: { top: ["left", "right"], bottom: ["top", "right"] },
  5: {
    top: ["top", "left", "bottom"],
    bottom: ["right", "bottom"],
  },
  6: {
    top: ["top", "right", "bottom"],
    bottom: ["bottom", "left", "right"],
  },
  7: { top: ["top", "right"], bottom: ["right"] },
  8: {
    top: ["top", "bottom", "left", "right"],
    bottom: ["bottom", "left", "right"],
  },
  9: {
    top: ["top", "bottom", "left", "right"],
    bottom: ["right", "bottom"],
  },
};

export const classMapper = Object.fromEntries(
  Object.entries(mapper).map(([key, val]) => [
    key,
    {
      top: val.top.map((str) => `clock-number-square-border-${str}`).join(" "),
      bottom: val.bottom
        .map((str) => `clock-number-square-border-${str}`)
        .join(" "),
    },
  ]),
);

export function getFirstDigit(number) {
  return Math.floor(number / 10) % 10;
}
