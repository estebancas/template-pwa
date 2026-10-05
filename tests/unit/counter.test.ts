import { describe, expect, it } from 'vitest';
import { clamp, decrement, increment, MAX, MIN } from '../../src/counter';

describe('bounds', () => {
  it('runs from 0 to 10', () => {
    expect(MIN).toBe(0);
    expect(MAX).toBe(10);
  });
});

describe('clamp', () => {
  it('keeps a value that is already in range', () => {
    expect(clamp(5)).toBe(5);
  });

  it('raises a value below the minimum to the minimum', () => {
    expect(clamp(-5)).toBe(0);
  });

  it('lowers a value above the maximum to the maximum', () => {
    expect(clamp(50)).toBe(10);
  });

  it('accepts the bounds themselves', () => {
    expect(clamp(0)).toBe(0);
    expect(clamp(10)).toBe(10);
  });

  it('uses custom bounds when given', () => {
    expect(clamp(5, 6, 8)).toBe(6);
    expect(clamp(9, 6, 8)).toBe(8);
  });
});

describe('increment', () => {
  it('adds one', () => {
    expect(increment(3)).toBe(4);
  });

  it('reaches the maximum', () => {
    expect(increment(9)).toBe(10);
  });

  it('stops at the maximum', () => {
    expect(increment(10)).toBe(10);
  });
});

describe('decrement', () => {
  it('subtracts one', () => {
    expect(decrement(3)).toBe(2);
  });

  it('reaches the minimum', () => {
    expect(decrement(1)).toBe(0);
  });

  it('stops at the minimum', () => {
    expect(decrement(0)).toBe(0);
  });
});
