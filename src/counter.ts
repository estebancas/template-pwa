export const MIN = 0;
export const MAX = 10;

export function clamp(value: number, min: number = MIN, max: number = MAX): number {
  return Math.min(max, Math.max(min, value));
}

export function increment(value: number): number {
  return clamp(value + 1);
}

export function decrement(value: number): number {
  return clamp(value - 1);
}
