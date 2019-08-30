export interface Ease {
  linear: Function;
  easeIn: Function;
  easeOut: Function;
  easeInOut: Function;
}

export const ease = {
  linear: (t: number) => t,
  easeIn: (t: number) => t * t,
  easeOut: (t: number) => t * (2 - t),
  easeInOut: (t: number) => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t
};